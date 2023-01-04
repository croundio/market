import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../../.env.server` });

const portValidation = z
  .string()
  .transform((v) => +v)
  .refine(
    (v) => v > 1 && v < 65555,
    (v) => ({ message: `'${v}' is not correct port` }),
  );

export const SchemaBody = z
  .object({
    SERVER_PORT: portValidation,
    API_PREFIX: z.string(),

    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: portValidation,
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    SYNC_SWAGGER: z.string().transform((v) => !!v),

    GG_ID: z.string(),
    GG_SECRET: z.string(),
    JWT_SECRET: z.string(),
  })
  .passthrough();

export const Env = SchemaBody.parse(process.env);
