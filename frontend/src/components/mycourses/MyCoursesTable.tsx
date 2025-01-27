import { useState } from 'react';
import { CheckCircle } from 'react-feather';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import MyCourse from '../../models/course/myCourses';
import enrollService from '../../services/EnrollService';
import Table from '../shared/Table';
import TableItem from '../shared/TableItem';

interface UsersCoursesTableProps {
  data: MyCourse[];
  isLoading: boolean;
  //refetch: () => void;
}

export default function MyCoursesTable({
  data,
  isLoading,
}: UsersCoursesTableProps) {
  const { authenticatedUser } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string>();
  const [error, setError] = useState<string>();
  const [successUnEnrolled, SetSuccessUnEnrolled] = useState<string>()

  const unEnrollCourse = async (userId: string, courseId: string) => {
    try {
      await enrollService.unenrollCourse(userId, courseId);
      setError(null);
      SetSuccessUnEnrolled('UnEnrolled was successful.')
      setTimeout(() => SetSuccessUnEnrolled(null), 3000)
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="table-container">
        <Table columns={['Name', 'Enrolment Date']}>
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
        {error && (
          <div className="mb4 bg-red-100 border border-red-500 text-red-600 rounded p-3">
            <p className="text-sm font-medium">
              {error}
            </p>
          </div>
        )}
        {successUnEnrolled && (
          <div className="mb4 bg-green-100 border border-green-500 text-green-600 rounded p-3">
            <CheckCircle size={20} className="mr-2" />
            <p className="text-sm font-medium">
              {successUnEnrolled}
            </p>
          </div>
        )}
        {!isLoading && data.length < 1 ? (
          <div className="text-center my-5 text-gray-500">
            <h1>Empty</h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
