"use client";

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  type?: string;
  disabled?: boolean;
  required?: boolean;

  handleChange: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type,
  disabled,
  value,
  required,
  handleChange,
}) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={id}
        className={`font-josefin text-sm
      `}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        type={type}
        placeholder=""
        className={`peer w-full p-3 bg-background border-2 border-gray-600 dark:border-gray-300 dark:focus:border-primary  focus:border-primary font-bold rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 relative`}
        required={required}
      />
    </div>
  );
};

export default Input;
