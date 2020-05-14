export const catMock = {
    find() {
        return [
            {
                name: 'Sam',
                age: 3,
            },
        ];
    },
    create(body) {
        return body;
    },
    save(body) {
        body.id = 1;
        return body;
    },
};
