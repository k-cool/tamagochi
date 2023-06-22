import * as Joi from 'joi';

export const createPetSchema = Joi.object({
  name: Joi.string().required(),
});

export class CreatePetDTO {
  name: string;
}