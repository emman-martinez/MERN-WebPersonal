import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,  
    Icon, 
    Input, 
    notification,
  } from 'antd';
import { updateCoursesApi } from '../../../../api/courses';
import { ACCESS_TOKEN } from '../../../../utils/constants';

const token = localStorage.getItem(ACCESS_TOKEN);

export const EditCoursesForm = ({ course, setIsVisibleModal, setReloadCourses }) => {
    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        setCourseData(course);
    }, [course]);

    const editCourse = async(e) => {
        e.preventDefault();

        const editCourse = await updateCoursesApi(token, courseData._id, courseData);

        if (editCourse.ok) {
            notification['success']({
                message: editCourse.msg,
            });

            setIsVisibleModal(false);
            setReloadCourses(true);
            setCourseData({});
        } else {
            notification['error']({
                message: editCourse.msg,
            }) ;
        }
    };

    return (
        <div className='edit-course-form'>
            <EditForm 
                courseData={ courseData }
                editCourse={ editCourse }
                setCourseData={ setCourseData }
            />
        </div>
    );
};

const EditForm = ({ editCourse, courseData, setCourseData }) => {
    const { Item } = Form;

    return (
        <Form
            className='form-add-course'
            onSubmit={ editCourse }
        >
            <Item>
                <Input 
                    disabled={ true }
                    placeholder='ID del curso'
                    prefix={ <Icon type='key'/> }
                    value={ courseData.idCourse }
                />
            </Item>
            <Item>
                <Input 
                    onChange={ e => setCourseData({ ...courseData, coupon: e.target.value })}
                    placeholder='Cupón de descuento'
                    prefix={ <Icon type='gift'/> }
                    value={ courseData.coupon }
                />
            </Item>
            <Item>
                <Input 
                    onChange={ e => setCourseData({ ...courseData, link: e.target.value })}
                    placeholder='Url del curso'
                    prefix={ <Icon type='link'/> }
                    value={ courseData.link }
                />
            </Item>
            <Item>
                <Input 
                    onChange={ e => setCourseData({ ...courseData, price: e.target.value })}
                    placeholder='Precio del curso'
                    prefix={ <Icon type='dollar'/> }
                    value={ courseData.price }
                />
            </Item>
            <Item>
                <Button
                    className='btn-submit'
                    htmlType='submit'
                    type='primary'
                >
                    Actualizar Curso
                </Button>
            </Item>
        </Form>
    );
};