import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import ReactLogo from '../../../assets/img/jpg/reactjs.jpg'
import { logout } from '../../../api/user';

export const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
    const logoutUser = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className='menu-top'>
            <div className='menu-top__left'>
                <Link 
                    to='/admin'
                >
                    <img 
                        alt='Emmanuel Martínez'
                        className='menu-top__left-logo'
                        src={ ReactLogo }
                    />
                </Link>
                <Button 
                    type='link' 
                    onClick={ () => setMenuCollapsed(!menuCollapsed) }
                >
                    <Icon type={ menuCollapsed ? 'menu-unfold' : 'menu-fold' } />
                </Button>
            </div>
            <div className='menu-top__right'>
                <Button
                    type='link' 
                    onClick={ logoutUser }
                >
                    <Icon type='poweroff' />
                </Button>
            </div>
        </div>
    );
};
