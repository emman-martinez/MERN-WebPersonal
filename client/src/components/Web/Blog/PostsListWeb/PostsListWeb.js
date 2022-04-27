import React, { useEffect, useState } from 'react';
import { List, notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import queryString from 'query-string';
import { Pagination } from '../../../Paginacion/Pagination';
import { getPostsApi } from '../../../../api/blog';
import 'moment/locale/es';

export const PostsListWeb = ({ history, location }) => {
    const [posts, setPosts] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

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
    }, [page]);

    if (!posts) {
        return (
            <Spin 
                style={{ width: "100%", padding: "200px 0" }} 
                tip="Cargando" 
            />
        );
    }

    return (
        <>
            <Helmet>
                <title>Blog de programación | Curso MERN</title>
            </Helmet>
            <div className='posts-list-web'>
                <h1>Blog</h1>
                <List
                    dataSource={ posts.docs }
                    renderItem={ post => <Post post={ post } /> }
                />
                <Pagination 
                    history={ history } 
                    location={ location } 
                    posts={ posts } 
                />
            </div>
        </>
    );
};

const Post = ({ post }) => {
    const { Item, Item: { Meta } } = List;
    const day = moment(post.date).format("DD");
    const month = moment(post.date).format("MMMM");
  
    return (
      <Item className="post">
        <div className="post__date">
          <span>{ day }</span>
          <span>{ month }</span>
        </div>
        <Link to={ `blog/${ post.url }` }>
          <Meta title={ post.title } />
        </Link>
      </Item>
    );
  }