"use client";

interface TextareaProps {
  id: string;
  label: string;
  value: string | number;
  disabled?: boolean;
  required?: boolean;
  handleChange: (e: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  disabled,
  value,
  required,
  handleChange,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        name={id}
        placeholder=""
        className={`peer w-full p-3 bg-background border-2 border-gray-200 focus:border-primary font-bold focus:border-4 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 max-h-[150px]`}
        required={required}
      ></textarea>
      <label
        htmlFor={id}
        className={`absolute left-4 text-xs duration-150 transform -top-4 z-10 origin-[0] font-bold bg-background p-1 rounded-lg border-2 border-primary
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;