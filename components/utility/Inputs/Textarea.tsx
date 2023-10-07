"use client";

interface TextareaProps {
  id: string;
  label: string;
  value: string | number;
  rows: number;
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
  rows,
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
      <textarea
        id={id}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        name={id}
        rows={6}
        placeholder=""
        className={`peer w-full p-3 bg-background border-2 border-gray-300 dark:border-white/20 dark:focus:border-primary  focus:border-primary font-bold rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 relative`}
        required={required}
      ></textarea>
    </div>
  );
};

export default Textarea;
