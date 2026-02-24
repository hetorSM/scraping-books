# Guía de Creación e Instalación desde Cero (Scraping Books)

Esta guía explica **paso a paso** cómo se construyó este proyecto desde cero, qué hace cada archivo y para qué sirve cada librería. Está pensada para que cualquier persona novata pueda entender la lógica detrás del código.

---

## 1. ¿Qué es el Web Scraping?

El **Web Scraping** es una técnica que consiste en utilizar un programa informático (script) para extraer datos de sitios web de forma automatizada. En lugar de copiar y pegar a mano la información de 40 libros, escribimos un código que navega por la web, lee el código del sitio (HTML) y saca justo lo que necesitamos (título, precio, etc.).

---

## 2. Herramientas y Librerías Utilizadas

Para este proyecto en JavaScript (Node.js) se instalaron tres herramientas principales:

1. **Node.js**: Es el entorno que nos permite ejecutar código JavaScript fuera de un navegador web (directamente en la consola de tu ordenador).
2. **Axios** (`npm install axios`): Es una librería que usamos para descargar páginas de internet. Básicamente, le damos una URL (ej: *http://books.toscrape.com*) y Axios nos devuelve todo el código HTML de esa página, como si le diéramos a "Ver código fuente" en el navegador.
3. **Cheerio** (`npm install cheerio`): Una vez que Axios nos da el HTML (que es un texto enorme y difícil de leer), Cheerio nos permite buscar dentro de ese HTML de forma fácil. Nos deja hacer cosas como: *"Oye Cheerio, búscame todos los elementos que tengan la clase 'price_color' y dame su texto"*.

*(Nota: También usamos `nodemon` para que el script se reinicie solo mientras programábamos, sin tener que escribir `node index.js` cada vez).*

---

## 3. ¿Cómo se construyó el proyecto paso a paso?

Si quisieras repetir este proyecto tú mismo en una carpeta vacía, estos serían los pasos exactos:

### Paso 1: Iniciar el proyecto
Abrimos una terminal, creamos una carpeta y le decimos a Node.js que queremos empezar un proyecto nuevo:
```bash
mkdir scraping-books
cd scraping-books
npm init -y
```
Esto crea el primer archivo: **`package.json`**. Este archivo es como el "DNI" del proyecto, guarda el nombre, la versión y qué librerías vamos a usar.

### Paso 2: Instalar las librerías
```bash
npm install axios cheerio
```
Al hacer esto, se descarga una carpeta gigante llamada **`node_modules/`** donde se guarda el código de Axios y Cheerio. También se crea **`package-lock.json`**, que es un registro exacto de las versiones que se descargaron.

### Paso 3: Ignorar archivos pesados en Git
Como `node_modules/` es muy pesada y se genera automáticamente, no queremos subirla a GitHub. Para evitarlo, creamos un archivo llamado **`.gitignore`** y escribimos dentro: `node_modules/`.

---

## 4. Estructura de Archivos Construida

Para que el código no fuera un desastre en un solo archivo, lo dividimos en tres partes lógicas. Aquí tienes la explicación de cada una:

### 📁 `src/config.js` (Las Constantes)
**¿Para qué sirve?**
Aquí guardamos cosas que no cambian (constantes), como las direcciones web (URLs) que vamos a scrapear, o la cantidad de libros que queremos (20).
También guardamos un "mapa" para traducir las estrellas. En la web, las estrellas vienen como texto ("Three", "One"), pero nosotros las queremos como números (3, 1). Aquí está esa traducción.

### 📁 `src/scraper.js` (El Motor de Scraping)
**¿Para qué sirve?**
Este es el archivo más técnico. Contiene funciones especializadas:
* `fetchPage(url)`: Usa Axios para descargar el HTML.
* `parsePrice(texto)`: Limpia el texto del precio. Si recibe "£51.77", le quita la libra y devuelve un número real `51.77`.
* `parseBooks(html, limite)`: Usa Cheerio. Lee el HTML y busca cajas de artículos (`<article class="product_pod">`). De cada caja, raspa el título, busca la clase del precio, la clase de las estrellas, etc. y empuja todo a una lista ordenada.

### 📄 `index.js` (El Director de Orquesta)
**¿Para qué sirve?**
Es el archivo principal que se ejecuta. Su trabajo es súper sencillo porque delega todo en los otros archivos:
1. Llama a `fetchPage()` pidiendo la página principal.
2. Le pasa ese código a `parseBooks()` para sacar 20 libros.
3. Repite el proceso (1 y 2) pero ahora para la categoría Mystery.
4. Junta todos los libros (40 en total).
5. Usa una librería que viene de fábrica en Node.js llamada **`fs`** (File System) para crear un archivo nuevo en tu ordenador llamado **`libros_extraidos.json`** y escribe ahí todos los datos.

---

## 5. El Formato Final: JSON

El script genera un archivo `libros_extraidos.json`. **JSON** (JavaScript Object Notation) es simplemente una forma estructurada de guardar datos para que tanto humanos como otros programas puedan leerlos fácilmente.
Se ve así:
```json
{
  "titulo": "A Light in the Attic",
  "precio": 51.77,
  "disponibilidad": true,
  "calificacion": 3
}
```
* **String (Texto):** `"A Light in the Attic"` (entre comillas).
* **Number (Número):** `51.77` o `3` (sin comillas).
* **Boolean (Verdadero/Falso):** `true` (para decir que sí hay stock).

---

## 6. Resumen del Flujo de Ejecución

Cuando en la terminal escribes `node index.js` (o `npm start`), esto es lo que ocurre en fracciones de segundo:

1. El `index.js` arranca.
2. Llama a Axios para descargar *books.toscrape.com*.
3. Axios se conecta a internet y baja un texto gigante de HTML.
4. Cheerio recibe ese HTML y busca las 20 etiquetas de libros.
5. De cada libro saca título, precio, stock y estrellas, y las limpia (quita símbolos de dinero o convierte letras a números).
6. Repite lo mismo para *books.toscrape.com/catalogue/category...*.
7. Junta los 40 libros.
8. Crea un archivo en tu disco duro (`libros_extraidos.json`) y pega la información ahí.
9. Imprime un mensaje en verde en la terminal diciendo que todo salió bien.

¡Y eso es todo el proyecto! Sencillo, modular, y cumpliendo exactamente con las reglas de extracción.
