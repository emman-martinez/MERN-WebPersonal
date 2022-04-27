import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import ReactLogo from '../../../assets/img/jpg/reactjs.jpg'
import { LoginForm } from '../../../components/Admin/LoginForm/LoginForm';
import { RegisterForm } from '../../../components/Admin/RegisterForm/RegisterForm';
import { ACCESS_TOKEN } from '../../../utils/constants';

export const SignIn = () => {

    const { Content } = Layout;
    const { TabPane } = Tabs;

    const token = localStorage.getItem(ACCESS_TOKEN) || '';

    if(token) {
        return <Redirect to='/admin' />;
    }

    return (
        <Layout className='sign-in'>
            <Content className='sign-in__content'>
                <h1 className='sign-in__content-logo'>
                    <img 
                        alt='Emmanuel Martínez'
                        src={ ReactLogo } 
                    />    
                </h1>
                <div className='sign-in__content-tabs'>
                    <Tabs type='card'>
                        <TabPane tab={ <span>Entrar</span> } key='1'>
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={ <span>Nuevo Usuario</span> } key='2'>
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
};
