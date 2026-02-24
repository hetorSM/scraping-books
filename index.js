/**
 * Punto de entrada principal del proyecto de scraping.
 * Orquesta la extracción de datos de libros.
 */

const { BASE_URL, CATEGORY_URL, CATEGORY_NAME, BOOKS_LIMIT } = require('./src/config');
const { fetchPage, parseBooks } = require('./src/scraper');

/**
 * Función principal que ejecuta todo el proceso de scraping.
 */
async function main() {
    console.log('=== Scraping de Libros - books.toscrape.com ===\n');

    // --- Paso 1: Extraer los primeros 20 libros de la página principal ---
    console.log(`📖 Extrayendo los primeros ${BOOKS_LIMIT} libros de la página principal...`);
    const mainPageHtml = await fetchPage(BASE_URL);
    const mainBooks = parseBooks(mainPageHtml, BOOKS_LIMIT);
    console.log(`✅ Se extrajeron ${mainBooks.length} libros de la página principal.\n`);

    // Mostrar los libros extraídos
    mainBooks.forEach((book, index) => {
        console.log(`  ${index + 1}. ${book.titulo}`);
        console.log(`     Precio: ${book.precio}€ | Estrellas: ${'⭐'.repeat(book.calificacion)} (${book.calificacion}) | En stock: ${book.disponibilidad ? 'Sí' : 'No'}`);
    });

    // --- Paso 2: Extraer 20 libros de la categoría específica (Mystery) ---
    console.log(`\n📖 Extrayendo ${BOOKS_LIMIT} libros de la categoría "${CATEGORY_NAME}"...`);
    const categoryPageHtml = await fetchPage(CATEGORY_URL);
    const categoryBooks = parseBooks(categoryPageHtml, BOOKS_LIMIT);
    console.log(`✅ Se extrajeron ${categoryBooks.length} libros de la categoría "${CATEGORY_NAME}".\n`);

    // Mostrar los libros de la categoría
    categoryBooks.forEach((book, index) => {
        console.log(`  ${index + 1}. ${book.titulo}`);
        console.log(`     Precio: ${book.precio}€ | Estrellas: ${'⭐'.repeat(book.calificacion)} (${book.calificacion}) | En stock: ${book.disponibilidad ? 'Sí' : 'No'}`);
    });

    // Resumen final
    console.log(`\n📊 Resumen: ${mainBooks.length} libros de la página principal + ${categoryBooks.length} libros de "${CATEGORY_NAME}" = ${mainBooks.length + categoryBooks.length} libros en total.`);
}

// Ejecutar la función principal
main();
