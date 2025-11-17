import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserProfileModule } from './modules/auth-user-profile/auth-user-profile.module'; // <-- IMPORTANTE
import { ConfigModule } from '@nestjs/config';
import { TrainingGuideModule } from 'modules/training-guide/training-guide.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthUserProfileModule,
    TrainingGuideModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
