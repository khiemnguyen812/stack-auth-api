import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StackAuthController } from './stackAuth.controller';
import { StackAuthService } from './stackAuth.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [StackAuthService],
  controllers: [StackAuthController],
})
export class StackAuthModule {}