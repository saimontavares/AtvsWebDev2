import { TextInput as FBTextInput, HelperText, Label } from "flowbite-react";
import { useEffect, useRef } from "react";

interface TextInputProps {
  name: string;
  value: string;
  label: string;
  onChange: (s: string) => void;
  placeholder?: string;
  focus?: boolean;
  error?: string;
  type?: string;
}

function TextInput({
  name,
  value,
  label,
  onChange,
  placeholder,
  error,
  focus,
  type,
}: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus();
  }, [focus]);
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? "failure" : "gray"}>
          {label}
        </Label>
      </div>
      <FBTextInput
        ref={ref}
        id={name}
        color={error ? "failure" : "gray"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        shadow
        type={type ?? "text"}
      />
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default TextInput;
