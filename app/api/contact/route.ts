import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(request: Request) {
  try {
    const { nombreApellido, email, consulta, mensaje } = await request.json();

    if (!nombreApellido || !email || !mensaje) {
      return NextResponse.json(
        { message: "Faltan campos requeridos." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nuevo contacto web: ${consulta || "Consulta General"}`,
      html: `
        <h2>Nuevo mensaje desde la web de Coldwell</h2>
        <p><strong>Nombre y Apellido:</strong> ${nombreApellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Motivo de Consulta:</strong> ${consulta || "No especificado"}</p>
        <hr>
        <h3>Mensaje:</h3>
        <p>${mensaje}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Correo enviado exitosamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { message: "Error al enviar el correo" },
      { status: 500 },
    );
  }
}
