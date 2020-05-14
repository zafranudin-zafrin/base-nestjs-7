import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    tokenExpired: Number(process.env.TOKEN_EXPIRED) || 3600,
    tokenSecret: process.env.TOKEN_SECRET,
}));
