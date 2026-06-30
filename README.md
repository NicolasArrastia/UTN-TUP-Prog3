# 🍔 Food Store

Sistema de gestión de pedidos de comida desarrollado como Trabajo Final de **Programación III** de la **Tecnicatura Universitaria en Programación (UTN)**.

El proyecto está dividido en dos aplicaciones independientes:

- **Frontend Web** desarrollado con TypeScript y Vite.
- **Backend** desarrollado en Java utilizando JPA, Hibernate y H2.

Durante la primera etapa, el frontend consume archivos JSON mediante `fetch()`. Su arquitectura fue diseñada para que posteriormente sea posible reemplazar esos archivos por una API REST sin modificar la lógica de la interfaz.

---

# Tecnologías

## Frontend

- TypeScript
- Vite
- HTML5
- CSS3
- Tailwind CSS
- LocalStorage

## Backend

- Java
- Gradle
- JPA
- Hibernate
- H2 Database

---

# Funcionalidades

## Cliente

- Inicio de sesión
- Registro
- Catálogo de productos
- Búsqueda en tiempo real
- Filtrado por categorías
- Ordenamiento
- Detalle de producto
- Carrito persistente mediante LocalStorage
- Checkout
- Historial de pedidos

## Administrador

- Dashboard con estadísticas
- CRUD de categorías
- CRUD de productos
- Gestión de pedidos
- Cambio de estado de pedidos

---

# Estructura del proyecto

```
FoodStore/
│
├── frontend/
│
└── backend/
```

---

# Frontend

## Tecnologías

- TypeScript
- Vite
- Tailwind CSS

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm run dev
```

## Build

```bash
npm run build
```

---

# Arquitectura

El frontend fue organizado por páginas y módulos independientes.

```
src
│
├── assets
├── components
├── constants
├── data
├── pages
│
├── services
├── types
├── utils
└── validators
```

La aplicación utiliza una capa de servicios para aislar el acceso a los datos.

Actualmente los datos provienen desde:

```
public/data/

categorias.json
productos.json
usuarios.json
pedidos.json
```

Cuando exista el backend REST únicamente será necesario modificar las URLs utilizadas por los servicios.

---

# Autenticación

La autenticación es únicamente educativa.

El login:

- obtiene los usuarios desde `usuarios.json`
- compara email y contraseña
- guarda la sesión en LocalStorage
- redirecciona según el rol

No utiliza:

- JWT
- Cookies
- OAuth
- Encriptación de contraseñas

---

# Roles

## ADMIN

Puede:

- acceder al panel administrativo
- administrar categorías
- administrar productos
- administrar pedidos
- visualizar estadísticas

## USUARIO

Puede:

- navegar el catálogo
- agregar productos al carrito
- realizar pedidos
- consultar su historial

---

# Carrito

El carrito se almacena en **LocalStorage**, por lo que permanece disponible aunque se recargue la página.

Incluye:

- agregar productos
- modificar cantidades
- eliminar productos
- vaciar carrito
- cálculo automático de subtotal
- costo de envío
- total

---

# Envío

Para esta primera iteración el costo de envío se encuentra definido como una constante del frontend.

```
ENVIO = $0
```

El total del pedido se calcula como:

```
Total = Subtotal + Envío
```

---

# Persistencia del Frontend

En esta etapa únicamente persisten:

- sesión del usuario
- carrito

Las operaciones CRUD de administración se realizan únicamente en memoria.

Al actualizar la página se recuperan nuevamente los datos originales desde los archivos JSON.

---

# Credenciales de prueba

## Administrador

```
Email:
(admin@example.com)

Contraseña:
********
```

## Usuario

```
Email:
(usuario@example.com)

Contraseña:
********
```

> Reemplazar estas credenciales por las existentes en `public/data/usuarios.json`.

---

# Backend

## Tecnologías

- Java
- Gradle
- Hibernate
- JPA
- H2

---

## Ejecutar

Desde la carpeta del backend:

```bash
./gradlew run
```

o

```bash
gradlew run
```

---

## Base de datos

Se utiliza una base H2 en modo archivo.

```
jdbc:h2:file:./data/jpa_db
```

El esquema es administrado automáticamente por Hibernate.

---

# Modelo

El sistema está compuesto por las siguientes entidades:

- Categoria
- Producto
- Usuario
- Pedido
- DetallePedido

Además incluye:

- Base
- Calculable

---

# Funcionalidades del backend

- CRUD Categorías
- CRUD Productos
- CRUD Usuarios
- Gestión de Pedidos
- Soft Delete
- Consultas JPQL
- Reportes
- Menú de consola

---

# Reportes

Se implementan consultas para:

- Productos por categoría
- Pedidos por usuario
- Pedidos por estado
- Total facturado

---

# Características técnicas

- Repositorio genérico (`BaseRepository<T>`)
- Soft Delete
- EntityManager por operación
- Rollback automático ante errores
- Alta de pedidos mediante una única transacción
- Uso de Optional
- Consultas JPQL tipadas

---

# Estado del proyecto

✔ Frontend completamente funcional utilizando archivos JSON.

✔ Arquitectura preparada para reemplazar `fetch()` por una API REST.

✔ Backend desarrollado con JPA/Hibernate y base H2.

---

# Autor

**Nicolás**
Trabajo Final — Programación III

Tecnicatura Universitaria en Programación

Universidad Tecnológica Nacional
