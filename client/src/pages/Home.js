import React from 'react';
import { Helmet } from 'react-helmet';
import { HomeCourses } from '../components/Web/HomeCourses/HomeCourses';
import { HowMyCoursesWork } from '../components/Web/HowMyCoursesWork/HowMyCoursesWork';
import { MainBanner } from '../components/Web/MainBanner/MainBanner';
import { ReviewsCourses } from '../components/Web/ReviewsCourses/ReviewsCourses';

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>Curso MERN</title>
            </Helmet>
            <MainBanner />
            <HomeCourses />
            <HowMyCoursesWork />
            <ReviewsCourses />
        </>
    );
};
