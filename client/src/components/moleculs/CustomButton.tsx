import React from 'react'

type CustomButtonProps = {
  styles?: string;
  title?: string;
  btnType?: "button" | "submit" | "reset";
  handleClick?: any;
};
export const CustomButton: React.FC<CustomButtonProps> = ({title, btnType, styles, handleClick}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    > 
      {title}  
    </button>
  )
}

export default CustomButton