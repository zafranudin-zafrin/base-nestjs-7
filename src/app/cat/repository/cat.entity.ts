import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity()
export class Cat {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({ example: 'Tommy' })
    @Column({ length: 500 })
    name: string;

    @ApiModelProperty({ example: 3, description: 'Age in months' })
    @Column()
    age: number;
}
