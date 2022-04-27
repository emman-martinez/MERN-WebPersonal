import React, { useEffect, useState } from 'react';
import { notification, Spin,  } from "antd";
import { Helmet } from "react-helmet";
import moment from "moment";
import { getPostApi } from "../../../../api/blog";
import "moment/locale/es";

export const PostInfo = ({ url }) => {
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        const getPost = async() => {
            const getPost = await getPostApi(url);
            if (getPost.ok) {
                setPostInfo(getPost.post);
            } else {
                notification['warning']({
                    message: getPost.msg,
                });
            }
        };
        getPost();
    }, [url]);

    if (!postInfo) {
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
                <title>{ postInfo.title } | Curso MERN</title>
            </Helmet>
            <div className="post-info">
                <h1 className="post-info__title">{ postInfo.title }</h1>
                <div className="post-info__creation-date">
                    {
                        moment(postInfo.date)
                        .local("es")
                        .format("LL")
                    }
                </div>
                <div
                    className="post-info__description"
                    dangerouslySetInnerHTML={{ __html: postInfo.description }}
                />
            </div>
        </> 
    );
};
