import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Post,
    Get,
    Param,
    UseGuards,
    UseInterceptors,
    NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserGuard } from '../auth/guards/user.guard';
import { EnrollUserCourseDto, UnenrollUserCourseDto } from './userCourse.dto';
import { UserCourse } from './userCourse.entity';
import { UserCourseService } from './userCourse.service';

@Controller('usercourses')
@ApiTags('UserCourses')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserCourseController {
    constructor(private readonly userCourseService: UserCourseService) { }

    @Get('/:id')
    async getUserCourses(@Param('id') userId: string) {
        const response = await this.userCourseService.findAllUserCourses(userId);
        return response
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() enrollUserCourseDto: EnrollUserCourseDto): Promise<UserCourse> {
        return await this.userCourseService.save(enrollUserCourseDto);
    }

    @Delete()
    async delete(@Body() unenrollUserCourseDto: UnenrollUserCourseDto): Promise<string> {
        return await this.userCourseService.delete(unenrollUserCourseDto);
    }
}
