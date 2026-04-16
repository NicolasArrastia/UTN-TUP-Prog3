# Food Store - Evaluación Programación III

## 📌 Descripción del proyecto

Aplicación frontend desarrollada con **HTML, CSS, JavaScript y TypeScript** que simula una tienda de comidas (Food Store).

Permite a los usuarios:

- Registrarse e iniciar sesión
- Visualizar un catálogo de productos
- Buscar productos por nombre
- Filtrar productos por categoría
- Agregar productos a un carrito
- Visualizar el carrito con cantidades y total

El carrito utiliza **localStorage** para persistir los datos.

---

## ⚙️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- TypeScript
- Vite
- pnpm

---

## ▶️ Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Instalar dependencias

```bash
pnpm install
```

> Si no tenés pnpm:

```bash
npm install -g pnpm
```

### 3. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

Abrir en el navegador:

```
http://localhost:5173
```

---

## 📂 Estructura principal

```
src/
├── pages/
│   ├── auth/
│   ├── admin/
│   └── store/
├── types/
├── utils/
├── data/
└── styles/
```

---

## ✅ Funcionalidades implementadas

- Autenticación básica con localStorage
- Protección de rutas por rol
- Renderizado dinámico de productos
- Búsqueda en tiempo real
- Filtrado por categorías
- Carrito con:
  - Persistencia
  - Manejo de cantidades
  - Eliminación de productos
  - Cálculo de total

---

## ⚠️ Notas

- No incluye backend (datos locales)
- Proyecto enfocado en lógica frontend y manipulación del DOM

---
