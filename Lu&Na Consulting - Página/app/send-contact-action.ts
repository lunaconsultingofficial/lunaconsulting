"use server"

export async function sendContact(prevState: { ok: boolean; message: string }, formData: FormData) {
  await new Promise((r) => setTimeout(r, 800))

  const name = String(formData.get("name") || "")
  const email = String(formData.get("email") || "")
  const message = String(formData.get("message") || "")

  if (!name || !email || !message) {
    return { ok: false, message: "Por favor, completa todos los campos." }
  }

  // Aquí podrías integrar un servicio de correo o Base de datos.
  console.log("Contacto recibido:", { name, email, message })

  return { ok: true, message: "¡Gracias! Te responderemos muy pronto." }
}
