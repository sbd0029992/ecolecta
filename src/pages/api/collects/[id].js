import { S3 } from 'aws-sdk';
import mongoose from 'mongoose';
import { dbConnect } from 'utils/mongosee';

import Collect from '/src/models/Collect';
import User from '/src/models/User';
dbConnect();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const collects = await Collect.find({})
          .populate({ path: 'collector', model: User })
          .populate({ path: 'user', model: User });

        if (!collects) {
          return res.status(404).json({ error: 'Collect not found' });
        }

        return res.status(200).json(collects);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'PUT':
      try {
        const collect = await Collect.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!collect) {
          return res.status(404).json({ error: 'Collect not found' });
        }

        return res.status(200).json(collect);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'DELETE':
      var s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
      try {
        const collect = await Collect.findById(id);

        if (!collect) {
          return res.status(404).json({ error: 'Collect not found' });
        }

        // Elimina las imágenes del bucket de S3
        const images = collect.images;

        // Construye un arreglo de objetos a eliminar en S3
        const objectsToDelete = images.map((image) => ({
          Key: `${id}/${image.split('/').pop()}`,
        }));

        // Agrega el objeto de la carpeta para eliminar la carpeta en sí misma
        objectsToDelete.push({ Key: `${id}/` });

        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Delete: {
            Objects: objectsToDelete,
          },
        };

        // Inicia una transacción en la base de datos
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
          // Elimina los objetos dentro de la carpeta y la carpeta en S3
          await s3.deleteObjects(params).promise();

          // Elimina el recoleccion de la base de datos
          await Collect.findByIdAndDelete(id);

          // Confirma la transacción en la base de datos
          await session.commitTransaction();
          session.endSession();

          console.log(
            'Images and folder deleted from S3, and collect deleted from database:',
            id
          );

          return res.status(200).json(collect);
        } catch (error) {
          // Realiza un rollback de la transacción en la base de datos
          await session.abortTransaction();
          session.endSession();

          console.error(
            'Error deleting images and folder from S3 or deleting collect from database:',
            error
          );

          return res.status(500).json({ error: 'Failed to delete collect' });
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ error: 'Method not allowed' });
  }
}
