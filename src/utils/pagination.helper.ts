export class PaginationHelper {
    static nextPage(query, currentPage, totalPage) {
        if (query.page && Number(currentPage) < totalPage) {
            const next = Number(currentPage) + 1;
            query.page = String(next);
            return this.objectToUrl(query);
        }
        return '';
    }

    static prevPage(query, currentPage) {
        if (query.page && Number(currentPage) > 1) {
            const next = Number(currentPage) - 1;
            query.page = String(next);
            return this.objectToUrl(query);
        }
        return '';
    }

    static objectToUrl(payload: object) {
        return Object.keys(payload)
            .map(key => `${key}=${encodeURIComponent(payload[key])}`)
            .join('&');
    }
}
