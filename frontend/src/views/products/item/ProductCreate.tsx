'use client'

import TextInput from '@/components/form/TextInput/TextInput'
import NumberInput from '@/components/form/NumberInput/NumberInput'
import React, { FormEvent, useState } from 'react'
import TextArea from '@/components/form/TextArea/TextArea'
import { Button } from 'flowbite-react'
import { CreateProductDto } from '../Product.types'
import { useRouter } from 'next/navigation'

function ProductCreate() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('0.00')
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const apiBase = process.env.NEXT_PUBLIC_API || process.env.NEXT_PUBLIC_DOCKER_API
        if (!apiBase) {
            setError('API base URL não configurada (NEXT_PUBLIC_API ou NEXT_PUBLIC_DOCKER_API).')
            return
        }

        const product : CreateProductDto = {
            name,
            price,
            stock,
            description,
        }

        setLoading(true)
        try {
            const res = await fetch(`${apiBase}/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })

            if (!res.ok) {
                const text = await res.text().catch(() => '')
                throw new Error(text || `HTTP ${res.status}`)
            }

            await res.json()
            setSuccess('Produto criado com sucesso')
            // limpar campos
            setName('')
            setPrice('0.00')
            setStock(0)
            setDescription('')
            // navegar para lista
            router.push('/')
        } catch (err: any) {
            console.error(err)
            setError(err?.message || 'Erro desconhecido ao tentar criar o produto')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className='text-2xl font-bold'>Criação de produto</h1>
            <form method='POST'>
                <TextInput name='name' label='Nome' value={name} onChange={setName} required/>
                <NumberInput name='price' label='Preço' value={Number(price)} onChange={(n) => setPrice(n.toFixed(2))} required/>
                <NumberInput name='stock' label='Estoque' value={stock} onChange={setStock} required/>
                <TextArea name='description' label='Descrição' value={description} onChange={setDescription} rows={4} />
                <Button type='submit' onClick={handleSubmit} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                    Criar Produto
                </Button>
            </form>
        </>
    )
}

export default ProductCreate