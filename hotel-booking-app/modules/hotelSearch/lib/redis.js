import {Client, Entity, Schema} from 'redis-om';
import {JsonRepository} from "redis-om/dist/repository/repository";

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Destination extends Entity {}
let schema = new Schema(
    Destination,
    {
        term: {type: 'text', textSearch: true, weight: 1.25},
        type: {type: 'string'},
        uid: {type: 'string'},
        state: {type: 'text', textSearch: true},
    },
{
    dataStructure: 'JSON',
    }
);

export async function createDestination(data) {
    await connect();
    const repository = new JsonRepository(schema, client);
    const destination = repository.createEntity(data);

    const id = await repository.save(destination);
    return id;
}

export async function createIndex() {
    await connect();

    const repository = new JsonRepository(schema, client);
    await repository.createIndex();
}

export async function searchDestinations(q) {
    await connect();

    const repository = new JsonRepository(schema, client);

    const destinations = await repository.searchRaw(`(${q}*|%${q}%)`)
        .return.page(0, 80);


    return destinations;
}