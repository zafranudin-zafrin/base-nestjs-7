import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './repository/cat.entity';
import { CreateCatDto } from './dto';
import { CarsomeException } from '../../common/exception/carsome.exception';
import { CatRepository } from './repository/cat.repository';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PaginationHttpQuery } from '../../utils/pagination.http-query';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat)
        private readonly repository: CatRepository,
    ) {}

    async findAll(httpQuery: PaginationHttpQuery): Promise<any> {
        const findOption: any = {};
        const query = PaginationHttpQuery.merge(findOption, httpQuery.query);
        return await this.repository.paginate({
            query,
            page: httpQuery.page,
            limit: httpQuery.limit,
        });
    }

    async findById(id): Promise<Cat> {
        const cat = await this.repository.findOne({ id });
        if (!cat) {
            throw new NotFoundException();
        }
        return cat;
    }

    async findSenior() {
        return this.repository.findSeniorCat();
    }

    create(body: CreateCatDto): Promise<Cat> {
        if (body.age > 20) {
            throw new CarsomeException(
                'cat_invalid_age',
                'Cat age cannot exceed 20.',
            );
        }

        const cat = this.repository.create(body);
        return this.repository.save(cat);
    }

    async updateById(id: string, body: UpdateCatDto): Promise<void> {
        const partialRecord = {};

        if (body.name) {
            Object.assign(partialRecord, { name: body.name });
        }

        if (body.age) {
            Object.assign(partialRecord, { age: body.age });
        }

        await this.repository.update(id, partialRecord);
    }
}
