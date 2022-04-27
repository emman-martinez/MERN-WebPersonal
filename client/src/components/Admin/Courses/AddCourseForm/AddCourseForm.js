import React, { useState } from 'react';
import {
    Button,
    Form,  
    Icon, 
    Input, 
    notification,
  } from 'antd';
import { addCourseApi } from '../../../../api/courses';
import { ACCESS_TOKEN } from '../../../../utils/constants';

const token = localStorage.getItem(ACCESS_TOKEN);

export const AddCourseForm = ({ setIsVisibleModal, setReloadCourses }) => {
    const [courseData, setCourseData] = useState({});

    const addCourse = async(e) => {
        e.preventDefault();

        const { 
            idCourse,
        } = courseData;
        
        if (!idCourse) {
            notification['error']({
                message: 'El id del curso es obligatorio',
            });
        } else {
            courseData.order = 1000;
            const addCourse = await addCourseApi(token, courseData);

            if (addCourse.ok) {
                notification['success']({
                    message: addCourse.msg,
                });

                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            } else {
                notification['error']({
                    message: addCourse.msg,
                }) ;
            }
        }
    };

    return (
        <div className='add-course-form'>
            <AddCourse
                addCourse={ addCourse }
                courseData={ courseData }
                setCourseData={ setCourseData }
            />
        </div>
    );
};


const AddCourse = ({ addCourse, courseData, setCourseData }) => {
    const { Item } = Form;

    return (
        <Form
            className='form-add-course'
            onSubmit={ addCourse }
        >
            <Item>
                <Input 
                    onChange={ e => setCourseData({ ...courseData, idCourse: e.target.value })}
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
                    Crear Curso
                </Button>
            </Item>
        </Form>
    );
};