import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import MyCourse from '../../models/course/myCourses';
import UpdateCourseRequest from '../../models/course/UpdateCourseRequest';
import enrollService from '../../services/EnrollService';
import Table from '../shared/Table';
import TableItem from '../shared/TableItem';

interface UsersCoursesTableProps {
  data: MyCourse[];
  isLoading: boolean;
  refetch: () => void;
}

export default function MyCoursesTable({ data, isLoading }: UsersCoursesTableProps) {
  const { authenticatedUser } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string>();
  const [error, setError] = useState<string>();

  const {
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateCourseRequest>();

  const unEnrollCourse = async (userId: string) => {
    try {
      await enrollService.unenrollCourse(userId, selectedCourseId);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response);
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
                  <Link to={`/courses/${id}`}>{course.name}</Link>
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
                        unEnrollCourse(authenticatedUser.id);
                      }}
                    >
                      Unenroll
                    </button>
                  ) : null}
                </TableItem>
              </tr>
            ))}
        </Table>
        {!isLoading && data.length < 1 ? (
          <div className="text-center my-5 text-gray-500">
            <h1>Empty</h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
