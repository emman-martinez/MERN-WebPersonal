import React from 'react';
import {
    Avatar,
    Card,
    Col,
    Row,
} from 'antd';
import AvatarPersona from './../../../assets/img/jpg/no-avatar.png'

export const ReviewsCourses = () => {
  return (
    <Row className='reviews-courses'>
        <Row>
            <Col lg={ 4 }/>
            <Col className='reviews-courses__title' lg={ 16 }>
                <h2>
                    Forma parte de los +35 mil estudiantes que están aprendiendo con mis cursos.
                </h2>
            </Col>
            <Col lg={ 4 }/>
        </Row>
        <Row>
            <Col lg={ 4 }/>
            <Col lg={ 16 }>
                <Row className='row-cards'>
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Alonso Campos' }
                            review={ 'Un curso excelente, el profesor axplica detalladamente como funciona reactjs native, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col>
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Davis Ramiro' }
                            review={ 'Si te gustan los cursos que profuncizan en la materia este es tu curso, el profesor explica de forma completa todos los conceptos necesarios para trabajar con grid, un gran curso.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col> 
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Valentina Rubio' }
                            review={ 'Un curso excelente.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col> 
                </Row>
                <Row className='row-cards'>
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Marc Peréz' }
                            review={ 'Un curso excelente.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col>
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Jesús Cruz' }
                            review={ 'Un curso excelente.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col> 
                    <Col md={ 8 }>
                        <CardReview 
                            avatar={ AvatarPersona }
                            name={ 'Francisco García' }
                            review={ 'Un curso excelente.' }
                            subtitle={ 'Alumno de Udemy '}
                        />    
                    </Col> 
                </Row>
            </Col>
            <Col lg={ 4 }/>
        </Row>
    </Row>
  );
};

const CardReview = ({ avatar, name, review, subtitle}) => {
    const { Meta } = Card;

    return (
        <Card className='reviews-courses__card'>
            <p>{ review }</p>
            <Meta 
                avatar={ <Avatar src={ avatar } /> }
                title= { name }
                description={ subtitle }
            />
        </Card>
    );

};
