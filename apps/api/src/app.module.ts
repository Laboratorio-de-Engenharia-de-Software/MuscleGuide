import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserProfileModule } from './modules/auth-user-profile/auth-user-profile.module'; // <-- IMPORTANTE
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthUserProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
