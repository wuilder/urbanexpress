import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollUserCourseDto, UnenrollUserCourseDto } from './userCourse.dto';
import { UserCourse } from './userCourse.entity';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(UserCourse)
    private userCourseRepository: Repository<UserCourse>,
  ) { }

  async save(enrollUserCourseDto: EnrollUserCourseDto): Promise<UserCourse> {
    const { userId, courseId } = enrollUserCourseDto;

    const userCourse = await this.findByUserCourse(userId, courseId);
    if (userCourse) {
      throw new HttpException(
        `The user is already registered in the course.`,
        HttpStatus.CONFLICT,
      );
    }

    const userCourseEntity = this.userCourseRepository.create(enrollUserCourseDto);
    return this.userCourseRepository.save(userCourseEntity);
  }

  async findByUserCourse(userId: string, courseId: string) {
    return this.userCourseRepository.findOne({
      where: { userId, courseId },
    });
  }

  async findAllUserCourses(userId: string) {
    return this.userCourseRepository
      .createQueryBuilder('userCourse')
      .leftJoinAndSelect('userCourse.course', 'course')
      .where('userCourse.userId = :userId', { userId })
      .orderBy('course.name', 'ASC')
      .getMany();
  }

  async delete(unenrollUserCourseDto: UnenrollUserCourseDto): Promise<any> {
    const { userId, courseId } = unenrollUserCourseDto;

    const result = await this.userCourseRepository.delete({
      user: { id: userId },
      course: { id: courseId },
    });

    if (result.affected === 0) {
      throw new HttpException(
        'User is not enrolled in this course.',
        HttpStatus.NOT_FOUND,
      );
    }

    return { message: 'User successfully unenrolled from the course.' };
  }
}
