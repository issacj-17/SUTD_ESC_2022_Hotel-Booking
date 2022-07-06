import { searchDestinations } from '../../modules/hotelSearch/lib/redis.js'

export default async function handler(req, res) {
    const q = req.query.q;
    const destinations = await searchDestinations(q);
    res.status(200).json({ destinations });
}
