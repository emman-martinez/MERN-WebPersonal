import React, { useState } from 'react';
import { 
    Button,
    Col,
    Form,
    Icon, 
    Input,
    notification,
    Row, 
    Select,
} from 'antd';
import { signUpAdminApi } from '../../../../api/user';
import { ACCESS_TOKEN } from '../../../../utils/constants';

export const AddUserForm = ({ setIsVisible, setReloadUsers }) => {
    const [userData, setUserData] = useState({});
    const addUser = async(e) => {
        e.preventDefault();
        const { 
            email, 
            lastname, 
            name, 
            password, 
            repeatPassword,
            role,
        } = userData;

        if (!email || !lastname || !name || !password || !repeatPassword || !role) {
            notification['error']({
                message: 'Todos los campos son obligatorios',
            });
        } else if (password !== repeatPassword) {
            notification['error']({
                message: 'Las contraseñas tienen que ser iguales.',
            });
        } else {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const createUser = await signUpAdminApi(token, userData);

            if (createUser.ok) {
                notification['success']({
                    message: createUser.msg,
                })
                setIsVisible(false);
                setReloadUsers(true);
                setUserData({});
            } else {
                notification['error']({
                    message: createUser.msg,
                })
            }
        }
    };

    return (
        <div className='add-user-form'>
            <AddForm 
                addUser={ addUser }
                setUserData={ setUserData }
                userData={ userData }
            />
        </div>
    );
};

const AddForm = ({ addUser, setUserData, userData }) => {
    const { Option } = Select;
    const { Item } = Form;

    return (
        <Form className='form-add' onSubmit={ addUser }>
            <Row gutter={ 24 }>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, name: e.target.value }) }
                            placeholder='Nombre'
                            prefix={ <Icon type='user' /> }
                            value={ userData.name }
                        />
                    </Item>
                </Col>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, lastname: e.target.value })}
                            placeholder='Apellidos'
                            prefix={ <Icon type='user' /> }
                            value={ userData.lastname }
                        />
                    </Item>
                </Col>
            </Row>

            <Row  gutter={ 24 }>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, email: e.target.value })}
                            placeholder='Correo electrónico'
                            prefix={ <Icon type='mail' /> }
                            value={ userData.email }
                        />
                    </Item>
                </Col>
                <Col span={ 12 }>
                    <Item>
                        <Select
                            onChange={ e => setUserData({ ...userData, role: e }) }
                            placeholder='Selecciona un rol'
                            value={ userData.role }
                        >
                            <Option value='admin'>Administrador</Option>
                            <Option value='editor'>Editor</Option>
                            <Option value='review'>Revisor</Option>
                        </Select>
                    </Item>
                </Col>
            </Row>

            <Row  gutter={ 24 }>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, password: e.target.value })}
                            placeholder='Contraseña'
                            prefix={ <Icon type='lock' /> }
                            type='password'
                        />
                    </Item>
                </Col>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, repeatPassword: e.target.value })}
                            placeholder='Repetir contraseña'
                            prefix={ <Icon type='lock' /> }
                            type='password'
                        />
                    </Item>
                </Col>
            </Row>

            <Item>
                <Button 
                    type='primary'
                    htmlType='submit'
                    className='btn-submit'
                >
                    Crear Usuario
                </Button>
            </Item>

        </Form>
    );
};