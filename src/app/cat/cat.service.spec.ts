import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './repository/cat.entity';
import { catMock } from './repository/cat.factory';
import { CatModule } from './cat.module';

describe('CatService', () => {
    let service: CatService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CatModule],
        })
            .overrideProvider(getRepositoryToken(Cat))
            .useValue(catMock)
            .compile();

        service = module.get<CatService>(CatService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should find all cats', () => {
        expect(service.findAll()).toStrictEqual(catMock.find());
    });

    it('should create a cat', () => {
        const cat = {
            name: 'Turquil',
            age: 2,
        };
        expect(service.create(cat)).toStrictEqual(catMock.save(cat));
    });
});
