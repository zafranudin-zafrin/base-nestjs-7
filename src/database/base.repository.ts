import { Repository } from 'typeorm';

export interface PaginatorInterface {
    limit: number;
    current: number;
    totalItems: number;
    totalPages: number;
    next?: string;
    prev?: string;
}

export interface PaginatedResInterface {
    data: any;
    pagination: PaginatorInterface;
}

export class BaseRepository<Entity> extends Repository<Entity> {
    async paginate({ query, page, limit }): Promise<PaginatedResInterface> {
        const [total, results] = await Promise.all([
            this.count(query),
            this.find(query),
        ]);

        return {
            data: results,
            pagination: {
                limit,
                current: page,
                totalItems: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
