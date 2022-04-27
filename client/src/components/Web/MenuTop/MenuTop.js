import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { getMenuApi } from '../../../api/menu';
import logoWhite from '../../../assets/img/png/logo-white.png';
import { SocialLinks } from '../SocialLinks/SocialLinks';

export const MenuTop = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const getMenus = async() => {
            const menu = await getMenuApi();
            const { menus } = menu;
            const arrayMenu = [];

            if (!menus) return null;

            menus.forEach(menu => {
                menu.active && arrayMenu.push(menu);
            });

            setMenuData(arrayMenu);
        };
        getMenus();
    }, []);

    const { Item } = Menu;

    return (
        <Menu className='menu-top-web' mode='horizontal'>
            <Item className='menu-top-web__logo'>
            <Link to={ '/' }>
                <img src={ logoWhite } alt='Curso MERN Web Personal'/>
            </Link>
            </Item>
            {
                menuData.map((item) => {
                    const external = item.url.indexOf('http') > -1 ? true : false;
                    
                    if (external) {
                        return (
                            <Item className='menu-top-web__item' key={ item._id }>
                                <a href={ item.url } rel='noreferrer' target='_blank'>{ item.title }</a>
                            </Item>
                        );
                    }

                    return (
                       <Item className='menu-top-web__item' key={ item._id }>
                           <Link to={ item.url }>{ item.title }</Link>
                       </Item> 
                    );
                    
                })
            }
            <SocialLinks />
        </Menu>
    );
};
