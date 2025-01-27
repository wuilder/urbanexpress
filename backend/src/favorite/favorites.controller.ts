import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Get(':userId')
    async getFavorites(@Param('userId') userId: string) {
        return this.favoritesService.getFavorites(userId);
    }

    @Post(':userId')
    async addFavorite(
        @Param('userId') userId: string,
        @Body('courseId') courseId: string,
    ) {
        return this.favoritesService.addFavorite(userId, courseId);
    }

    @Delete(':userId')
    async removeFavorite(
        @Param('userId') userId: string,
        @Body('courseId') courseId: string,
    ) {
        return this.favoritesService.removeFavorite(userId, courseId);
    }
}