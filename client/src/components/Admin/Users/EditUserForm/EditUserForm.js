import React, { useCallback, useEffect, useState } from 'react';
import { 
    Avatar,
    Button,
    Col,
    Form,
    Icon, 
    Input,
    notification,
    Row, 
    Select,
} from 'antd';
import { useDropzone } from 'react-dropzone';
import NoAvatar from './../../../../assets/img/png/no-avatar.png';
import { 
    getAvatarApi, 
    updateUserApi, 
    uploadAvatarApi 
} from '../../../../api/user';
import { ACCESS_TOKEN } from '../../../../utils/constants';

export const EditUserForm = ({ setIsVisible, setReloadUsers, user }) => {
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            avatar: user.avatar,
            email: user.email,
            lastname: user.lastname,
            name: user.name,
            role: user.role,
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            const getAvatar = async() => {
                const avatar = await getAvatarApi(user.avatar);
                setAvatar(avatar);
            };
            getAvatar();
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
      if (avatar) {
        setUserData({
            ...userData,
            avatar: avatar.file,
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);
    

    const updateUser = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem(ACCESS_TOKEN);
        let userUpdate = userData;
        const { 
            avatar,
            email,
            lastname, 
            name, 
            password, 
            repeatPassword 
        } = userUpdate;

        if (password || repeatPassword) {
            if (password !== repeatPassword) {
                notification['error']({
                    message: 'Las contraseñas tienen que ser iguales.',
                });
                return;
            } else {
                delete userUpdate.repeatPassword;
            }
        }

        if (!name || !lastname || !email) {
            notification['error']({
                message: 'El nombre, apellidos y email son obligatorios',
            });
            return;
        }

        if (typeof avatar === 'object') {
            const uploadAvatar = await uploadAvatarApi(token, avatar, user._id);
            userUpdate.avatar = uploadAvatar.avatarName;
            const updateUser = await updateUserApi(token, userUpdate, user._id);
            notification['success']({ message: updateUser.msg });
            setIsVisible(false);
            setReloadUsers(true);
        } else {
            const updateUser = await updateUserApi(token, userUpdate, user._id);
            notification['success']({ message: updateUser.msg });
            setIsVisible(false);
            setReloadUsers(true);
        }

    };

    return (
        <div className='edit-user-form'>
            <UploadAvatar 
                avatar={ avatar }
                setAvatar={ setAvatar }
            />
            <EditForm 
                setUserData={ setUserData }
                updateUser={ updateUser }
                userData={ userData }
            />
        </div>
    );
};

const UploadAvatar = ({ avatar, setAvatar }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setAvatar({ file, preview: URL.createObjectURL(file) });
    }, [setAvatar]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        onDrop,
    });

    return (
        <div className='upload-avatar' { ...getRootProps() }>
            <input { ...getInputProps() } />
            { 
                isDragActive 
                    ? <Avatar size={ 150 } src={ NoAvatar } />
                    : <Avatar size={ 150 } src={ avatarUrl ? avatarUrl : NoAvatar } />
            }
        </div>
    );
};

const EditForm = (props) => {
    const { setUserData , updateUser, userData } = props;
    const { Option } = Select;
    const { Item } = Form;

    return (
        <Form className='form-edit' onSubmit={ updateUser }>
            <Row gutter={ 24 }>
                <Col span={ 12 }>
                    <Item>
                        <Input 
                            onChange={ e => setUserData({ ...userData, name: e.target.value })}
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
                    Actualizar Usuario
                </Button>
            </Item>
        </Form>
    );

};