/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Đánh dấu lớp Product là một Entity. Điều này có nghĩa là lớp này sẽ được ánh xạ tới một bảng trong cơ sở dữ liệu.
@Entity()
export class Product {
    // Đánh dấu thuộc tính id là khóa chính của bảng và giá trị của nó sẽ được tự động sinh ra (auto-increment).
    @PrimaryGeneratedColumn()
    id: number;

    //Đánh dấu thuộc tính name là một cột trong bảng. Kiểu dữ liệu mặc định là string.
    @Column()
    name: string;

    //Đánh dấu thuộc tính price là một cột trong bảng với kiểu dữ liệu là decimal.
    @Column('decimal')
    price: number;
}