# hinspire-back

# Plataforma de Creación Colaborativa de Historias (Backend)

Este proyecto es una plataforma web que permite a los usuarios crear, colaborar y votar en historias de manera colaborativa. El backend está construido con Node.js, Express y MongoDB, y ofrece una API RESTful para gestionar usuarios, historias, fragmentos y votos.

## **Funcionalidades Principales**

### **Usuarios**
- Registro y autenticación (JWT).
- Edición y eliminación de perfiles.
- Roles: `user` y `admin`.

### **Historias**
- Crear, editar, eliminar y finalizar historias.
- Estado: `inProgress` o `completed`.
- Límite de 3 fragmentos pendientes por historia.

### **Fragmentos**
- Agregar, editar y eliminar fragmentos.
- Aceptar fragmentos pendientes (solo el autor de la historia).

### **Votación**
- Votar por fragmentos (un voto por usuario).
- Incrementar el contador de votos en fragmentos.

## **Tecnologías Utilizadas**
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Autenticación**: JWT (JSON Web Tokens).
- **Seguridad**: Bcrypt para encriptación de contraseñas.

## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```
### Instala las dependencias:

bash
Copy
npm install
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto.

### Agrega las siguientes variables:

env
Copy
MONGODB_URI=<tu-cadena-de-conexión-de-mongodb>
TOKEN_SECRET=<tu-clave-secreta-para-jwt>
PORT=<puerto-del-servidor>
Inicia el servidor:

bash
Copy
npm start
### Endpoints de la API
#### Autenticación
POST /auth/signup: Registro de usuarios.

POST /auth/login: Inicio de sesión.

GET /auth/verify: Verificación de token JWT.

#### Perfil
GET /profile: Obtener perfil del usuario.

PUT /profile: Editar perfil.

DELETE /profile: Eliminar perfil.

#### Historias
GET /stories: Obtener todas las historias.

GET /stories/:id: Obtener una historia específica.

POST /stories: Crear una nueva historia.

PUT /stories/:id: Editar una historia.

DELETE /stories/:id: Eliminar una historia.

GET /stories/user/:userId: Obtener historias de un usuario.

PUT /stories/:id/finish: Finalizar una historia.

#### Fragmentos
GET /fragments/story/:id: Obtener fragmentos de una historia.

POST /fragments/:id: Agregar un fragmento.

PUT /fragments/:id: Editar un fragmento.

DELETE /fragments/:id: Eliminar un fragmento.

POST /stories/:storyId/fragments/:fragmentId/accept: Aceptar un fragmento.

#### Votación
GET /votes: Obtener votos de un usuario.

POST /votes/:fragmentId: Agregar un voto.

DELETE /votes/:fragmentId: Eliminar un voto.

#### Contribución
¡Las contribuciones son bienvenidas! Si deseas mejorar el proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad).

Haz commit de tus cambios (git commit -m 'Añade nueva funcionalidad').

Haz push a la rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.

Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

url backend: https://hinspire-back.onrender.com
