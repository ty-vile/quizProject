"use client";

interface SelectProps {
  id: string;
  value: string | number;
  label: string;
  disabled?: boolean;
  required?: boolean;
  handleChange: (e: any) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  disabled,
  value,
  required,
  handleChange,
  children,
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
      <select
        id={id}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        name={id}
        placeholder=""
        className={`peer w-full p-3 bg-background border-2 border-gray-600 dark:border-gray-300 dark:focus:border-primary  focus:border-primary font-bold rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 relative`}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
