import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,  
    Icon, 
    Input, 
    notification,
  } from 'antd';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { updateMenuApi } from '../../../../api/menu';

export const EditMenuWebForm = ({ menu, setIsVisible, setReloadMenuWeb }) => {
    const [menuWebData, setMenuWebData] = useState({});
    
    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]);

    const editMenu = async(e) => {
        e.preventDefault();

        if (!menuWebData.title || !menuWebData.url) {
            notification['error']({
                message: 'Todos los datos son obligatorios',
            });
        }  else {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const editMenu = await updateMenuApi(token, menuWebData._id, menuWebData);
            
            if (editMenu.ok) {
                notification['success']({
                    message: editMenu.msg,
                });

                setIsVisible(false);
                setReloadMenuWeb(true);
                setMenuWebData({});
            } else {
                notification['error']({
                    message: editMenu.msg,
                }) ;
            }
        }
    };

    return (
        <div className='edit-menu-web-form'>
            <EditForm 
                editMenu={ editMenu }
                menuWebData={ menuWebData }
                setMenuWebData={ setMenuWebData }
            />
        </div>
    );
};

const EditForm = ({ editMenu, menuWebData, setMenuWebData }) => {
    const { Item } = Form;

    return (
        <Form 
            className='form-edit' 
            onSubmit={ editMenu }
        >
            <Item>
                <Input 
                    onChange={ e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                    placeholder='Titulo'
                    prefix={ <Icon type='font-size'/> }
                    value={ menuWebData.title }
                />
            </Item>
            <Item>
                <Input 
                    onChange={ e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                    placeholder='URL'
                    prefix={ <Icon type='link'/> }
                    value={ menuWebData.url }
                />
            </Item>
            <Item>
                <Button
                    className='btn-submit'
                    htmlType='submit'
                    type='primary'
                >
                    Actualizar Menú
                </Button>
            </Item>
        </Form>
    );
};
