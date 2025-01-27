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
}

export default new EnrollService();
