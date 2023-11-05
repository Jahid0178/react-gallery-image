// eslint-disable-next-line react/prop-types
const Input = ({ type, onChange, className, id, ...props }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      className={className}
      id={id}
      {...props}
    />
  );
};

export default Input;
