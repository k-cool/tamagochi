import { Connection } from 'mongoose';
import { PetSchema } from './pet.schema';

export const petProviders = [
  {
    provide: 'PET_MODEL',
    useFactory: (connection: Connection) => connection.model('Pet', PetSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
