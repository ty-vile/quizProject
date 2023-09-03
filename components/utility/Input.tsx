"use client";

interface InputProps {
  id: string;
  label: string;
  value: string | number;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  minimum?: number;
  maximum?: number;
  handleChange: (e: any) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  value,
  required,
  minimum,
  maximum,
  handleChange,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        type={type}
        min={minimum}
        max={maximum}
        name={id}
        placeholder=""
        className={`peer w-full p-4 bg-background border-2 border-gray-200 focus:border-primary font-bold focus:border-4 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70`}
        required={required}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-sm duration-150 transform -top-5 z-10 origin-[0] font-bold bg-background p-1 rounded-lg border-4 border-primary
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
