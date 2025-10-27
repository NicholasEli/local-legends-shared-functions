/**
 * Creates aribtrary wait time based on miliseconds
 * @param { int } milliseconds
 * @return { promise } resolves once time has been reached
 **/
export const async_timeout = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random number between a minimum and maximum value.
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @param {boolean} wholenum - If true, returns a whole integer; otherwise, returns a floating-point number.
 * @returns {number} A random number between min and max.
 */
export const randomInt = function (min, max, wholenum) {
	if (wholenum) return Math.floor(Math.random() * (max - min + 1) + min);
	return Math.random() * (max - min + 1) + min;
};

/**
 * Converts a string into a URL-friendly handle.
 * Removes special characters, converts to lowercase, and replaces spaces with hyphens.
 * @param {string} str - The input string to be handleized.
 * @returns {string} A lowercase, hyphen-separated string safe for use in URLs or identifiers.
 */
export const handleize = function (str) {
	if (!str) return '';

	return str
		.toLowerCase()
		.replace(/[^\w\u00C0-\u024f]+/g, '-')
		.replace(/^-+|-+$/g, '');
};

/**
 * Validates whether a string is a properly formatted email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export const is_valid_email = function (email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

/**
 * Converts a hex color code into an RGBA color string.
 * Supports both 3- and 6-character hex formats and optional opacity.
 * @param {string} hex - The hex color code (with or without the leading '#').
 * @param {number} [opacity=1] - The opacity value (0 to 1).
 * @returns {string} The color represented as an RGBA string.
 */
export const hex_to_rgb = function (hex, opacity = 1) {
	// Remove '#' if present
	hex = hex.replace('#', '');

	// Expand shorthand (#RGB → #RRGGBB)
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('');
	}

	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Removes empty or whitespace-only <p> tags from an HTML string.
 * Useful for cleaning up rich text markup from CMS or user input.
 * @param {string} str - The HTML string to clean.
 * @returns {string} The cleaned HTML string without empty paragraph tags.
 */
export const clean_markup = function (str) {
	if (!str) return '';

	return str.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');
};
