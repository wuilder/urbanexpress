import apiService from './ApiService';

class EnrollService {
  async enrollCourse(userId, courseId) {
    const userCourse = {
      userId,
      courseId,
    };
    await apiService.post('/api/usercourses', { userId, courseId });
  }

  async unenrollCourse(userId: string, courseId: string) {
    const userCourse = {
      userId,
      courseId,
    };
    await apiService.delete('/api/usercourses', { data: userCourse });
  }
}

export default new EnrollService();
