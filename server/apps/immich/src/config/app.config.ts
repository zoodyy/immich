import { ConfigModuleOptions } from '@nestjs/config';
import { object, string, boolean, any } from 'joi';

export const immichAppConfig: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
  validationSchema: object({
    NODE_ENV: string().required().valid('development', 'production', 'staging').default('development'),
    DB_USERNAME: string().required(),
    DB_PASSWORD: string().required(),
    DB_DATABASE_NAME: string().required(),
    JWT_SECRET: string().required(),
    ENABLE_MAPBOX: boolean().required().valid(true, false),
    MAPBOX_KEY: any().when('ENABLE_MAPBOX', {
      is: false,
      then: string().optional().allow(null, ''),
      otherwise: string().required(),
    }),
    VITE_SERVER_ENDPOINT: string().required(),
  }),
};
