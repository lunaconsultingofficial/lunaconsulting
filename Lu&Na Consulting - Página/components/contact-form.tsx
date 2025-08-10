"use client"

import { useActionState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { sendContact } from "@/app/send-contact-action"

type FormState = {
  ok: boolean
  message: string
}

const initialState: FormState = { ok: false, message: "" }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState)

  return (
    <form action={formAction} className="grid gap-4 rounded-xl border bg-background p-6 shadow-sm">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Nombre</label>
        <Input id="name" name="name" placeholder="Tu nombre" required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
        <Textarea id="message" name="message" placeholder="Cuéntanos en qué podemos ayudarte" required />
      </div>
      <Button disabled={pending} className="mt-2">
        {pending ? "Enviando..." : "Enviar"}
      </Button>
      {state.message ? (
        <p className={state.ok ? "text-emerald-600" : "text-destructive"} role="status" aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
