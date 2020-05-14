import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import database from '../config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [database],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,

            entities: ['dist/**/*.entity{.ts,.js}'],

            synchronize: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
