export const errorResponse = (
    type: string,
    message: string = null,
    details = null,
) => {
    return {
        error: type,
        message,
        details,
    };
};
