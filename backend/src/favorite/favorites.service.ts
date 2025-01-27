import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCourse } from '../userCourse/userCourse.entity';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(UserCourse)
        private readonly userCourseRepository: Repository<UserCourse>,
    ) { }

    async getFavorites(userId: string): Promise<UserCourse[]> {
        return this.userCourseRepository.find({
            where: { userId, isFavorite: true },
            relations: ['course'],
        });
    }

    async addFavorite(userId: string, courseId: string): Promise<UserCourse> {
        let userCourse = await this.userCourseRepository.findOne({
            where: { userId, courseId },
        });

        if (userCourse) {
            userCourse.isFavorite = true;
            return this.userCourseRepository.save(userCourse);
        } else {
            userCourse = this.userCourseRepository.create({
                userId,
                courseId,
                isFavorite: true,
            });
            return this.userCourseRepository.save(userCourse);
        }
    }

    async removeFavorite(userId: string, courseId: string): Promise<void> {
        const userCourse = await this.userCourseRepository.findOne({
            where: { userId, courseId },
        });

        if (userCourse) {
            userCourse.isFavorite = false;
            await this.userCourseRepository.save(userCourse);
        }
    }
}
