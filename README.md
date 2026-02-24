# 📚 Scraping Books

Script en JavaScript/Node.js que extrae datos de libros desde [books.toscrape.com](http://books.toscrape.com/) utilizando **Axios** y **Cheerio**.

## 📋 ¿Qué hace este proyecto?

Este script accede a la web de pruebas [books.toscrape.com](http://books.toscrape.com/) y extrae la información de **40 libros**:

- **20 libros** de la **página principal** del catálogo.
- **20 libros** de la categoría **Mystery** (Misterio).

### Datos extraídos de cada libro

| Campo            | Descripción                                                       | Ejemplo              |
|------------------|-------------------------------------------------------------------|----------------------|
| `titulo`         | Título completo del libro                                         | `"Sharp Objects"`    |
| `precio`         | Precio numérico (sin símbolo de moneda)                           | `47.82`              |
| `disponibilidad` | Booleano: `true` si está en stock, `false` si no                  | `true`               |
| `calificacion`   | Calificación en estrellas convertida a número (1-5)               | `4`                  |

Los resultados se guardan automáticamente en el archivo **`libros_extraidos.json`**.

---

## 🛠️ Requisitos previos

Antes de empezar necesitas tener instalado:

- **Node.js** (versión 14 o superior) → [Descargar aquí](https://nodejs.org/es)
- **npm** (viene incluido con Node.js)

### ¿Cómo comprobar si ya los tienes instalados?

Abre una terminal (CMD, PowerShell, o la terminal de tu sistema) y escribe:

```bash
node --version
```

Debería mostrar algo como `v18.17.0` o superior.

```bash
npm --version
```

Debería mostrar algo como `9.6.7` o superior.

> Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/es), instálalo y reinicia la terminal.

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

Abre una terminal y ejecuta:

```bash
git clone https://github.com/hetorSM/scraping-books.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd scraping-books
```

### 3. Instalar las dependencias

```bash
npm install
```

Este comando descarga todas las librerías necesarias (Axios y Cheerio) automáticamente. Verás que se crea una carpeta `node_modules/` con las dependencias.

---

## ▶️ Cómo ejecutar el script

Una vez instaladas las dependencias, ejecuta el script con:

```bash
npm start
```

O directamente con Node.js:

```bash
node index.js
```

### ¿Qué sucede cuando lo ejecutas?

1. El script accede a la página principal de [books.toscrape.com](http://books.toscrape.com/).
2. Extrae los **primeros 20 libros** con su título, precio, disponibilidad y calificación.
3. Luego accede a la categoría **Mystery** y extrae **otros 20 libros**.
4. Guarda todos los datos en el archivo **`libros_extraidos.json`**.
5. Muestra un resumen en la terminal.

### Ejemplo de salida en la terminal

```
=== Scraping de Libros - books.toscrape.com ===

📖 Extrayendo los primeros 20 libros de la página principal...
✅ Se extrajeron 20 libros de la página principal.

  1. A Light in the Attic
     Precio: 51.77€ | Estrellas: ⭐⭐⭐ (3) | En stock: Sí
  2. Tipping the Velvet
     Precio: 53.74€ | Estrellas: ⭐ (1) | En stock: Sí
  ...

📖 Extrayendo 20 libros de la categoría "Mystery"...
✅ Se extrajeron 20 libros de la categoría "Mystery".

  1. Sharp Objects
     Precio: 47.82€ | Estrellas: ⭐⭐⭐⭐ (4) | En stock: Sí
  ...

💾 Datos guardados en: libros_extraidos.json
📊 Resumen: 20 + 20 = 40 libros en total.
```

---

## 📁 Estructura del proyecto

```
scraping-books/
├── src/
│   ├── config.js          # Configuración: URLs, constantes y mapa de estrellas
│   └── scraper.js         # Funciones de scraping: fetchPage(), parseBooks(), etc.
├── index.js               # Punto de entrada principal del script
├── libros_extraidos.json   # Archivo generado con los datos extraídos
├── package.json           # Dependencias y scripts del proyecto
├── .gitignore             # Archivos excluidos de git (node_modules/)
└── README.md              # Este archivo
```

---

## 📦 Dependencias utilizadas

| Paquete    | Descripción                                               |
|------------|-----------------------------------------------------------|
| **axios**  | Librería para hacer peticiones HTTP (descargar páginas)    |
| **cheerio**| Librería para parsear HTML y extraer datos (como jQuery)   |
| **nodemon**| *(Desarrollo)* Reinicia el script automáticamente al guardar cambios |

---

## 📄 Ejemplo de `libros_extraidos.json`

```json
{
  "pagina_principal": [
    {
      "titulo": "A Light in the Attic",
      "precio": 51.77,
      "disponibilidad": true,
      "calificacion": 3
    },
    {
      "titulo": "Tipping the Velvet",
      "precio": 53.74,
      "disponibilidad": true,
      "calificacion": 1
    }
  ],
  "categoria_mystery": [
    {
      "titulo": "Sharp Objects",
      "precio": 47.82,
      "disponibilidad": true,
      "calificacion": 4
    }
  ],
  "total_libros": 40,
  "fecha_extraccion": "2026-02-24T08:50:00.000Z"
}
```

---

## 🧰 Modo desarrollo (opcional)

Si quieres que el script se reinicie automáticamente cada vez que guardes cambios:

```bash
npm run dev
```

Esto usa **nodemon** para detectar cambios y reiniciar el script sin necesidad de ejecutarlo manualmente cada vez.
