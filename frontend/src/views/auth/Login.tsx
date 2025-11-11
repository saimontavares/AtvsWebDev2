'use client'

import TextInput from '@/components/form/TextInput/TextInput';
import { AuthContext } from '@/providers/AuthProvider/AuthProvider';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {user, login} = useContext(AuthContext);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if(success){
            router.push('/');
        } else {
            alert('Login failed');
        }
    }
    return (
        <>
            <h1 className='text-2xl font-bold mb-2'>Login de Usuário</h1>
            <form method='POST' className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
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