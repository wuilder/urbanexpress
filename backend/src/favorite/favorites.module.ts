import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourse } from '../userCourse/userCourse.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserCourse])],
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule { }