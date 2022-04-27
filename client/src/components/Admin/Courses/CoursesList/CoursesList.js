import React, { useEffect, useState } from 'react';
import DragSortableList from 'react-drag-sortable';
import {
    Button, 
    Icon, 
    List, 
    Modal as ModalAntd, 
    notification,
} from 'antd';
import { Modal } from '../../../Modal/Modal';
import { deleteCourseApi, getCourseDataUdemyApi, updateCoursesApi } from '../../../../api/courses';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { AddCourseForm } from '../AddCourseForm/AddCourseForm';
import { EditCoursesForm } from '../EditCourseForm/EditCourseForm';

const { confirm } = ModalAntd;
const token = localStorage.getItem(ACCESS_TOKEN);

export const CoursesList = ({ courses, setReloadCourses }) => {
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
            listCourseArray.push({
                content: (
                    <Course 
                        course={ course }
                        editCourseModal={ editCourseModal }
                        showDeleteConfirm={ showDeleteConfirm }
                    />
                ),
            });
        });
        setListCourses(listCourseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses]);

    const addCourseModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Crear Curso');
        setModalContent(
          <AddCourseForm
            setIsVisibleModal={ setIsVisibleModal }
            setReloadCourses={ setReloadCourses }
          />
        );
      };
    

    const editCourseModal = (course, title) => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Curso: ${ title }`);
        setModalContent(
            <EditCoursesForm
                course={ course }
                setIsVisibleModal={ setIsVisibleModal }
                setReloadCourses={ setReloadCourses }
            />
        );
    };

    const onSort = (sortedList, dropEvent) => {
        sortedList.forEach(async(item) => {
          const { _id } = item.content.props.course;
          const order = item.rank;
    
          await updateCoursesApi(token, _id, { order });
        });
    };

    const showDeleteConfirm = (course, title) => {
        confirm({
            title: 'Eliminar Curso',
            content: `¿Estás seguro que quieres eliminar el curso ${ title }?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const deleteCourse = await deleteCourseApi(token, course._id);
    
                if (deleteCourse.ok) {
                    notification['success']({
                        message: deleteCourse.msg,
                    });
                    setReloadCourses(true);
                } else {
                    notification['error']({
                        message: deleteCourse.msg,
                    });
                }
            }
        });
      };

    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button
                    onClick={ addCourseModal }
                    type='primary'
                >
                    Nuevo Curso
                </Button>
            </div>

            <div className='courses-list__items'>
                {
                    listCourses.length === 0 &&
                    <h2 style={{ textAlign: 'center', margin: 0 }}>
                        No tienes cursos creados.
                    </h2>
                }
                <DragSortableList 
                    items={ listCourses }
                    onSort={ onSort }
                    type='vertical'
                />
            </div>

            <Modal
                isVisible={ isVisibleModal }
                setIsVisible={ setIsVisibleModal }
                title={ modalTitle }
            >
                { modalContent }
            </Modal>         
        </div>
    );
};

const Course = ({ course, editCourseModal, showDeleteConfirm }) => {
    const { idCourse } = course;
    const { Item, Item: { Meta }} = List;
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
      const udemyCourses = async() => {
        const dataCourse = await getCourseDataUdemyApi(idCourse);

        if (dataCourse.code !== 200) {
            notification['warning']({
                message: `El curso con el id ${ idCourse } no se ha encontrado.`,
            });
        }

        setCourseData(dataCourse.data);
      };
      udemyCourses();
    }, [idCourse]);

    if (!courseData) return null;
    
    return (
        <Item
            actions={[
                <Button 
                    onClick={ () => editCourseModal(course, courseData.title) }
                    type='primary'
                >
                    <Icon type='edit'/>
                </Button>,
                <Button 
                    onClick={ () => showDeleteConfirm(course, courseData.title) }
                    type='danger'
                >
                    <Icon type='delete'/>
                </Button>,
            ]}
        >
            <img 
                alt={ courseData.title }
                src={ courseData.image_480x270}
                style={{ width: '100px', marginRight: '20px' }}
            />
            <Meta 
                description={ courseData.headline }
                title={`${ courseData.title } | ID: ${ idCourse }`}
                // 2440844, 2351504, 2555994
            />
        </Item>
    );
}
