# 🎬 CineSi & PokeApp — Laboratorio Next.js

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)

> Laboratorio de Introducción a Next.js — Desarrollo de Aplicaciones Web Avanzado

---

## 📌 Descripción

Aplicación web desarrollada con **Next.js** que demuestra las diferencias entre
**Client-Side Rendering (CSR)** y **Server-Side Rendering (SSR)** mediante tres
módulos prácticos.

---

## 🚀 Módulos

### 🎮 PokeApp — CSR vs SSR
Dos páginas idénticas visualmente pero con diferente estrategia de renderizado.

| Ruta | Estrategia | Descripción |
|------|-----------|-------------|
| `/pokemon-csr` | CSR | Pokémon aleatorio cargado desde el navegador |
| `/pokemon-ssr` | SSR | Pokémon aleatorio cargado desde el servidor |

### ☁️ Dashboard del Clima
Dashboard híbrido que combina ambas estrategias.

| Ruta | Estrategia | Descripción |
|------|-----------|-------------|
| `/weather` | SSR + CSR | Lima en SSR, ciudades del mundo en CSR |

### 🎬 CineSi — Galería de Películas
Aplicación de películas y series usando la API de OMDb.

| Ruta | Estrategia | Descripción |
|------|-----------|-------------|
| `/movies` | SSR | Lista de películas populares |
| `/movies` | CSR | Búsqueda interactiva en tiempo real + modal de detalles |

---

## ⚡ CSR vs SSR — Comparación

| Característica | SSR | CSR |
|---------------|-----|-----|
| SEO | ✅ Excelente | ❌ Limitado |
| Carga inicial | ✅ Rápida | ⚠️ Más lenta |
| Interactividad | ⚠️ Recarga página | ✅ Dinámica |
| Carga del servidor | ❌ Alta | ✅ Baja |

---

## 🛠️ Tecnologías

- **Next.js 16** — Framework de React con App Router
- **TypeScript** — Tipado estático
- **Tailwind CSS** — Estilos utilitarios
- **Axios** — Peticiones HTTP
- **PokeAPI** — API de Pokémon
- **Open-Meteo API** — API del clima
- **OMDb API** — API de películas y series

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/my-first-project.git

# Entrar al proyecto
cd my-first-project

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del proyecto