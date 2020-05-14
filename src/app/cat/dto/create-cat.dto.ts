import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
    @ApiModelProperty({ description: 'The name of the cat.' })
    @IsString()
    readonly name: string;

    @ApiModelProperty({ description: 'Age of the cat, in month.' })
    @IsNumber()
    readonly age: number;
}
