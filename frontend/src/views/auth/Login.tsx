'use client'

import TextInput from '@/components/form/TextInput/TextInput';
import { AuthContext } from '@/providers/AuthProvider/AuthProvider';
import { Button } from 'flowbite-react';
import { useRouter } from "next/navigation";
import React, { useContext, useState } from 'react';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = useState("")
    const { login } = useContext(AuthContext);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ok = await login(email, password);
        if (ok) {
            router.push("/");
        } else {
            setError("Email e/ou senha incorretos!")
        }
    }
    return (
        <>
            <h1 className='text-2xl font-bold mb-2'>Login de Usuário</h1>
            <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
                <TextInput name='email' label='Email' value={email} onChange={setEmail} focus error={error} />
                <TextInput name='password' label='Senha' type='password' value={password} onChange={setPassword} focus error={error} />
                <Button type='submit'>
                    Enviar
                </Button>
            </form>
        </>
    )
}

export default Login;