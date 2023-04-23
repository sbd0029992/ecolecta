import Affiliate from 'models/Affiliate';
import { dbConnect } from 'utils/mongosee';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const affiliates = await Affiliate.find({});
        return res.status(200).json(affiliates);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newAffiliate = new Affiliate(body);
        console.log(
          '🚀 ~ file: index.js:20 ~ handler ~ newAffiliate:',
          newAffiliate
        );
        const savedAffiliate = await newAffiliate.save();
        console.log(
          '🚀 ~ file: index.js:21 ~ handler ~ savedAffiliate:',
          savedAffiliate
        );

        return res.status(201).json(savedAffiliate);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}
