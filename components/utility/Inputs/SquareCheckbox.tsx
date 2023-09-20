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

const SquareCheckbox: React.FC<InputProps> = ({
  id,
  name,
  disabled,
  value,
  required,
  handleChange,
  label,
}) => {
  return (
    <div className="w-full relative">
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
      <div
        className={`absolute left-4 text-xs duration-150 transform top-2 z-10 origin-[0] font-bold bg-background p-1 rounded-lg border-2 border-primary
     `}
      >
        {label}
      </div>
      <label
        htmlFor={id}
        className="flex flex-col p-8 peer-checked:bg-primary peer-checked:text-white hover:bg-primary hover:text-white hover:shadow-xl border-2 border-black dark:border-white cursor-pointer rounded-lg"
      >
        {id}
      </label>
    </div>
  );
};

export default SquareCheckbox;
