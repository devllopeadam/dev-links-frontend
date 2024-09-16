"use client"
import { motion } from "framer-motion";
import { platforms_colors } from "../constants";
import { Link } from "../interfaces";
interface IconProps {
  icon: string;
}

type PhoneLinkProps = Link & IconProps;

const PhoneLink: React.FC<PhoneLinkProps> = ({ platform, link, icon }) => {
  return (
    <a
      href={link}
      style={{
        backgroundColor: platforms_colors[platform],
        color: platform === 'Frontend Mentor' ? '#4A4A4A' : '#FFFFFF',
      }}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-md px-4 py-3 text-[14px] font-semibold"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {icon ? <img src={icon} alt={`${platform} Icon`} style={{ width: '20px', height: '20px' }} /> : "Adam Jeniah"}
        <p style={{ margin: 0 }}>{platform}</p>
      </div>
      <svg className="group-hover:translate-x-1 transition-all duration-300" width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path
          fill="currentColor"
          d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"
        />
      </svg>
    </a >
  );
};


export default PhoneLink;
