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
    // TODO: Implementar la lógica de scraping en los siguientes pasos
    console.log('Proyecto inicializado correctamente.');
    console.log(`URL base: ${BASE_URL}`);
    console.log(`Categoría seleccionada: ${CATEGORY_NAME}`);
    console.log(`Libros a extraer por sección: ${BOOKS_LIMIT}`);
}

// Ejecutar la función principal
main();
