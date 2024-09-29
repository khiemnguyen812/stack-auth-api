import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/modules/product/product.module';
import { AppDataSource } from 'src/data-source';
import { Connection } from 'typeorm';
import { StackAuthModule } from './modules/stackAuth/stackAuth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    StackAuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Database connection established successfully');
    } catch (error) {
      console.error('Database connection failed', error);
    }
  }
}
