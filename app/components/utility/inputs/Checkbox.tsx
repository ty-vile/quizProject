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
  disabled,
  value,
  required,
  handleChange,
}) => {
  return (
    <div className="w-fit pl-20 relative">
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
        className={`peer opacity-0`}
        required={required}
      />

      <label
        htmlFor={id}
        className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-2/2 text-xs duration-300 transform  z-10 origin-[0] font-bold bg-background p-3 rounded-full border-2 border-primary peer-checked:bg-primary cursor-pointer font-josefin
      `}
      ></label>
    </div>
  );
};

export default Checkbox;
