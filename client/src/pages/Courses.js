import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Col,
  notification,
  Row,
  Spin,
} from 'antd';
import { getCoursesApi } from '../api/courses';
import { PresentationCourses } from '../components/Web/Courses/PresentationCourses/PresentationCourses';
import { CoursesList } from '../components/Web/Courses/CoursesList/CoursesList';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  // const [reloadCourses, setReloadCourses] = useState(false);

  useEffect(() => {
      const getCourses = async() => {
          const allCourses = await getCoursesApi();
          if (allCourses.ok) {
            setCourses(allCourses.courses);
          } else {
            notification['warning']({
              message: allCourses.msg,
            });
          }
      };
      getCourses();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cursos | Curso MERN</title>
      </Helmet>
       <Row>
          <Col md={ 4 }/>
          <div className='presentation'>
            <Col md={ 16 }>
              <PresentationCourses />
              {
                courses
                  ? <CoursesList 
                      courses={ courses }
                    />
                  : <Spin
                      style={{ padding: '20px', textAlign: 'center', width: '100%' }} 
                      tip='Cargando cursos' 
                    />
              }
            </Col>
          </div>
          <Col md={ 4 }/>
        </Row>
    </>
  );
};
