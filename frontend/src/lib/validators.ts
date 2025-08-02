export function isValidUrl(url: string): boolean {
  const pattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

  return pattern.test(url.trim());
}
