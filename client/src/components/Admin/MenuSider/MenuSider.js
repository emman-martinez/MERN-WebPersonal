import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';

const MenuSider = ({ menuCollapsed, location }) => {
    
    const { Sider } = Layout;
    const { Item } = Menu;

    return (
        <Sider 
            className='admin-sider'
            collapsed={ menuCollapsed }
        >
            <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={[location.pathname]}
            >
                <Item key='/admin'>
                    <Link to={'/admin'}>
                        <Icon type='home' />
                        <span className='nav-text'>Home</span>
                    </Link>
                </Item>
                <Item key='/admin/users'>
                    <Link to={'/admin/users'}>
                        <Icon type='user' />
                        <span className='nav-text'>Usuarios</span>
                    </Link>
                </Item>
                <Item key='/admin/menu'>
                    <Link to={'/admin/menu'}>
                        <Icon type='menu' />
                        <span className='nav-text'>Menú</span>
                    </Link>
                </Item>
                <Item key='/admin/courses'>
                    <Link to={'/admin/courses'}>
                        <Icon type='book' />
                        <span className='nav-text'>Cursos</span>
                    </Link>
                </Item>
                <Item key='/admin/blog'>
                    <Link to={'/admin/blog'}>
                        <Icon type='message' />
                        <span className='nav-text'>Blog</span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    );
};

export default withRouter(MenuSider);