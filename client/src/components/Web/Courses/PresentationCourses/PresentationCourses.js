import React from 'react';
import AcademyLogo from '../../../../assets/img/png/academy-logo.png';

export const PresentationCourses = () => {
    return (
        <div className='presentation-courses'>
            <img 
                alt='Cursos'
                src={ AcademyLogo }
            />
            <p>
                En ANA vas a encontrar los mejores cursos online de
                desarrollo web en Español. Uneté a nosotros y empieza tu camino como
                Desarrollador Web.
            </p>
            <p>
                ¡Echales un vistazo y aprovecha las ofertas!
            </p>
        </div>
    );
};
