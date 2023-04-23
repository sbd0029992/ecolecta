import { S3 } from 'aws-sdk';
import Affiliate from 'models/Affiliate';
import mongoose from 'mongoose';
import { dbConnect } from 'utils/mongosee';

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
        const affiliate = await Affiliate.findById(id);

        if (!affiliate) {
          return res.status(404).json({ error: 'Affiliate not found' });
        }

        return res.status(200).json(affiliate);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'PUT':
      try {
        const affiliate = await Affiliate.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!affiliate) {
          return res.status(404).json({ error: 'Affiliate not found' });
        }

        return res.status(200).json(affiliate);
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
        const affiliate = await Affiliate.findById(id);

        if (!affiliate) {
          return res.status(404).json({ error: 'affiliate not found' });
        }

        // Elimina las imágenes del bucket de S3
        const images = affiliate.images;

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

          // Elimina el affiliateo de la base de datos
          await Affiliate.findByIdAndDelete(id);

          // Confirma la transacción en la base de datos
          await session.commitTransaction();
          session.endSession();

          console.log(
            'Images and folder deleted from S3, and affiliate deleted from database:',
            id
          );

          return res.status(200).json(affiliate);
        } catch (error) {
          // Realiza un rollback de la transacción en la base de datos
          await session.abortTransaction();
          session.endSession();

          console.error(
            'Error deleting images and folder from S3 or deleting affiliate from database:',
            error
          );

          return res.status(500).json({ error: 'Failed to delete affiliate' });
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}
