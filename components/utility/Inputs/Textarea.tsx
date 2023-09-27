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
        className={`peer w-full p-3 bg-background border-2 border-slate-600 dark:border-white focus:border-primary font-bold focus:border-4 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 max-h-[120px]
        `}
        required={required}
      ></textarea>
      <label
        htmlFor={id}
        className={`absolute left-4 text-xs duration-150 transform -top-4 z-10 origin-[0] font-bold bg-background p-1 rounded-lg border-2 border-primary font-josefin
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
