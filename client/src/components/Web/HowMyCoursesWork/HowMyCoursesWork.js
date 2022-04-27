import React from 'react';
import {
    Card,
    Col,
    Icon,
    Row,
} from 'antd';

export const HowMyCoursesWork = () => {
  return (
    <Row className='how-my-courses-work'>
        <Col className='how-my-courses-work__title' lg={ 24 }>
            <h2>¿Cómo funcionan mis cursos?</h2>
            <h3>
                Cada curso cuenta con contenido bajo la web de Udemy, activa las 24
                horas del día de los 365 días del año.
            </h3>
        </Col>
        <Col lg={ 4 } />
        <Col lg={ 16 } >
            <Row className='row-cards'>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, faciles de llevar en tu día a día de aprendizaje.' }
                        icon={ 'clock-circle' }
                        title={ 'Cursos y Clases' }
                    />
                </Col>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Accede a los cursos en cualquier momento, desde cualquier lugar sin importar día y hora.' }
                        icon={ 'key' }
                        title={ 'Acceso 24/7' }
                    />
                </Col>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden.' }
                        icon={ 'message' }
                        title={ 'Aprendizaje colaborativo' }
                    />
                </Col>
            </Row>
            <Row className='row-cards'>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Aprende y mejora tu perfil para mantenerte informado de las actualizaciones.' }
                        icon={ 'user' }
                        title={ 'Mejora tu perfil' }
                    />
                </Col>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Obtén el curso que necesitas por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado.' }
                        icon={ 'dollar' }
                        title={ 'Precios bajos' }
                    />
                </Col>
                <Col md={ 8 }>
                    <CardInfo 
                        description={ 'Al completar tu curso recibirás una certificación que te expedirá Udemy en PDF.' }
                        icon={ 'check-circle' }
                        title={ 'Certificado de finalización' }
                    />
                </Col>
            </Row>
        </Col>
        <Col lg={ 4 } />
    </Row>
  );
};

const CardInfo = ({ description, icon, title }) => {
    const { Meta } = Card;

    return (
        <Card className='how-my-courses-work__card'>
            <Icon type={ icon } />
            <Meta description={ description } title={ title } />
        </Card>
    );
};

