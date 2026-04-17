import dayjs from 'dayjs';

export const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);

export const formatNumber = value => new Intl.NumberFormat('en-US').format(value || 0);

export const formatDate = value => dayjs(value).format('MMM D, YYYY');

export const formatDateTime = value => dayjs(value).format('MMM D, YYYY h:mm A');

