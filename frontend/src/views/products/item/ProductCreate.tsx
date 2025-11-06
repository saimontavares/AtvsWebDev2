'use client'

import TextInput from '@/components/form/TextInput/TextInput'
import NumberInput from '@/components/form/NumberInput/NumberInput'
import React, { FormEvent, useRef, useState } from 'react'
import TextArea from '@/components/form/TextArea/TextArea'
import { Button } from 'flowbite-react'
import { CreateProductDto } from '../Product.types'
import { useRouter } from 'next/navigation'
import { productSchema } from '../Product.schema'

function ProductCreate() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState("0.00")
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const router = useRouter()
    const randomNumber = Math.random()*100
    const randomNumberRef = useRef<number>(Math.random()*100)

    console.log(randomNumberRef.current)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const product : CreateProductDto = {
            name,
            price,
            stock,
            description,
        }
        console.log('Submitting product:', product)
        const {error} = productSchema.validate(product, { abortEarly: false })
        if(error){
            const errorDetails: Record<string, string> = {}
            console.log(error.details)
            for(const errorDetail of error.details){
                errorDetails[errorDetail.path[0]] = errorDetail.message;
            }
            setErrors(errorDetails)
            console.log(errorDetails)
            return
        }
        fetch(`${process.env.NEXT_PUBLIC_API}/product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((res)=>{
            res.json()
        }).then(() => {
            router.push('/')
        })
    }

    return (
        <>
            <h1 className='text-2xl font-bold mb-2'>Criação de produto</h1>
            <form method='POST' onSubmit={handleSubmit} className='flex max-w-md flex-col gap-4'>
                <TextInput name='name' label='Nome' value={name} onChange={setName} error={errors['name']} focus/>
                <TextInput name='price' label='Preço' value={price} onChange={setPrice} error={errors['price']} />
                <NumberInput name='stock' label='Estoque' value={stock} onChange={setStock} error={errors['stock']} />
                <TextArea name='description' label='Descrição' value={description} onChange={setDescription} rows={4} error={errors['description']} />
                <Button type='submit'>
                    Enviar
                </Button>
            </form>
        </>
    )
}

export default ProductCreate