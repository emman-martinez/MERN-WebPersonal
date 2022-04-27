import React, { useState } from 'react';
import {
    Button,
    Form,  
    Icon, 
    Input, 
    notification,
    Select,
  } from 'antd';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { addMenuApi } from '../../../../api/menu';

export const AddMenuWebForm = ({ setIsVisible, setReloadMenuWeb }) => {
    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = async(e) => {
        e.preventDefault();
        
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : 'https://') + menuWebData.url,
        }

        if (!finalData.title || !finalData.url || !menuWebData.url) {
            notification['error']({
                message: 'Todos los datos son obligatorios',
            });
        } else {
            const token = localStorage.getItem(ACCESS_TOKEN);
            finalData.active = false;
            finalData.order = 1000;
            const addMenu = await addMenuApi(token, finalData);
            
            if (addMenu.ok) {
                notification['success']({
                    message: addMenu.msg,
                });

                setIsVisible(false);
                setReloadMenuWeb(true);
                setMenuWebData({});
                finalData = {};
            } else {
                notification['error']({
                    message: addMenu.msg,
                }) ;
            }
        }
    }

    return (
        <div className='add-menu-web-form'>
            <AddForm 
                addMenu={ addMenu }
                menuWebData={ menuWebData }
                setMenuWebData={ setMenuWebData }
            />
        </div>
    );
};

const AddForm = ({ addMenu, menuWebData, setMenuWebData }) => {
    const { Item } = Form;
    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue='http://'
            onChange={ e => setMenuWebData({ ...menuWebData, http: e }) }
            style={ { width: 90 } }
        >
            <Option value='http://'>http://</Option>
            <Option value='https://'>https://</Option>
        </Select>
    );

    return (
        <Form 
            className='form-add' 
            onSubmit={ addMenu }
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
                    addonBefore={ selectBefore }
                    onChange={ e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                    placeholder='URL'
                    value={ menuWebData.url }
                />
            </Item>
            <Item>
                <Button
                    className='btn-submit'
                    htmlType='submit'
                    type='primary'
                >
                    Crear Menú
                </Button>
            </Item>
        </Form>
    );
};
