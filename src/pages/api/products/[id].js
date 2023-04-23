import { S3 } from 'aws-sdk';
import Product from 'models/Product';
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
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
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
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // Elimina las imágenes del bucket de S3
        const images = product.images;

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

          // Elimina el producto de la base de datos
          await Product.findByIdAndDelete(id);

          // Confirma la transacción en la base de datos
          await session.commitTransaction();
          session.endSession();

          console.log(
            'Images and folder deleted from S3, and product deleted from database:',
            id
          );

          return res.status(200).json(product);
        } catch (error) {
          // Realiza un rollback de la transacción en la base de datos
          await session.abortTransaction();
          session.endSession();

          console.error(
            'Error deleting images and folder from S3 or deleting product from database:',
            error
          );

          return res.status(500).json({ error: 'Failed to delete product' });
        }
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ error: 'Method not allowed' });
  }
}
