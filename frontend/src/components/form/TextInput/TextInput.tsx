import {TextInput as FBTextInput, Label} from "flowbite-react"

interface TextInputProps {
    name: string;
    value: string;
    label: string;
    onChange: (s: string) => void;
    placeholder?: string;
    required?: boolean;
}

function TextInput({ name, value, label, onChange, placeholder, required }: TextInputProps) {
    return (
        <div>
            <div className="mb-2 block">
            <Label htmlFor={name}>{label}</Label>
            </div>
            <FBTextInput
                id={name}
                type='text'
                value={value}
                onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                placeholder={placeholder ?? ''}
                required={required ?? false}
                shadow
            />
        </div>
    );
}

export default TextInput;