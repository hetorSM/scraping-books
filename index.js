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
}

// Ejecutar la función principal
main();
