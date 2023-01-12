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
    POSTGRES_PASSWORD: z.string().min(6),
    POSTGRES_DB: z.string(),
    SYNC_SWAGGER: z.string().transform((v) => !!v),

    MINIO_ACCESS_KEY: z.string().min(10),
    MINIO_SECRET_KEY: z.string().min(10),
    MINIO_ENDPOINT: z.string().optional(),
    MINIO_PORT: portValidation,
    MINIO_BROWSER: z.enum(['off']),
    MINIO_BUCKET: z.string(),

    GG_ID: z.string(),
    GG_SECRET: z.string(),
    JWT_SECRET: z.string().min(8),

    CLIENT_URL: z.string().url(),
  })
  .passthrough();

export const Env = SchemaBody.parse(process.env);
