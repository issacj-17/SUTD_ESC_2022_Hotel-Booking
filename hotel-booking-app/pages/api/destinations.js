import { createDestination } from '../../modules/hotelSearch/lib/redis.js';

export default async function handler(req, res) {
    const id = await createDestination(req.body);
    res.status(200).json({ id })
}
