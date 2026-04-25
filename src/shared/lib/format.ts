export const formatFullName = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`.trim();

export const formatLocation = (city?: string, country?: string): string => {
  const parts = [city, country].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
};

export const formatPhone = (phone: string | undefined): string => phone?.trim() ?? '—';

export const initialsOf = (firstName: string, lastName: string): string =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
