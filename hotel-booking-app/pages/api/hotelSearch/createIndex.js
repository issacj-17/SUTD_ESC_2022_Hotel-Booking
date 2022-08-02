import { createIndex } from '../../../modules/hotelSearch/lib/redis.js'

export default async function handler(req, res) {
    await createIndex();
    res.status(200).send('OK');
}
