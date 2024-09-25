import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun } from '../../assets';
import { Icon } from '../moleculs/Icon';
import { navLinks } from '../../constants';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to='/' className='text-2xl font-bold'>
        <Icon styles='w-[52px] h-[52px] bg-[#2c2f32]' imgUrl={logo} />
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navLinks.map((link) => (
            <Link key={link.name}  className={`w-full flex justify-center items-center ${link.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Icon isActive={isActive}
                {...link}
                handleClick={()=>{
                  if(!link.disabled){
                    setIsActive(link.name)
                    navigate(link.link)
                  }
                }}
              />
            </Link>
          ))}
        </div>
        <Icon styles='bg-[#1c1c24] shadow-secondary' imgUrl={sun}/> 
      </div>
    </div>
  );
};

export default Sidebar;
