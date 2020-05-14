import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from './repository/cat.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CatRepository])],
    controllers: [CatController],
    providers: [CatService],
})
export class CatModule {}
