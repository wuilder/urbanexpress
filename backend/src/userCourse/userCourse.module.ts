import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourse } from './userCourse.entity';
import { UserCourseService } from './userCourse.service';
import { UserCourseController } from './userCourse.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UserCourse])],
  controllers: [UserCourseController],
  providers: [UserCourseService],
  exports: [UserCourseService],
})
export class UserCourseModule { }
