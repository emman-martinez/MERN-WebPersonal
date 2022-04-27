import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button, 
    Icon, 
    List, 
    Modal as ModalAntd, 
    notification,
} from 'antd';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { deletePostApi } from '../../../../api/blog';
import { EditPostForm } from '../EditPostForm/EditPostForm';

const { confirm } = ModalAntd;
const token = localStorage.getItem(ACCESS_TOKEN);

export const PostsList = ({
    posts,
    setIsVisibleModal,
    setModalContent,
    setModalTitle,
    setReloadPosts,
}) => {
    
    const deletePost = (post, title) => {
        confirm({
            title: 'Eliminar Post',
            content: `¿Estás seguro que quieres eliminar el post: ${ title }?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const deletePost = await deletePostApi(token, post._id);
    
                if (deletePost.ok) {
                    notification['success']({
                        message: deletePost.msg,
                    });
                    setReloadPosts(true);
                } else {
                    notification['error']({
                        message: deletePost.msg,
                    });
                }
            }
        });
    };

    const editPost = (post, title) => {
        setIsVisibleModal(true);
        setModalTitle(`Editar Post: ${ title }`);
        setModalContent(
            <EditPostForm
                post={ post }
                setIsVisibleModal={ setIsVisibleModal }
                setReloadPosts={ setReloadPosts }
            />
        );
    };

    return (
        <div className='posts-list'>
           <List 
                dataSource={ posts.docs }
                renderItem={ post => <Post 
                                        deletePost={ deletePost } 
                                        editPost={ editPost } 
                                        post={ post } 
                                    />
                }
           />
        </div>
    );
};

const Post = ({ deletePost, editPost, post }) => {
    const { Item, Item: { Meta } } = List;
    
    return (
        <Item
            actions={[
                <Link target='_blank' to={`/blog/${ post.url }`}>
                    <Button type='primary'>
                        <Icon type='eye' />
                    </Button>
                </Link>,
                <Button
                    onClick={ () => editPost(post, post.title) } 
                    type='primary'
                >
                    <Icon type='edit' />
                </Button>,
                <Button
                    onClick={ () => deletePost(post, post.title) } 
                    type='danger'
                >
                    <Icon type='delete' />
                </Button>,
            ]}
        >
            <Meta title={ post.title } />
        </Item>
    );
};
