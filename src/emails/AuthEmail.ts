import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "UpTask <admin@prueba.com>",
      to: user.email,
      subject: "UpTask - Confirma tu cuenta",
      text: "UpTask - Confirma tu cuenta",
      html: `<p>Hola ${user.name}, creaste una cuenta en UpTask, confirma tu cuenta</p>
      <p>Visita el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
      <p>Ingresa el código: <b>${user.token}</b></p>
      <p>este token expira en 10 minutos</p>
      `,
    });
    
  };
  static sendPasswordResetToken = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "UpTask <admin@prueba.com>",
      to: user.email,
      subject: "UpTask - Restablecer Contraseña",
      text: "UpTask - Restablecer Contraseña",
      html: `<p>Hola ${user.name}, ¿Solicitaste una nueva contraseña?</p>
      <p>Visita el siguiente enlace</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Password</a>
      <p>Ingresa el código: <b>${user.token}</b></p>
      <p>Este token expira en 10 minutos</p>
      `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
  };
}
