# Ecolecta - Reciclaje simplificado y recompensado 🌱

<div align="center">
  <h2>🚀 Ecolecta</h2>
  <p>Aplicación Next.js para recogida y reciclaje de residuos con sistema de recompensas.</p>
  <p>Creado con ❤️ en Cochabamba, Bolivia</p>

<!-- Aquí puedes agregar insignias de tu proyecto -->

</div>

## Acerca del Proyecto

Ecolecta es un proyecto destinado a la recogida de residuos donde los usuarios pueden registrarse para programar una recogida en su puerta. Además, a medida que reciclas, acumulas puntos que puedes usar para comprar productos dentro de la plataforma. Actualmente, este servicio está disponible solo en Cochabamba, Bolivia, pero tenemos planes de expansión a corto plazo.

## Características Técnicas

- ⚡️ Next.js 13
- ⚛️ React 18
- 💨 Tailwind CSS 3
- 💎 TypeScript

## Comenzando

### 1. Clona este repositorio

```bash
git clone https://github.com/ecolecta9/ecolecta.git
```

### 2. Instala las dependencias

Es recomendable usar **npm** para una correcta instalación de las dependencias.

```bash
npm install
```

### 3. Configura las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno

```bash
GOOGLE_MAPS_API_KEY = ""
MONGODB_URL = ""
NODE_ENV= "development"
SECRET_COOKIE_PASSWORD = "KTE2iWWSeoAA.PWEL4TyQ1rVcXiOZgPyiSsI1HuwcdCK" o "secret_password_40_string_lenght"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="sa-east-1"
AWS_BUCKET_NAME="nombre-bucket-aws-s3"
AWS_DOMAIN="nombre-bucket-aws-s3.s3.sa-east-1.amazonaws.com"
NEXT_PUBLIC_API_URL="http://localhost:3000" o "url.domain"
NEXT_PUBLIC_API_FACEBOOK = ""
```

Establece tus variables de entorno con los tutoriales facilitados en el punto 4.

### 4. PDF's con los tutoriales para la creacion de la base de datos y obtener API's

https://drive.google.com/drive/folders/1tWkEWMAjJGlp5Yog3Cu1DQtfXp87L6Qo?usp=sharing

### 5. Ejecuta el servidor de desarrollo

Puedes iniciar el servidor en modo produccion usando este comando:

```bash
npm run build

npm run start
```

o en modo desarrollo

```bash
npm run start

```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

### 6. Manual de usuario

https://docs.google.com/document/d/1MyeUYs9T20wTzfE6KOkT7bwNsexlW0NC/edit?usp=sharing&ouid=114009571013493255907&rtpof=true&sd=true

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

### 7. Cambia los valores por defecto

Hay algunos valores que debes cambiar, como el título, URLs, favicons, etc.

Busca todos los comentarios con !STARTERCONF y sigue las instrucciones.

No olvides cambiar el nombre del paquete en package.json

### 8. Convención para los mensajes de commit

Este proyecto utiliza [convencional commits](https://www.conventionalcommits.org/en/v1.0.0/), es obligatorio utilizarlo para hacer commits.
