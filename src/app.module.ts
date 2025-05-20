import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TasksModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', // OK since you're running NestJS locally
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'test_nestjs',
    logging: true,
    synchronize: true, // set to false in production

    autoLoadEntities: true,
    }),
    AuthModule,
    LoggerModule.forRootAsync({
      useFactory: async () => {
        const logFolder = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logFolder)) {
          fs.mkdirSync(logFolder, { recursive: true });
        }

        return {
          pinoHttp: {
            level: 'trace',
            redact: ['req.headers.authorization', 'req.headers.host'],
            genReqId: (request) => request.headers['x-correlation-id'] || randomUUID(),
            // stream: pino.destination(path.join(logFolder, 'app.log')),
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            },
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

