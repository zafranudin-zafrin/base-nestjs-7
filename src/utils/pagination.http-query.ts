export interface PaginationRequestInterface {
    page: string;
    limit: string;
}

export class PaginationHttpQuery {
    constructor(payload: PaginationRequestInterface) {
        const { limit = '30', page = '1' } = payload;
        this.page = Number(page);
        this.limit = Number(limit);
        this.skip = (Number(page) - 1) * Number(limit);
    }

    private _query: object = {};

    get query() {
        return this._query;
    }

    private _page;

    get page() {
        return this._page;
    }

    set page(value) {
        this._page = value;
    }

    private _limit: number;

    get limit() {
        return this._limit;
    }

    set limit(value) {
        Object.assign(this.query, { take: value });
        this._limit = value;
    }

    private _skip: number;

    get skip() {
        return this._skip;
    }

    set skip(value) {
        Object.assign(this.query, { skip: value });
        this._skip = value;
    }

    static merge<T, U>(httpQuery: T, query: U): T & U {
        return Object.assign(httpQuery, query);
    }
}
