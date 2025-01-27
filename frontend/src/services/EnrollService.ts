import apiService from './ApiService';

import MyCourse from '../models/course/myCourses';

class EnrollService {
  async enrollCourse(userId: string, courseId: string) {
    await apiService.post('/api/usercourses', { userId, courseId });
  }

  async unenrollCourse(userId: string, courseId: string) {
    const userCourse = {
      userId,
      courseId,
    };
    await apiService.delete('/api/usercourses', { data: userCourse });
  }

  async getUserCourses(userId: string): Promise<MyCourse[]> {
    return (await apiService.get(`/api/usercourses/${userId}`)).data;
  }

  async getUserCourseFavorite(userId: string) {
    return await apiService.get(`/api/favorites/${userId}`);
  }

  async addFavorite(userId: string, courseId: string) {
    return await apiService.post(`/api/favorites/${userId}`, { courseId });
  }

  async removeFavorite(userId: string, courseId: string) {
    return await apiService.delete(`/api/favorites/${userId}`, {
      data: { courseId },
    });
  }
}

export default new EnrollService();
