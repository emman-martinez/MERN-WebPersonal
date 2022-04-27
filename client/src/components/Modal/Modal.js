import React from 'react';
import { Modal as ModalAntd } from 'antd';

export const Modal = (props) => {
    const { 
        children, 
        isVisible, 
        setIsVisible, 
        title,
        ...other
    } = props;

    return (
        <ModalAntd
            centered
            footer={ false }
            onCancel={ () => setIsVisible(false) }
            title={ title }
            visible={ isVisible }
            { ...other }
        >
            { children }
        </ModalAntd>
    );
};
