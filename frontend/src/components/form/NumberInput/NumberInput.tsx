import {TextInput as FBTextInput, Label} from "flowbite-react"

interface NumberInputProps {
    name: string;
    value: number;
    label: string;
    onChange: (s: number) => void;
    placeholder?: string;
    required?: boolean;
}

function NumberInput({ name, value, label, onChange, placeholder, required }: NumberInputProps) {
    return (
        <div>
            <div className="mb-2 block">
            <Label htmlFor={name}>{label}</Label>
            </div>
            <FBTextInput
                id={name}
                type='text'
                value={value}
                onChange={(e) => onChange(Number((e.target as HTMLInputElement).value))}
                placeholder={placeholder ?? ''}
                required={required ?? false}
                shadow
            />
        </div>
    );
}

export default NumberInput;