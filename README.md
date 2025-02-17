# Administrador de Proyectos y Tareas - Backend

Este es el backend del Administrador de Proyectos y Tareas, desarrollado con el stack **MERM** (MongoDB, Express, React, Node.js) y TypeScript.

## 🚀 Tecnologías utilizadas

- **Node.js** - Entorno de ejecución para JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** (usando Mongoose) - Base de datos NoSQL
- **TypeScript** - Tipado estático para JavaScript
- **JWT (JSON Web Tokens)** - Autenticación segura
- **Nodemailer** - Envío de emails para verificación
- **Dotenv** - Gestión de variables de entorno

---

## 📦 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Mati69lbt/uptask_backend.git
cd uptask_backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y agrega lo siguiente:

```bash
DATABASE_URL=mongodb+srv://tu_usuario:tu_contraseña@cluster0.mongodb.net/uptask_merm
FRONTEND_URL=http://localhost:5173

# Configuración de Nodemailer (debes obtener estas credenciales registrándote en Mailtrap u otro proveedor SMTP)
SMPT_HOST=sandbox.smtp.mailtrap.io
SMPT_PORT=2525
SMPT_USER=tu_usuario_smtp
SMPT_PASS=tu_contraseña_smtp

JWT_SECRET=palabraSecreta
```

### 4️⃣ Ejecución del Servidor

Para iniciar el backend en **modo desarrollo**, usa:

```bash
npm run dev
```

### 5️⃣ Base de Datos

- **MongoDB** es la base de datos utilizada en este proyecto.
- La conexión se realiza mediante **Mongoose**.
- Funciona en **modo local** usando MongoDB Compass.


### 📄 Más información: [Visita mi sitio web](https://mdelgado.netlify.app/home)

