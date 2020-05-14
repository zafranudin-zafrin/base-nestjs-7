import { EntityRepository } from 'typeorm';
import { Cat } from './cat.entity';
import { BaseRepository } from '../../../database/base.repository';

@EntityRepository(Cat)
export class CatRepository extends BaseRepository<Cat> {
    async findByName(name: any) {
        return this.findOne({ name });
    }

    async findSeniorCat() {
        return this.createQueryBuilder('cat')
            .where('cat.age >= :age', { age: 5 })
            .getManyAndCount();
    }
}
