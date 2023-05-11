// pages/api/s3.js

import { S3 } from 'aws-sdk';

export default async function handler(req, res) {
  const { method } = req;

  // Configura el cliente de S3
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async function uploadToS3(file, productId) {
    const fileName = `${productId}/${file.name}`;
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      return response.Location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  }

  async function deleteFromS3(key) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting from S3:', error);
    }
  }

  switch (method) {
    case 'POST': {
      const uploadedImageUrl = await uploadToS3(
        req.body.file,
        req.body.productId
      );
      res.status(200).json({ imageUrl: uploadedImageUrl });
      break;
    }
    case 'DELETE': {
      await deleteFromS3(req.body.key);
      res.status(200).json({ message: 'Image deleted successfully' });
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
