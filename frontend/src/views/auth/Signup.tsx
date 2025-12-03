"use client"

import TextInput from "@/components/form/TextInput/TextInput"
import { AuthContext } from "@/providers/AuthProvider/AuthProvider"
import { Button } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useContext, useState } from "react"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useContext(AuthContext)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações básicas
    if (!name.trim()) {
      setError("Nome é obrigatório")
      return
    }
    if (!email.trim()) {
      setError("Email é obrigatório")
      return
    }
    if (password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres")
      return
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    setLoading(true)
    const result = await signup(name, email, password)
    setLoading(false)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.message || "Erro ao criar conta")
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Criar Conta</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          label="Nome"
          value={name}
          onChange={setName}
          focus
        />
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          name="password"
          label="Senha"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <TextInput
          name="confirmPassword"
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Conta"}
        </Button>
      </form>
      <p className="mt-4 text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Faça login
        </Link>
      </p>
    </>
  )
}

export default Signup
