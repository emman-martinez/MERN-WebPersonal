import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuTop } from '../components/Admin/MenuTop/MenuTop';
import MenuSider from '../components/Admin/MenuSider/MenuSider';
import { useAuth } from '../hooks/useAuth'; 
import { SignIn } from '../pages/Admin/SignIn/SignIn';

export const LayoutAdmin = ({ routes }) => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    const { isLoading, user } = useAuth();
    
    if(!Boolean(user) && isLoading) {
        return (
            <>
                <Route path='/admin/login' component={ SignIn } />
                <Redirect to='/admin/login' />
            </>
        );
    }

    if(user && !isLoading) {
        return (
            <Layout>
                <MenuSider 
                    menuCollapsed={ menuCollapsed }
                />
                <Layout className='layout-admin' style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}>
                    <Header className='layout-admin__header'>
                        <MenuTop 
                            menuCollapsed={ menuCollapsed } 
                            setMenuCollapsed={ setMenuCollapsed }
                        />
                    </Header>
                    <Content className='layout-admin__content'>
                        <LoadRoutes routes={ routes } />
                    </Content>
                    <Footer className='layout-admin__footer'>
                        Jesús Emmanuel Martínez Estrada
                    </Footer>
                </Layout>
            </Layout>
        );
    }

    return null;
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