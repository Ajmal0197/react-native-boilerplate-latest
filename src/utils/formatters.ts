import dayjs from '@services/dayjs';

/**
 * Format currency with locale sensitivity
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date string (e.g., "Nov 17, 2026")
 */
export const formatDate = (date: string | Date, format = 'll'): string => {
  return dayjs(date).format(format);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatTimeAgo = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
