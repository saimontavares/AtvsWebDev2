import {TextInput as FBTextInput, HelperText, Label} from "flowbite-react"

interface NumberInputProps {
    name: string;
    value: number;
    label: string;
    onChange: (s: number) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

function NumberInput({ name, value, label, onChange, placeholder, required, error }: NumberInputProps) {
    return (
        <div>
            <div className="mb-2 block">
            <Label htmlFor={name}>{label}</Label>
            </div>
            <FBTextInput
                id={name}
                type='number'
                color={error ? 'failure' : 'gray'}
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
            {error && <HelperText color="failure">
                {error}
            </HelperText>}
        </div>
    );
}

export default NumberInput;