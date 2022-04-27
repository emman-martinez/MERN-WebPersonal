import React, { useEffect, useState } from 'react';
import { getCoursesApi } from '../../api/courses';
import { CoursesList } from '../../components/Admin/Courses/CoursesList/CoursesList';


export const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    useEffect(() => {
        const getCourses = async() => {
            const allCourses = await getCoursesApi();
            setCourses(allCourses.courses);
        };
        getCourses();
        setReloadCourses(false);
    }, [reloadCourses]);

    return (
        <div className='courses'>
            <CoursesList
                courses={ courses }
                setReloadCourses={ setReloadCourses }
            />
        </div>
    );
};
