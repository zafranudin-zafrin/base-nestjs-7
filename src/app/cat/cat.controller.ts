import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cat } from './repository/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';
import {
    PaginationHttpQuery,
    PaginationRequestInterface,
} from '../../utils/pagination.http-query';

@ApiTags('cat')
@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Get()
    @ApiOperation({ summary: 'Return all cats' })
    @ApiResponse({ status: 200, description: 'Success', type: [Cat] })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    index(@Query() httpQuery: PaginationRequestInterface): Promise<any> {
        return this.catService.findAll(new PaginationHttpQuery(httpQuery));
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Return cat by name' })
    @ApiResponse({ status: 200, description: 'Success', type: Cat })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    show(@Param('id') id: string): Promise<Cat> {
        return this.catService.findById(id);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Return cat by name' })
    @ApiResponse({ status: 200, description: 'Success', type: Cat })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    update(@Param('id') id: string, @Body() body: UpdateCatDto): Promise<void> {
        return this.catService.updateById(id, body);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new cat' })
    @ApiResponse({ status: 200, description: 'Success', type: Cat })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    create(@Body() body: CreateCatDto) {
        return this.catService.create(body);
    }

    @Get('senior')
    @ApiOperation({ summary: 'Return senior cat' })
    @ApiResponse({ status: 200, description: 'Success', type: [Cat] })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error.' })
    findSeniorCat() {
        return this.catService.findSenior();
    }
}
