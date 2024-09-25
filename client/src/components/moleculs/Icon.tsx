
type IconProps = {
    styles?: string;
    imgUrl?: string;
    isActive?: boolean;
    name?: string;
    disabled?: boolean;
    handleClick?: () => void;
  };
  
export const Icon: React.FC<IconProps> = ({ styles, imgUrl, isActive, name, disabled, handleClick }) => {
  return (
    <div
      className={`${styles} w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-[#2c2f32]' : ''} flex justify-center items-center ${!disabled ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {isActive ? (
        <img src={imgUrl} alt='logo' className='w-1/2 h-1/2' />
      ) : (
        <img src={imgUrl} alt='logo' className={`w-1/2 h-1/2 ${isActive !== name ? 'grayscale' : ''}`} />
      )}
    </div>
  );
};  