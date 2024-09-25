import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { Icon } from './moleculs/Icon';


const Sidebar: React.FC = () => {
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/' className='text-2xl font-bold'>
        <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo} />
      </Link>
    </div>
  );
};

export default Sidebar;
