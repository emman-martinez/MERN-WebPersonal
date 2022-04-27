import React from 'react';
import { Col, Icon, Row} from 'antd';

export const Navigation = () => {
    return (
        <Row className='navigation'>
            <Col>
                <h3>Navegación</h3>
            </Col>
            <Col md={ 12 }>
                <RenderListLeft />
            </Col>
            <Col md={ 12 }>
                <RenderListRight />
            </Col>
        </Row>
    );
};

const RenderListLeft = () => {
    return (
        <ul>
            <li>
                <a href='/'>
                    <Icon type='book'/> Cursos Online
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='code'/> Desarrollo Web
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='database'/> Base de Datos
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='right'/> Política de Privacidad
                </a>
            </li>
        </ul>
    );
};

const RenderListRight = () => {
    return (
        <ul>
            <li>
                <a href='/'>
                    <Icon type='hdd'/> Sistemas / Servidores
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='appstore'/> CMS
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='user'/> Portafolio
                </a>
            </li>
            <li>
                <a href='/'>
                    <Icon type='right'/> Política de Cookies
                </a>
            </li>
        </ul>
    );
};

