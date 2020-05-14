import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import app from '../config/app.config';
import auth from '../config/auth.config';
import database from '../config/database.config';
import mail from '../config/mail.config';
import { DatabaseModule } from '../database/database.module';
import { CatModule } from './cat/cat.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [app, auth, database, mail],
            isGlobal: true,
        }),
        DatabaseModule,
        CatModule,
    ],
})
export class AppModule {}
