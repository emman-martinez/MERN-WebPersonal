import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import { MenuTop } from '../components/Web/MenuTop/MenuTop';
import { Footer } from '../components/Web/Footer/Footer';

export const LayoutBasic = (props) => {
    const { routes } = props;

    return (
        <>
            <Row>
                <Col lg={ 4 } />
                <Col lg={ 16 }>
                    <MenuTop />
                    <LoadRoutes routes={ routes } />
                    <Footer />
                </Col>
                <Col lg={ 4 } />
            </Row>
        </>
    );
};

const LoadRoutes = ({ routes }) => {
    return (
        <Switch>
           {
               routes.map((route, index) => (
                    <Route 
                        key={ index }
                        path={ route.path }
                        exact={ route.exact }
                        component={ route.component }
                    />
                ))
           } 
        </Switch>
    );
};