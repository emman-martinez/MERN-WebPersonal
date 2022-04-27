import React, { useEffect, useState } from 'react';
import { 
    Avatar,
    Button,
    Icon, 
    List,
    Modal as ModalAntd,
    notification,
    Switch,
} from 'antd';
import NoAvatar from './../../../../assets/img/png/no-avatar.png';
import { Modal } from '../../../Modal/Modal';
import { AddUserForm } from '../AddUserForm/AddUserForm';
import { EditUserForm } from '../EditUserForm/EditUserForm';
import { 
    activateUserApi, 
    deleteUserApi, 
    getAvatarApi 
} from '../../../../api/user';
import { ACCESS_TOKEN } from '../../../../utils/constants';

const { confirm } = ModalAntd;

export const ListUsers = ({ setReloadUsers, usersActive, usersInactive }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [viewUsersActives, setViewUsersActives] = useState(true);

    const addUserModal = () => {
        setIsVisible(true);
        setModalTitle('Crear nuevo usuario');
        setModalContent(<AddUserForm 
                setIsVisible={ setIsVisible } 
                setReloadUsers={ setReloadUsers }
            />
        );
    };

    const showDeleteConfirm = (user) => {
        confirm({
            title: 'Eliminando usuario',
            content: `¿Estás seguro que quieres eliminar a ${ user.email }?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const token = localStorage.getItem(ACCESS_TOKEN);
                const deleteUser = await deleteUserApi(token, user._id);
                if (deleteUser.ok) {
                    notification['success']({
                        message: deleteUser.msg,
                    });
                    setReloadUsers(true);
                } else {
                    notification['error']({
                        message: deleteUser.msg,
                    });
                }
            }
        });
    };
    
    return (
        <div className='list-users'>
            <div className='list-users__header'>
                <div className='list-users__header-switch'>
                    <Switch 
                        defaultChecked
                        onChange={ () => setViewUsersActives(!viewUsersActives) }
                    />
                    <span>
                        {
                            viewUsersActives ? 'Usuarios Activos' : 'Usuarios Inactivos'
                        }
                    </span>
                </div>
                <Button type='primary' onClick={ addUserModal }>
                    Nuevo Usuario
                </Button>
            </div>
            {
               viewUsersActives 
                ?   <UsersActive 
                        setIsVisible={ setIsVisible }
                        setModalContent={ setModalContent }
                        setModalTitle={ setModalTitle }
                        setReloadUsers={ setReloadUsers }
                        showDeleteConfirm={ showDeleteConfirm }
                        usersActive={ usersActive }
                    /> 
                :   <UsersInactive
                        setReloadUsers={ setReloadUsers }
                        showDeleteConfirm={ showDeleteConfirm }
                        usersInactive={ usersInactive } 
                    /> 
            }
            <Modal
                title={ modalTitle }
                isVisible= { isVisible }
                setIsVisible={ setIsVisible }
            >
                { modalContent }
            </Modal>
        </div>
    );
};

const UsersActive = ({ 
    setIsVisible, 
    setModalContent, 
    setModalTitle, 
    setReloadUsers,
    showDeleteConfirm,
    usersActive 
}) => {

    const editUser = (user) => {
        setIsVisible(true);
        setModalTitle(
            `Editar 
            ${ user.name ? user.name : '...' } 
            ${ user.lastname ? user.lastname : '...' }`
        );
        setModalContent(<EditUserForm 
            setIsVisible={ setIsVisible } 
            setReloadUsers={ setReloadUsers }
            user={ user } />
        );
    };

    return (
        <List 
            className='users-active'
            itemLayout='horizontal'
            dataSource={ usersActive }
            renderItem={ user  => (
                <UserActive 
                    editUser={ editUser }
                    setReloadUsers={ setReloadUsers }
                    showDeleteConfirm={ showDeleteConfirm }
                    user={ user }
                />   
            )}
        />
    );
};

const UserActive = ({ editUser, setReloadUsers, showDeleteConfirm, user }) => {
    const [avatar, setAvatar] = useState(null);
    const { Item, Item: { Meta } } = List;

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

    const desactivateUser = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const statusUser = await activateUserApi(token, user._id, false);
        if (statusUser.ok) {
            notification['success']({
                message: statusUser.msg,
            });
            setReloadUsers(true);
        } else {
            notification['error']({
                message: statusUser.msg,
            });
        }
    }

    return (
        <Item
            actions={[
                <Button
                    type='primary'
                    onClick={ () => editUser(user) }
                >
                    <Icon type='edit' />
                </Button>,
                <Button
                    type='danger'
                    onClick={ desactivateUser }
                >
                    <Icon type='stop' />
                </Button>,
                <Button
                    type='danger'
                    onClick={ () => showDeleteConfirm(user) }
                >
                    <Icon type='delete' />
                </Button>     
            ]}
        >
            <Meta 
                avatar={ <Avatar src={ avatar ? avatar : NoAvatar } /> }
                title={`
                    ${ user.name ? user.name : '...' }
                    ${ user.lastname ? user.lastname : '...' }
                `}
                description={ user.email }
            />
        </Item>
    );
};

const UsersInactive = ({ setReloadUsers, showDeleteConfirm, usersInactive }) => {
    return (
        <List 
            className='users-active'
            itemLayout='horizontal'
            dataSource={ usersInactive }
            renderItem={ user  => (
                <UserInactive
                    setReloadUsers={ setReloadUsers }
                    showDeleteConfirm={ showDeleteConfirm }
                    user={ user }
                />
            )}
        />
    );
};

const UserInactive = ({ setReloadUsers, showDeleteConfirm, user }) => {
    const [avatar, setAvatar] = useState(null);
    const { Item, Item: { Meta } } = List;

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

    const activateUser = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const statusUser = await activateUserApi(token, user._id, true);
        if (statusUser.ok) {
            notification['success']({
                message: statusUser.msg,
            });
            setReloadUsers(true);
        } else {
            notification['error']({
                message: statusUser.msg,
            });
        }
    }

    return (
        <Item
            actions={[
                <Button
                    type='primary'
                    onClick={ activateUser }
                >
                    <Icon type='check' />
                </Button>,
                <Button
                    type='danger'
                    onClick={ () => showDeleteConfirm(user) }
                >
                    <Icon type='delete' />
                </Button>     
            ]}
        >
            <Meta 
                avatar={ <Avatar src={ avatar ? avatar : NoAvatar } /> }
                title={`
                    ${ user.name ? user.name : '...' }
                    ${ user.lastname ? user.lastname : '...' }
                `}
                description={ user.email }
            />
        </Item>
    );
};