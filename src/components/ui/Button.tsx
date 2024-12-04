interface ButtonProps {
    children: string; 
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <div 
            className='flex backdrop-blur-sm bg-[#D1ECFF]/20 text-bold bg-gradient-to-t from-white-200 from-10%  via-30% to-50% gap-x-5 h-[50px] border border-white rounded-full px-5 py-2 cursor-pointer items-center'
            onClick={onClick}>
            {children}
        </div>
    );
}

export default Button;