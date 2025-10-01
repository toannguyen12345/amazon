/**
 * Utility functions for currency formatting
 */

/**
 * Format number as USD currency
 * @param value - The number to format
 * @returns Formatted USD string (e.g., "$123.45")
 */
export const formatUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format number as VND currency
 * @param value - The number to format
 * @returns Formatted VND string (e.g., "123.456 ₫")
 */
export const formatVND = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format number as currency with custom options
 * @param value - The number to format
 * @param currency - Currency code (e.g., 'USD', 'VND', 'EUR')
 * @param locale - Locale string (e.g., 'en-US', 'vi-VN')
 * @param maximumFractionDigits - Maximum decimal places
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  currency: string,
  locale: string = 'en-US',
  maximumFractionDigits: number = 2
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(value);
};
