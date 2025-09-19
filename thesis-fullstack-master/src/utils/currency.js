/**
 * Currency utility functions for Tanzanian Shilling (TSh)
 */

/**
 * Format amount with TSh currency symbol and proper number formatting
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'TSh 0';
  }
  return `TSh ${Number(amount).toLocaleString()}`;
};

/**
 * Format amount for input fields (without currency symbol)
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted number string
 */
export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }
  return Number(amount).toLocaleString();
};

/**
 * Parse formatted currency string back to number
 * @param {string} currencyString - The formatted currency string
 * @returns {number} - Parsed number
 */
export const parseCurrency = (currencyString) => {
  if (!currencyString) return 0;
  
  // Remove TSh prefix and any commas, then parse
  const cleanString = currencyString.replace(/TSh\s?|,/g, '');
  const parsed = parseFloat(cleanString);
  
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Get currency symbol
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = () => {
  return 'TSh';
};

/**
 * Get currency name
 * @returns {string} - Currency name
 */
export const getCurrencyName = () => {
  return 'Tanzanian Shilling';
};
