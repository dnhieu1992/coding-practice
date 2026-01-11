import 'dotenv/config';
import 'reflect-metadata';
import { UserEntity } from '../modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

console.log('[MIGRATION] data-source loaded');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserEntity],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
