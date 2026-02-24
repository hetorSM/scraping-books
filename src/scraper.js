/**
 * Módulo principal de scraping.
 * Contiene las funciones para extraer datos de libros desde books.toscrape.com
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { STAR_RATINGS } = require('./config');

/**
 * Realiza una petición HTTP GET a la URL indicada y devuelve el HTML.
 * @param {string} url - La URL de la página a descargar.
 * @returns {string} El HTML de la página.
 */
async function fetchPage(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la página ${url}:`, error.message);
        throw error;
    }
}

/**
 * Convierte el texto de calificación en estrellas a un número entero.
 * Ejemplo: "Three" -> 3, "One" -> 1
 * @param {string} ratingText - El texto de la calificación (ej: "Three").
 * @returns {number} El número de estrellas.
 */
function parseStarRating(ratingText) {
    return STAR_RATINGS[ratingText] || 0;
}

/**
 * Extrae el precio numérico de un texto con formato "£51.77".
 * Elimina el símbolo de la moneda y devuelve solo el número.
 * @param {string} priceText - El texto del precio (ej: "£51.77").
 * @returns {number} El valor numérico del precio.
 */
function parsePrice(priceText) {
    // Eliminar todo lo que no sea número o punto decimal
    const numericPrice = priceText.replace(/[^0-9.]/g, '');
    return parseFloat(numericPrice);
}

/**
 * Determina si un libro está disponible en stock.
 * @param {string} availabilityText - El texto de disponibilidad.
 * @returns {boolean} true si está en stock, false si no.
 */
function parseAvailability(availabilityText) {
    return availabilityText.toLowerCase().includes('in stock');
}

/**
 * Parsea una página HTML y extrae los datos de los libros encontrados.
 * @param {string} html - El HTML de la página.
 * @param {number} limit - Número máximo de libros a extraer.
 * @returns {Array} Array de objetos con los datos de cada libro.
 */
function parseBooks(html, limit) {
    const $ = cheerio.load(html);
    const books = [];

    // Cada libro está dentro de un elemento <article class="product_pod">
    $('article.product_pod').each((index, element) => {
        if (books.length >= limit) return false; // Detener si ya tenemos suficientes

        // Extraer el título completo del atributo "title" del enlace
        const title = $(element).find('h3 a').attr('title');

        // Extraer el precio del texto
        const priceText = $(element).find('.price_color').text();
        const price = parsePrice(priceText);

        // Extraer la disponibilidad
        const availabilityText = $(element).find('.availability').text().trim();
        const availability = parseAvailability(availabilityText);

        // Extraer la calificación en estrellas desde la clase CSS
        // El elemento <p> tiene clases como "star-rating Three"
        const ratingElement = $(element).find('.star-rating');
        const ratingClass = ratingElement.attr('class'); // "star-rating Three"
        const ratingText = ratingClass ? ratingClass.replace('star-rating ', '') : '';
        const rating = parseStarRating(ratingText);

        books.push({
            titulo: title,
            precio: price,
            disponibilidad: availability,
            calificacion: rating
        });
    });

    return books;
}

module.exports = {
    fetchPage,
    parseBooks,
    parseStarRating,
    parsePrice,
    parseAvailability
};
