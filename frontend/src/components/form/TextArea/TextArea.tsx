import { Textarea as FBTextArea, HelperText, Label } from "flowbite-react";
import { useEffect, useRef } from "react";

interface TextAreaProps {
  name: string;
  value: string;
  label: string;
  onChange: (s: string) => void;
  placeholder?: string;
  rows: number;
  focus?: boolean;
  error?: string;
}

function TextArea({
  name,
  value,
  label,
  onChange,
  placeholder,
  rows,
  focus,
  error,
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (focus) ref.current?.focus()
  }, [focus])
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name}>{label}</Label>
      </div>
      <FBTextArea
        ref={ref}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        rows={rows ?? 4}
        
        shadow
      ></FBTextArea>
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default TextArea;
