import { IsString, IsNumber, MinLength } from 'class-validator';

export class createProductDto {
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    name: string;

    @IsNumber({}, { message: 'Price must be a number' })
    price: number;
}

export class updateProductDto {
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    name: string;

    @IsNumber({}, { message: 'Price must be a number' })
    price: number;
}