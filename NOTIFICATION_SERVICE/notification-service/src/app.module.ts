import { Module, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  onApplicationBootstrap() {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<string>('DB_PORT');
    const dbName = this.configService.get<string>('DB_NAME');

    if (this.dataSource.isInitialized) {
      this.logger.log(`✅ DB connected: mysql://${host}:${port}/${dbName}`);
    } else {
      this.logger.error(
        `❌ DB not initialized: mysql://${host}:${port}/${dbName}`,
      );
    }
  }
}
