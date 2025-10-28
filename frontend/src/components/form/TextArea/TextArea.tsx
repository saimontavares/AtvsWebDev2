import { Textarea as FBTextArea, Label } from "flowbite-react";

interface TextAreaProps {
  name: string;
  value: string;
  label: string;
  onChange: (s: string) => void;
  placeholder?: string;
  required?: boolean;
  rows: number;
}

function TextArea({
  name,
  value,
  label,
  onChange,
  placeholder,
  required,
  rows,
}: TextAreaProps) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name}>{label}</Label>
      </div>
      <FBTextArea
        id={name}
        value={value}
        onChange={(e) => onChange((e.target as HTMLTextAreaElement).value)}
        placeholder={placeholder ?? ""}
        required={required ?? false}
        rows={rows ?? 4}
        shadow
      ></FBTextArea>
    </div>
  );
}

export default TextArea;
