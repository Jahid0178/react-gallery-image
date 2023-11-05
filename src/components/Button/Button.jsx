// eslint-disable-next-line react/prop-types
const Button = ({ children, onClick, type, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
