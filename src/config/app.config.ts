import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    name: process.env.APP_NAME || 'Carsome Scaffold API',
    url: process.env.APP_URL || 'http://localhost:3000',
    timeZone: process.env.APP_TIMEZONE || 'Asia/Kuala_Lumpur',
}));
