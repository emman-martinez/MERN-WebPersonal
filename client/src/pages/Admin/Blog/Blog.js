import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import {
    Button,
    notification
} from 'antd';
import { getPostsApi } from '../../../api/blog';
import { AddPostForm } from '../../../components/Admin/Blog/AddPostForm/AddPostForm';
import { PostsList } from '../../../components/Admin/Blog/PostsList/PostsList';
import { Modal } from '../../../components/Modal/Modal';
import { Pagination } from '../../../components/Paginacion/Pagination';

const Blog = (props) => {
    const { history, location } = props;
    const { page = 1 } = queryString.parse(location.search);

    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const getPosts = async() => {
            const allPosts = await getPostsApi(12, page);
            if (allPosts.ok) {
                setPosts(allPosts.posts);
            } else {
                notification['warning']({
                    message: allPosts.msg,
                });
            }
        };
        getPosts();
        setReloadPosts(false);
    }, [page, reloadPosts]);

    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle('Crear Post');
        setModalContent(
            <AddPostForm 
                setIsVisibleModal={ setIsVisibleModal }
                setReloadPosts={ setReloadPosts }
            />
        );
    };

    if (!posts) return null;
    
    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button 
                    type='primary'
                    onClick={ addPost }
                >
                    Nuevo Post
                </Button>
            </div>
            <PostsList
                posts={ posts }
                setIsVisibleModal={ setIsVisibleModal }
                setModalContent={ setModalContent }
                setModalTitle={ setModalTitle }
                setReloadPosts={ setReloadPosts }
            />
            <Pagination
                history={ history }
                location={ location }
                posts={ posts }
            />
            <Modal
                isVisible={ isVisibleModal }
                setIsVisible={ setIsVisibleModal }
                title={ modalTitle }
                width={ '75%' }
            >
                { modalContent }
            </Modal>    
        </div>
    );
};

export default withRouter(Blog);

