import React, { useState } from 'react';
import { 
    Form, 
    Icon, 
    Input, 
    Button, 
    Checkbox, 
    notification,
} from 'antd';
import { emailValidation, minLengthValidation, nameLastNameValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

export const RegisterForm = () => {
    const { Item } = Form;

    const [inputs, setInputs] = useState({
        email: '',
        lastname: '',
        name: '',
        password: '',
        privacyPolicy: false,
        repeatPassword: '',
    });
    
    const [formValid, setFormValid] = useState({
        email: false,
        lastname: false,
        name: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false,
    });

    const changeForm = (e) => {
        const {
            target: { name }
        } = e;

        if (name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked,
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
        }
    };

    const inputValidation = (e) => {
        const { name, type } = e.target;

        if (type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target),
            });
        }

        if (type === 'text') {
            setFormValid({
                ...formValid,
                [name]: nameLastNameValidation(e.target),
            });
        }

        if (type === 'password') {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6),
            });
        }

        if (type === 'checkbox') {
            setFormValid({
                ...formValid,
                [name]: e.target.checked,
            });
        }
    };

    const register = async(e) => {
        e.preventDefault();

        const emailVal = inputs.email;
        const lastnameVal = inputs.lastname;
        const nameVal = inputs.name;
        const passwordVal = inputs.password;
        const privacyPolicyVal = inputs.privacyPolicy;
        const repeatPasswordVal = inputs.repeatPassword;
        const noValidForm = Boolean(!emailVal || !lastnameVal || !nameVal || !passwordVal || !privacyPolicyVal || !repeatPasswordVal);

        if (noValidForm) {
            // Todos los campos obligatorios
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            // Validación Contraseñas Iguales
            if (passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: 'Las contraseñas tienen que ser iguales.'
                });
            } else {
                // TODO: Conectar con el API y registrar el usuario.
                const result = await signUpApi(inputs);

                if(!result.ok) {
                    notification['error']({
                        message: result.msg,
                    });
                } else {
                    notification['success']({
                        message: 'Your account has been created.',
                    });

                    resetForm();
                }
            }

        }
    };

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: '',
            lastname: '',
            name: '',
            password: '',
            privacyPolicy: false,
            repeatPassword: '',
        });
        setFormValid({
            email: false,
            lastname: false,
            name: false,
            password: false,
            privacyPolicy: false,
            repeatPassword: false,
        });
    };

    return (
        <Form 
            className='register-form'
            onChange={ changeForm }
            onSubmit={ register }
        >
            <Item>
                <Input 
                    className='register-form__input'
                    name='name'
                    onChange={ inputValidation }
                    placeholder='Nombre'
                    prefix={ <Icon type='user' style={{ color: 'rgba(0,0,0,0.25)'}} /> }
                    type='text'
                    value={ inputs.name }
                />
            </Item>
            <Item>
                <Input 
                    className='register-form__input'
                    name='lastname'
                    onChange={ inputValidation }
                    placeholder='Apellido'
                    prefix={ <Icon type='user' style={{ color: 'rgba(0,0,0,0.25)'}} /> }
                    type='text'
                    value={ inputs.lastname }
                />
            </Item>
            <Item>
                <Input 
                    className='register-form__input'
                    name='email'
                    onChange={ inputValidation }
                    placeholder='Correo electrónico'
                    prefix={ <Icon type='mail' style={{ color: 'rgba(0,0,0,0.25)'}} /> }
                    type='email'
                    value={ inputs.email }
                />
            </Item>
            <Item>
                <Input 
                    className='register-form__input'
                    name='password'
                    onChange={ inputValidation }
                    placeholder='Contraseña'
                    prefix={ <Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)'}} /> }
                    type='password'
                    value={ inputs.password }
                />
            </Item>
            <Item>
                <Input 
                    className='register-form__input'
                    name='repeatPassword'
                    onChange={ inputValidation }
                    placeholder='Repetir Contraseña'
                    prefix={ <Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)'}} /> }
                    type='password'
                    value={ inputs.repeatPassword }
                />
            </Item>
            <Item>
                <Checkbox
                    checked={ inputs.privacyPolicy }
                    name='privacyPolicy'
                    onChange={ inputValidation }
                >
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Item>
            <Item>
                <Button 
                    htmlType='submit'
                    className='register-form__button'
                >
                    Crear Cuenta
                </Button>
            </Item>
        </Form>
    );
};
