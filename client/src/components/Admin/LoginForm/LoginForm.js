import React, { useState } from 'react';
import { 
    Form, 
    Icon, 
    Input, 
    Button,  
    notification,
} from 'antd';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN } from './../../../utils/constants';

export const LoginForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const login = async(e) => {
        e.preventDefault();
        const result = await signInApi(inputs);

        if(inputs.email && inputs.password) {
            if(result.msg) {
                notification['error']({
                    message: result.msg,
                });
            } else {
                const { accessToken } = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
    
                notification['success']({
                    message: 'Login Correcto.'
                });
    
                window.location.href = '/admin';
            }
        } else {
            notification['error']({
                message: 'Todos los campos son requeridos',
            });
        }
    };

    const { Item } = Form;

    return (
        <Form 
            className='login-form'
            onChange={ changeForm }
            onSubmit={ login }
        >
            <Item>
                <Input 
                    className='login-form__input'
                    name='email'
                    placeholder='Correo electrónico'
                    prefix={ <Icon type='user' style={{ color: 'rgba(0, 0, 0, 0.25)'}} /> }
                    type='email'
                />
            </Item>
            <Item>
                <Input 
                    className='login-form__input'
                    name='password'
                    placeholder='Contraseña'
                    prefix={ <Icon type='lock' style={{ color: 'rgba(0, 0, 0, 0.25)'}} /> }
                    type='password'
                />
            </Item>
            <Item>
                <Button htmlType='submit' className='login-form__button'>
                    Entrar
                </Button>
            </Item>
        </Form>
    );
};
