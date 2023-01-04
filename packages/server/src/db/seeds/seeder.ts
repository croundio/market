import { Factory, Seeder as Seeding } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { seeds } from './data';

export class Seeder implements Seeding {
  async run(factory: Factory, connection: Connection): Promise<void> {
    for await (const seedsList of seeds) {
      const repository = await connection.getRepository(seedsList.entity);

      const data = seedsList.seeds.map((obj) => {
        const entity = new seedsList.entity();
        Object.keys(obj).forEach((key) => {
          entity[key] = obj[key];
        });

        return entity;
      });

      await repository.save(data);
    }
  }
}
