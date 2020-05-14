import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatModule } from './cat.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './repository/cat.entity';
import { catMock } from './repository/cat.factory';

describe('Cat Controller', () => {
    let controller: CatController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CatModule],
        })
            .overrideProvider(getRepositoryToken(Cat))
            .useValue(catMock)
            .compile();

        controller = module.get<CatController>(CatController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get all cats', () => {
        expect(controller.getAllCats()).toStrictEqual(catMock.find());
    });

    it('should create a cat', () => {
        const cat = {
            name: 'Turquil',
            age: 2,
        };
        expect(controller.createCat(cat)).toStrictEqual(catMock.save(cat));
    });
});
