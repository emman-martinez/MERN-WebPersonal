import React from 'react';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { PostInfo } from '../components/Web/Blog/PostInfo/PostInfo';
import { PostsListWeb } from '../components/Web/Blog/PostsListWeb/PostsListWeb';

export const Blog = ({ history, location }) => {
    const { url } = useParams();

    return (
        <Row>
            <Col md={4} />
            <div className='blog-pages'>
                <Col md={16}>
                    
                        {
                            url
                                ?   <PostInfo url={ url } />
                                :   <PostsListWeb history={ history } location={ location } />
                        }
                    
                </Col>
            </div>
            <Col md={4} />
        </Row>
    );
};
