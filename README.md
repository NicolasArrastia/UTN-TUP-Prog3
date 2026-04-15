# Proyecto: Protección de Rutas (Educativo)

## ✍️ Descripción

Este es un proyecto de demostración creado con fines educativos para ilustrar un mecanismo básico de protección de rutas en el lado del cliente (frontend) utilizando **Vite** y **TypeScript**.

El objetivo es mostrar cómo se puede restringir el acceso a ciertas páginas según el rol de un usuario (por ejemplo, `ADMIN` o `CLIENT`).

---

## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## ⚙️ ¿Cómo Funciona la Protección de Rutas?

El mecanismo es simple y se gestiona desde el código TypeScript en la carpeta `src/utils`:

1.  **Inicio de Sesión**: Cuando un usuario se "loguea", su información (incluido su rol) se guarda como un string JSON en `localStorage`.
2.  **Carga de Página Protegida**: Cada vez que se intenta cargar una página protegida (ej. la página de Administrador), se ejecuta un script de verificación (`checkAuhtUser` en `src/utils/auth.ts`).
3.  **Verificación**: El script comprueba:
    - Si existe un usuario en `localStorage`. Si no, redirige al login.
    - Si el rol del usuario guardado coincide con el rol requerido para acceder a esa página. Si no coincide, lo redirige a una página de acceso denegado o a su "home" correspondiente.
4.  **Cierre de Sesión (Logout)**: Al cerrar sesión, la información del usuario se elimina de `localStorage`.

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro)
│   │   └── client/           # Páginas solo para clientes
│   ├── types/                # Define las interfaces y tipos (IUser, Rol)
│   └── utils/                # Lógica reutilizable
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```
