import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    notification,
    Rate,
    Row,
} from 'antd';
import { getCourseDataUdemyApi } from '../../../../api/courses';

export const CoursesList = ({ courses }) => {

    return (
        <div className='courses-list'>
            <Row>
                {
                    courses.map(course => (
                        <Col
                            className='courses-list__course'
                            key={ course._id }
                            md={ 8 }
                        >
                            <Course 
                                course={ course }
                            />
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

const Course = ({ course }) => {
    const { Meta } = Card;
    const { idCourse } = course;
    const [courseInfo, setCourseInfo] = useState({});
    const [urlCourse, setUrlCourse] = useState('');

    useEffect(() => {
        const udemyCourses = async() => {
          const dataCourse = await getCourseDataUdemyApi(idCourse);
  
          if (dataCourse.code !== 200) {
              notification['warning']({
                  message: `El curso con el id ${ idCourse } no se ha encontrado.`,
              });
          }
  
          setCourseInfo(dataCourse.data);
          mountUrl(dataCourse.data.url);
        };
        udemyCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idCourse]);

    const mountUrl = (url) => {
        console.log({ course });
        if (!course.link) {
            const baseUrl = `https://www.udemy.com${ url }`;
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${ course.coupon }` : '')
            setUrlCourse(finalUrl);
        } else {
            setUrlCourse(course.link);
        }
    };
    
    return (
        <a
            href={ urlCourse }
            target='_blank'
            rel='noreferrer'
        >
            <Card
                alt={ courseInfo.title }
                cover={ <img alt={ courseInfo.title } src={ courseInfo.image_480x270 } /> }
            >
                <Meta 
                    description={ courseInfo.headline }
                    title={ courseInfo.title }
                />
                <Button>
                    Entrar en el curso
                </Button>
                <div className='courses-list__course-footer'>
                    <span>
                        { course.price ? `${ course.price } EU` : courseInfo.price }
                    </span>
                    <div>
                        <Rate defaultValue={ 5 } disabled />
                    </div>
                </div>
            </Card>
        </a>
    );
};
