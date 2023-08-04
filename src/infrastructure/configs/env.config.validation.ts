import * as Joi from "joi";
import { Environment } from "../../business/enum/env.enum";

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(Environment.Development, Environment.Local, Environment.Production, Environment.Test)
    .required(),
  APP_PORT: Joi.number().required(),

  PG_HOST: Joi.string().required(),
  PG_PORT: Joi.number().required(),
  PG_USER: Joi.string().required(),
  PG_PASSWORD: Joi.string().required(),
  PG_DATABASE: Joi.string().required(),

  CACHE_REDIS_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),

  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().optional(),
  FIREBASE_PROJECT_ID: Joi.string().optional(),

  JWT_ACCESS_TIMER: Joi.string().optional(),
  JWT_REFRESH_TIMER: Joi.string().optional(),
  JWT_ACCESS_KEY: Joi.string().required(),
  JWT_REFRESH_KEY: Joi.string().required(),

  BITLY_ACCESS_TOKEN: Joi.string().required(),
});
