export const INVALID_EMAIL_ERROR = "Please enter a valid email address.";

/** Needs something@something.tld - stricter than just containing an "@", but still permissive. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}
