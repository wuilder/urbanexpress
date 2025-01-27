import Course from './Course';

export default interface MyCourses {
  id: string;
  userId: string;
  courseId: string;
  dateJoined: Date;
  isFavorite: boolean;
  course: Course;
}
