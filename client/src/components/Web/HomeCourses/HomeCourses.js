import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Col,
    Row,
} from 'antd';
import reactJsHooks from '../../../assets/img/jpg/react-js-hooks.jpg';
import reactNative from '../../../assets/img/jpg/react-native.jpg';
import javaScript from '../../../assets/img/jpg/javascript-es6.jpg';
import wordPress from '../../../assets/img/jpg/wordpress.jpg';
import prestaShop from '../../../assets/img/jpg/prestashop-1-7.jpg';
import cssGrid from '../../../assets/img/jpg/css-grid.jpg';

export const HomeCourses = () => {
  return (
    <Row className='home-courses'>
        <Col className='home-courses__title' lg={ 24 }>
            <h2>Aprende y mejora tus habilidades</h2>
        </Col>
        <Col lg={ 4 } />
        <Col lg={ 16 }>
            <Row className='row-courses'>
                <Col md={ 6 }>
                    <CardCourse 
                        image={ reactJsHooks }
                        link={ 'https://tincode.es/cursos/react-js-hooks-de-cero-a-experto-creado-aplicaciones-reales' }
                        subtitle={ 'Intermedio - React/JavaScript' }
                        title={ 'React JS Hooks' }
                    />
                </Col>
                <Col md={ 6 }>
                    <CardCourse 
                        image={ reactNative }
                        link={ 'https://tincode.es/cursos/react-native-expo-creando-un-tripadvisor-de-restaurantes' }
                        subtitle={ 'Intermedio - React/JavaScript' }
                        title={ 'React Native Expo' }
                    />
                </Col>
                <Col md={ 6 }>
                    <CardCourse 
                        image={ javaScript }
                        link={ 'https://tincode.es/cursos/javascript-y-es6-lo-ultimo-en-js-con-proyectos-reales' }
                        subtitle={ 'Básico - JavaScript' }
                        title={ 'Javascript ES6' }
                    />
                </Col>
                <Col md={ 6 }>
                    <CardCourse 
                        image={ wordPress }
                        link={ 'https://tincode.es/cursos/como-instalar-cualquier-cms-en-un-hosting' }
                        subtitle={ 'Básico - WordPress' }
                        title={ 'WordPress' }
                    />
                </Col>
            </Row>
            <Row className='row-courses'>
                <Col md={ 6 }>
                    <CardCourse 
                        image={ prestaShop }
                        link={ 'https://tincode.es/cursos/como-instalar-cualquier-cms-en-un-hosting' }
                        subtitle={ 'Básico - PrestaShop' }
                        title={ 'PrestaShop 1.7' }
                    />
                </Col>
                <Col md={ 6 } />
                <Col md={ 6 } />
                <Col md={ 6 }>
                    <CardCourse 
                        image={ cssGrid }
                        link={ 'https://tincode.es/cursos' }
                        subtitle={ 'Intermedio - CSS' }
                        title={ 'CSS Grid' }
                    />
                </Col>
            </Row>
        </Col>
        <Col lg={ 4 } />
        <Col className='home-courses__more' lg={ 24 }>
            <Link to='/courses'>
                <Button>Ver más</Button>
            </Link>
        </Col>
    </Row>
  );
};

const CardCourse = ({ image, link, subtitle, title }) => {
    const { Meta } = Card;

    return (
        <a
            href={ link }
            rel='noreferrer'
            target='_blank'
        >
            <Card
                actions={[ <Button>INGRESAR</Button> ]}
                className='home-courses__card'
                cover={ <img alt={ title } src={ image } /> }
            >
                <Meta description={ subtitle } title={ title } />
            </Card>
        </a>
    );
};
