import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatorInterface } from '../../database/base.repository';
import { PaginationRequestInterface } from '../../utils/pagination.http-query';
import { PaginationHelper } from '../../utils/pagination.helper';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        return next
            .handle()
            .pipe(
                map(data => this.handlePagination(data, req.path, req.query)),
            );
    }

    handlePagination(data, url, query: Partial<PaginationRequestInterface>) {
        const responseBuilder = {
            success: data?.success ?? true,
            data: data?.data ?? data ?? undefined,
        };

        if (data?.pagination) {
            const pagination: PaginatorInterface = data.pagination;

            Object.assign(pagination, { next: '' });
            Object.assign(pagination, { prev: '' });

            if (!query.page) {
                Object.assign(query, { page: 1 });
            }
            const currentPage = query.page;

            if (query.page && Number(currentPage) < pagination.totalPages) {
                pagination.next =
                    url +
                    '?' +
                    PaginationHelper.nextPage(
                        query,
                        currentPage,
                        pagination.totalPages,
                    );
            }

            if (query.page && Number(currentPage) > 1) {
                pagination.prev =
                    url + '?' + PaginationHelper.prevPage(query, currentPage);
            }

            Object.assign(responseBuilder, { pagination });
        }

        return responseBuilder;
    }
}
