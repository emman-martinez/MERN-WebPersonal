import React, { useState } from 'react';
import {
    Button, 
    Form, 
    Icon, 
    Input,
    notification,
} from 'antd';
import { subscribeNewsletterApi } from '../../../api/newsletter';

export const Newsletter = () => {
    const [email, setEmail] = useState('');
    const { Item } = Form;

    const onSubmit = async(e) => {
        e.preventDefault();

        // eslint-disable-next-line no-useless-escape
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!email) {
            notification['error']({
                message: 'El correo es obligatorio',
            });
            return;
        }

        const resultValidation = emailValid.test(email);

        if (!resultValidation) {
            notification['error']({
                message: 'Correo no válido',
            });
        } else {
            const subscribe = await subscribeNewsletterApi(email);

            if (!subscribe.ok) {
                notification['warning']({
                    message: subscribe.msg
                });
            } else {
                notification['success']({
                    message: subscribe.msg
                });
                setEmail('');
            }
        }
    };


    return (
        <div className='newsletter'>
            <h3>Newsletter</h3>
            <Form onSubmit={ onSubmit }>
                <Item>
                    <Input 
                        onChange={ e => setEmail(e.target.value) }
                        placeholder='Correo Electrónico'
                        prefix={ <Icon type='user' style={{ color: "rgba(0, 0, 0, 0.25)" }} /> }
                        value={ email }
                    />
                </Item>
                <Item>
                    <Button
                        className='login-form-button'
                        htmlType='submit' 
                        type='primary'
                    >
                        ¡Me subscribo!
                    </Button>
                </Item>
            </Form>
        </div>
    );
};
