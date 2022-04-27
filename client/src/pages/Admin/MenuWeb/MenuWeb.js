import React, { useEffect, useState } from 'react';
import { getMenuApi } from '../../../api/menu'; 
import { MenuWebList } from '../../../components/Admin/MenuWeb/MenuWebList/MenuWebList';

export const MenuWeb = () => {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

  useEffect(() => {
    const getMenus = async() => {
      const menu = await getMenuApi();
      setMenu(menu);
    };
    getMenus();
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  const { menus } = menu;

  if(!menus) return <h1>Loading...</h1>;

  return (
    <div className='menu-web'>
      <MenuWebList 
        menus={ menus }
        setReloadMenuWeb={ setReloadMenuWeb }
      />
    </div>
  );
};
