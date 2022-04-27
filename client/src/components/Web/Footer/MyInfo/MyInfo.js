import React from 'react';
import LogoWhite from '../../../../assets/img/png/logo-white.png';
import { SocialLinks } from '../../SocialLinks/SocialLinks';

export const MyInfo = () => {
    return (
        <div className='my-info'>
            <img alt='Curso MERN web personal' src={ LogoWhite } />
            <h4>
                Entra en el mundo del desarrollo web, disfruta creando proyectos de todo
                tipo. deja que tú imaginación fluya y crea verdaderas maravillas!!
            </h4>
            <SocialLinks />
        </div>
    );
};
