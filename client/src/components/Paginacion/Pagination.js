import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

export const Pagination = ({ history, location, posts }) => {
    const currentPage = parseInt(posts.page);

    const onChangePage = (newPage) => {
        history.push(`${ location.pathname }?page=${ newPage }`);
    };

    return (
        <PaginationAntd
            className='pagination'
            defaultCurrent={ currentPage }
            onChange={ (newPage) => onChangePage(newPage) }
            pageSize={ posts.limit }
            total={ posts.total }
        />
    );
};
