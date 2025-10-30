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
                type='number'
                value={value}
                onChange={(e) => {
                    const raw = e.target.value
                    const parsed = raw === '' ? 0 : parseFloat(raw)
                    onChange(parsed)
                }}
                step="0.01"
                placeholder={placeholder ?? ''}
                required={required ?? false}
                shadow
            />
        </div>
    );
}

export default NumberInput;