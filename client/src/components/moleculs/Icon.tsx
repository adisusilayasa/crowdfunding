
type IconProps = {
    styles?: string;
    imgUrl?: string;
    isActive?: string;
    name?: string;
    disabled?: boolean;
    handleClick?: any;
  };
  
export const Icon: React.FC<IconProps> = ({ styles, imgUrl, isActive, name, disabled, handleClick }) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`}
      onClick={handleClick} 
      aria-disabled={disabled}
    >
      {!isActive ? (
        <img src={imgUrl} alt='fund_logo' className='w-1/2 h-1/2' />
      ) : (
        <img src={imgUrl} alt='fund_logo' className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
  );
};  