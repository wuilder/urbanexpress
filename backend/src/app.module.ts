import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { CourseModule } from './course/course.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { UserCourseModule } from './userCourse/userCourse.module';
import { FavoritesModule } from './favorite/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    UserCourseModule,
    FavoritesModule,
    AuthModule,
    CourseModule,
    ContentModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
