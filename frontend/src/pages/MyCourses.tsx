import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import MyCoursesTable from '../components/mycourses/MyCoursesTable';
import Layout from '../components/layout';
import useAuth from '../hooks/useAuth';
import CreateCourseRequest from '../models/course/CreateCourseRequest';
import enrollService from '../services/EnrollService';

export default function MyCourses() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { authenticatedUser } = useAuth();
  const { data, isLoading, refetch } = useQuery(
    ['userCourses', authenticatedUser?.id],
    () =>
      enrollService.getUserCourses(authenticatedUser?.id),
    {
      refetchInterval: false,
    },
  );

  const {
    formState: { isSubmitting },
  } = useForm<CreateCourseRequest>();


  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">My Courses</h1>
      <hr />
      <div className="table-filter">
        <div className="flex flex-row gap-5">
          <input
            type="text"
            className="input w-1/2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input w-1/2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <MyCoursesTable data={data} isLoading={isLoading} refetch={refetch} />
    </Layout>
  );
}
