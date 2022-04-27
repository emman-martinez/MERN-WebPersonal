import React, { useEffect, useState } from 'react';
import {
  Button,  
  Icon, 
  List, 
  Modal as ModalAntd, 
  notification,
  Switch,
} from 'antd';
import DragSortableList from 'react-drag-sortable';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { Modal } from '../../../Modal/Modal';
import { activateMenuApi, deleteMenuApi, updateMenuApi } from '../../../../api/menu';
import { AddMenuWebForm } from '../AddMenuWebForm/AddMenuWebForm';
import { EditMenuWebForm } from '../EditMenuWebForm/EditMenuWebForm';

const { confirm } = ModalAntd;
const token = localStorage.getItem(ACCESS_TOKEN);

export const MenuWebList = ({ menus, setReloadMenuWeb }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const listItemArray = [];

    menus.forEach((item) => {
      listItemArray.push({
        content: (
          <MenuItem 
            activateMenu={ activateMenu }
            editMenuWebModal={ editMenuWebModal } 
            item={ item }
            showDeleteConfirm={ showDeleteConfirm }
          />
        ),
      });
    });

    setListItems(listItemArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus]);

  const activateMenu = async(menu, status) => {
    const activateMenu = await activateMenuApi(token, menu._id, status);
  
    if (activateMenu.ok) {
      notification['success']({
        message: activateMenu.msg,
      });
    } else {
      notification['error']({
        message: activateMenu.msg,
      });
    }
  };

  const onSort = (sortedList, dropEvent) => {
    sortedList.forEach(async(item) => {
      const { _id } = item.content.props.item;
      const order = item.rank;

      await updateMenuApi(token, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisible(true);
    setModalTitle('Creando nuevo menú');
    setModalContent(
      <AddMenuWebForm 
        setIsVisible={ setIsVisible }
        setReloadMenuWeb={ setReloadMenuWeb }
      />
    );
  };

  const editMenuWebModal = (menu) => {
    setIsVisible(true);
    setModalTitle(`Editar menú: ${ menu.title }`);
    setModalContent(
      <EditMenuWebForm 
        menu={ menu }
        setIsVisible={ setIsVisible }
        setReloadMenuWeb={ setReloadMenuWeb }
      />
    );
  };

  const showDeleteConfirm = (menu) => {
    confirm({
        title: 'Eliminar Menu',
        content: `¿Estás seguro que quieres eliminar el menú ${ menu.title }?`,
        okText: 'Eliminar',
        okType: 'danger',
        cancelText: 'Cancelar',
        async onOk() {
            const deleteMenu = await deleteMenuApi(token, menu._id);

            if (deleteMenu.ok) {
                notification['success']({
                    message: deleteMenu.msg,
                });
                setReloadMenuWeb(true);
            } else {
                notification['error']({
                    message: deleteMenu.msg,
                });
            }
        }
    });
  };

  return (
    <div className='menu-web-list'>
      <div className='menu-web-list__header'>
        <Button
          onClick={ addMenuWebModal } 
          type='primary'
        >
            Crear Menú
        </Button>
      </div>
      <div className='menu-web-list__items'>
        <DragSortableList
          items={ listItems }
          onSort={ onSort }
          type='vertical' 
        />
      </div>
      <Modal
        isVisible={ isVisible }
        setIsVisible={ setIsVisible }
        title={ modalTitle }
      >
        { modalContent }
      </Modal>
    </div>
  );
};

const MenuItem = ({ activateMenu, editMenuWebModal, item, showDeleteConfirm }) => {
  const { Item } = List;
  const { Meta } = Item;

  return (
    <Item
      actions={[
        <Switch 
          defaultChecked={ item.active } 
          onChange={ e => activateMenu(item, e) }
        />,
        <Button
          onClick={ () => editMenuWebModal(item) }
          type='primary'
        >
          <Icon type='edit' />
        </Button>,
        <Button 
          onClick={ () => showDeleteConfirm(item) }
          type='danger'
        >
          <Icon type='delete' />
        </Button>,
      ]}
    >
      <Meta 
        description={ item.url }
        title={ item.title }
      />
    </Item>
  );
};
