import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductTable1727264795538 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable('product');
        if (!tableExists) {
            await queryRunner.createTable(
                new Table({
                    name: 'product',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                        },
                        {
                            name: 'price',
                            type: 'decimal',
                        },
                    ],
                }),
            );
        }

        // Chèn dữ liệu mẫu vào bảng product
        await queryRunner.query(`
      INSERT INTO product (name, price) VALUES
      ('Product 1', 10.99),
      ('Product 2', 20.99),
      ('Product 3', 30.99);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa dữ liệu mẫu đã chèn
        await queryRunner.query(`
      DELETE FROM product WHERE name IN ('Product 1', 'Product 2', 'Product 3');
    `);

        // Kiểm tra và xóa bảng nếu tồn tại
        const tableExists = await queryRunner.hasTable('product');
        if (tableExists) {
            await queryRunner.dropTable('product');
        }
    }
}