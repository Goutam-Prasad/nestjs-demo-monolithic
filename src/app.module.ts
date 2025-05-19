import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // OK since you're running NestJS locally
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'test_nestjs',
    logging: true,
    synchronize: true, // set to false in production

    autoLoadEntities: true,
  }), AuthModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}




