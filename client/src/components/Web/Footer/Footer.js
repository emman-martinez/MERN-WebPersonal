import React from 'react';
import { Col, Layout, Row } from 'antd';
import { MyInfo } from './MyInfo/MyInfo';
import { Navigation } from './Navigation/Navigation';
import { Newsletter } from '../Newsletter/Newsletter';

export const Footer = () => {
    const { Footer } = Layout;

    return (
        <Footer className='footer'>
            <Col lg={ 4 }/>
            <Col lg={ 16 }>
                <Row>
                    <Col lg={ 8 }><MyInfo /></Col>
                    <Col lg={ 8 }><Navigation /></Col>
                    <Col lg={ 8 }><Newsletter /></Col>
                </Row>
                <Row className='footer__copyright'>
                    <Col lg={ 12 }>© 2022 ALL RIGHTS RESERVED</Col>
                    <Col lg={ 12 }>EMMANUEL MARTÍNEZ | DESARROLLADOR WEB</Col>
                </Row>
            </Col>
            <Col lg={ 4 }/>
        </Footer>
    );
};
