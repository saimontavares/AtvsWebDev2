import TextInput from '@/components/form/TextInput/TextInput';
import { Button } from 'flowbite-react';
import React from 'react';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <>
            <h1 className='text-2xl font-bold mb-2'>Login</h1>
            <form method='POST' onSubmit={onSubmit} className='flex max-w-md flex-col gap-4'>
                <TextInput name='email' label='Email' value={email} onChange={setEmail} focus />
                <TextInput name='password' label='Senha' type='password' value={password} onChange={setPassword} focus />
                <Button type='submit'>
                    Enviar
                </Button>
            </form>
        </>
    )
}

export default Login;