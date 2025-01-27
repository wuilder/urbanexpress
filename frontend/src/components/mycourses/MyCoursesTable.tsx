import { useState, useEffect } from 'react';
import { CheckCircle, Heart } from 'react-feather';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import MyCourse from '../../models/course/myCourses';
import enrollService from '../../services/EnrollService';
import Table from '../shared/Table';
import TableItem from '../shared/TableItem';

interface UsersCoursesTableProps {
  data: MyCourse[];
  isLoading: boolean;
}

export default function MyCoursesTable({
  data,
  isLoading,
}: UsersCoursesTableProps) {
  const { authenticatedUser } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string>();
  const [error, setError] = useState<string>();
  const [successUnEnrolled, SetSuccessUnEnrolled] = useState<string>();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await enrollService.getUserCourseFavorite(
          authenticatedUser.id,
        );
        setFavorites(response.data.map((fav: any) => fav.courseId));
      } catch (error) {
        setError(`Error fetching favorites: ${error}`);
      }
    };

    fetchFavorites();
  }, [authenticatedUser.id]);

  const unEnrollCourse = async (userId: string, courseId: string) => {
    try {
      await enrollService.unenrollCourse(userId, courseId);
      setError(null);
      SetSuccessUnEnrolled('UnEnrolled was successful.');
      setTimeout(() => SetSuccessUnEnrolled(null), 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const toggleFavorite = async (courseId: string) => {
    try {
      if (favorites.includes(courseId)) {
        await enrollService.removeFavorite(authenticatedUser.id, courseId);
        setFavorites(favorites.filter((id) => id !== courseId));
      } else {
        await enrollService.addFavorite(authenticatedUser.id, courseId);
        setFavorites([...favorites, courseId]);
      }
    } catch (error) {
      setError(`Error toggling favorite: ${error}`);
    }
  };

  return (
    <>
      <div className="table-container">
        <Table columns={['Name', 'Enrolment Date', 'Favorite']}>
          {isLoading
            ? null
            : data.map(({ id, dateJoined, course }) => (
              <tr key={id}>
                <TableItem>
                  <Link to={`/courses/${course.id}`}>{course.name}</Link>
                </TableItem>
                <TableItem>
                  {new Date(dateJoined).toLocaleDateString()}
                </TableItem>
                <TableItem>
                  <button
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                    onClick={() => toggleFavorite(course.id)}
                  >
                    {favorites.includes(course.id) ? (
                      <Heart size={20} color="red" />
                    ) : (
                      <Heart size={20} color="gray" />
                    )}
                  </button>
                </TableItem>
                <TableItem>
                  {['user'].includes(authenticatedUser.role) ? (
                    <button
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                      onClick={() => {
                        setSelectedCourseId(id);
                        unEnrollCourse(authenticatedUser.id, course.id);
                      }}
                    >
                      Unenroll
                    </button>
                  ) : null}
                </TableItem>
              </tr>
            ))}
        </Table>
        {!isLoading && data.length < 1 && error && (
          <div className="mb4 bg-red-100 border border-red-500 text-red-600 rounded p-3">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        {!isLoading && data.length < 1 && successUnEnrolled && (
          <div className="mb4 bg-green-100 border border-green-500 text-green-600 rounded p-3">
            <CheckCircle size={20} className="mr-2" />
            <p className="text-sm font-medium">{successUnEnrolled}</p>
          </div>
        )}
        {!isLoading && data.length < 1 ? (
          <div className="text-center my-5 text-gray-500">
            <h1>No courses enrolled</h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
