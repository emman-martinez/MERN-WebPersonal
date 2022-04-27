import React, { useState } from 'react';
import {
    Row,
    Col,
    Form,
    Icon,
    Input,
    Button,
    DatePicker,
    notification,
} from 'antd';
import moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';
import { ACCESS_TOKEN } from '../../../../utils/constants';
import { addPostApi } from '../../../../api/blog';

const token = localStorage.getItem(ACCESS_TOKEN);

export const AddPostForm = ({ setIsVisibleModal, setReloadPosts }) => {
    const [postData, setPostData] = useState({});

    const addPost = async(e) => {
        e.preventDefault();

        console.log({ postData });

        const {
            date,
            description,
            title,
            url,
        } = postData;

        if (!title || !url || !description || !date) {
            notification["error"]({
              message: "Todos los campos son obligatorios."
            });
        } else {
            const addPost = await addPostApi(token, postData);

            if (addPost.ok) {
                notification['success']({
                    message: addPost.msg,
                });

                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            } else {
                notification['error']({
                    message: addPost.msg,
                }) ;
            }
        }
    };
    
    return (
        <div className='add-post-form'>
            <AddPost
                addPost={ addPost } 
                postData={ postData }
                setPostData={ setPostData }
            />
        </div>
    );
};

const AddPost = ({ addPost, postData, setPostData }) => {
    return (
        <Form  
            className="form-add-post"
            layout="inline" 
            onSubmit={ addPost }
        >
            <Row gutter={ 24 }>
                <Col span={ 8 }>
                    <Input
                        onChange={ e => setPostData({ ...postData, title: e.target.value }) }
                        placeholder="Titulo"
                        prefix={ <Icon type="font-size"/> }
                        value={ postData.title }
                    />
                </Col>
                <Col span={ 8 }>
                    <Input
                        onChange={ e => setPostData({ ...postData, url: transformTextToUrl(e.target.value) }) }
                        placeholder="Url"
                        prefix={ <Icon type="link"/> }
                        value={ postData.url }
                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        format="DD/MM/YYYY HH:mm:ss"
                        onChange={ (e, value) => setPostData({ ...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString() }) }
                        placeholder="Fecha de publicación"
                        style={ { width: "100%" } }
                        value={ postData.date && moment(postData.date) }
                    />
                </Col>
            </Row>

            <Editor
                init={
                    {
                        height: 400,
                        menubar: true,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount"
                        ],
                        toolbar:
                            // eslint-disable-next-line no-multi-str
                            "undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help"
                    }
                }
                onChange={ e => setPostData({ ...postData, description: e.target.getContent() }) }
                value={ postData.description ? postData.description : "" }
            />
       
            <Button 
                className="btn-submit"
                htmlType="submit" 
                type="primary" 
            >
                Crear post
            </Button> 
        </Form>
    );
};

function transformTextToUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}