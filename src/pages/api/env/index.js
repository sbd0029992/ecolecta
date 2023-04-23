export default function handler(req, res) {
  res.status(200).json({
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    awsBucket: process.env.AWS_BUCKET_NAME,
  });
}
