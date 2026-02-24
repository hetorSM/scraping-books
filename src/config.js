/**
 * Archivo de configuración del proyecto de scraping.
 * Contiene las constantes y configuraciones necesarias.
 */

// URL base del sitio web a scrapear
const BASE_URL = 'http://books.toscrape.com/';

// URL de la categoría específica (Mystery)
const CATEGORY_URL = 'http://books.toscrape.com/catalogue/category/books/mystery_3/index.html';

// Nombre de la categoría elegida
const CATEGORY_NAME = 'Mystery';

// Cantidad de libros a extraer por sección
const BOOKS_LIMIT = 20;

// Mapa para convertir texto de estrellas a números
const STAR_RATINGS = {
  'One': 1,
  'Two': 2,
  'Three': 3,
  'Four': 4,
  'Five': 5
};

module.exports = {
  BASE_URL,
  CATEGORY_URL,
  CATEGORY_NAME,
  BOOKS_LIMIT,
  STAR_RATINGS
};
