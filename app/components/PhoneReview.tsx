import React, { useEffect } from 'react';
import { Link, useUserData } from '../context/UserDataContext';
import { motion } from 'framer-motion';

type SocialLinkProps = {
  link: Link;
};

const SocialLink: React.FC<SocialLinkProps> = ({ link }) => {
  return (
    <a href={link.url} className="mx-auto h-[44px] w-[237px]">
      {link.name}
    </a>
  );
};


const PhoneReview = () => {
  const { userData } = useUserData();

  useEffect(() => {
    console.log(userData?.user?.image)
  }, [])

  return (
    <svg width="308" height="632" fill="none" viewBox="0 0 308 632">
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />

      {/* Profile picture */}
      {userData?.user?.image ? (
        <>
          <defs>
            <motion.pattern initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="avatar" patternUnits="objectBoundingBox" x="0" y="0" height="1" width="1">
              <image
                preserveAspectRatio="xMidYMid slice"
                x="0"
                y="0"
                height="100"
                width="100"
                xlinkHref={userData?.user?.image}
              />
            </motion.pattern>
          </defs>
          <motion.circle
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            cx="153.5"
            cy="112"
            r="48"
            stroke="#633CFF"
            strokeWidth="4"
            fill="url(#avatar)" // Use the pattern as fill for the circle
          ></motion.circle>
        </>
      ) : (
        <circle cx="153.5" cy="112" r="48" fill="#EEE" />
      )
      }

      {/* Name */}
      {
        userData?.user?.firstName ? (
          <motion.foreignObject initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} x="0" y="180" width="100%" height="32" rx="4">
            <p className="text-center font-bold text-accent-gray flex items-center gap-1 justify-center">
              <span>{userData?.user?.firstName[0].toUpperCase() + userData?.user?.firstName.slice(1).toLowerCase()}</span>
              <span>{userData?.user?.lastName && userData?.user?.lastName[0].toUpperCase() + userData?.user?.lastName.slice(1).toLowerCase()}</span>
            </p>
          </motion.foreignObject>
        ) : (
          <motion.rect initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
        )
      }

      {/* Email */}
      {
        userData?.user?.email ? (
          <motion.foreignObject initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} x="0" y="208" width="100%" height="32" rx="4">
            <p className="text-center text-xs text-accent-gray">{userData?.user?.email}</p>
          </motion.foreignObject>
        ) : (
          <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
        )
      }

      {/* Links */}
      {
        userData?.links
          ? userData?.links?.map((link, index) => (
            <motion.foreignObject initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              key={index}
              width="100%"
              height="44"
              x="0"
              y={278 + index * 64}
              rx="4"
            >
              <SocialLink link={link} />
            </motion.foreignObject>
          ))
          : <>
            <rect className='mx-auto' width="80%" height="44" x="30" y="278" fill="#EEE" rx="4" />
            <rect className='mx-auto' width="80%" height="44" x="30" y="340" fill="#EEE" rx="4" />
          </>
      }
    </svg >
  );
};

export default PhoneReview;
