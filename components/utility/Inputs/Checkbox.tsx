"use client";

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: boolean;
  type?: string;
  disabled?: boolean;
  required?: boolean;

  handleChange: (e: any) => void;
}

const Checkbox: React.FC<InputProps> = ({
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
    <div className="w-2/12 relative">
      <input
        id={id}
        name={name}
        disabled={disabled}
        checked={value}
        onChange={(e) => {
          handleChange(e);
        }}
        type="checkbox"
        placeholder=""
        className={`peer w-full p-3 bg-background border-2 border-gray-200 focus:border-primary font-bold focus:border-4 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70`}
        required={required}
      />
      {/* <label
        htmlFor={id}
        className={`absolute left-4 text-xs duration-150 transform -top-4 z-10 origin-[0] font-bold bg-background p-1 rounded-lg border-2 border-primary
      `}
      >
        {label}
      </label> */}
    </div>
  );
};

export default Checkbox;
