import {disconnect} from "../../../modules/hotelSearch/lib/redis";

export default async function handler(req, res) {
    await disconnect();
    res.status(200).send('OK');
}