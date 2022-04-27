import React from 'react';
import { ReactComponent as YouTubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/img/svg/linkedin.svg';

export const SocialLinks = () => {
  return (
    <div className='social-links'>
        <a
            className='youtube'
            href='https://www.youtube.com'
            rel='noreferrer'
            target='_blank'
        >
            <YouTubeIcon />
        </a>
        <a
            className='twitter'
            href='https://www.twitter.com'
            rel='noreferrer'
            target='_blank'
        >
            <TwitterIcon />
        </a>
        <a
            className='facebook'
            href='https://www.facebook.com'
            rel='noreferrer'
            target='_blank'
        >
            <FacebookIcon />
        </a>
        <a
            className='linkedin'
            href='https://www.linkedin.com'
            rel='noreferrer'
            target='_blank'
        >
            <LinkedinIcon />
        </a>
    </div>
  );
};
