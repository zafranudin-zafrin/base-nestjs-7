import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from './common/security/helmet';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { CarsomeException } from './common/exception/carsome.exception';
import { HttpResponseInterceptor } from './common/interceptors/http-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (errors: ValidationError[]) =>
                new CarsomeException('validation', 'Validation error.', errors),
        }),
    );

    app.useGlobalInterceptors(new HttpResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'prod'
    ) {
        /* process.env.npm_package_* from the package.json */
        const options = new DocumentBuilder()
            .setTitle(process.env.npm_package_name || "Carsome's Scaffold API")
            .setDescription(process.env.npm_package_description)
            .setVersion(process.env.npm_package_version || '1.0')
            .build();
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup('api', app, document);
    }

    await app.listen(3000);
}

bootstrap();
