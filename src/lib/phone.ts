export const UK_PHONE_ERROR = "Please enter a valid UK phone number, e.g. 07700 900000.";

/**
 * Length-only check for UK numbers. The forms show a fixed "+44" prefix, so
 * people type it any of the usual ways ("7700 900000", "07700 900000",
 * "+44 7700 900000") - strip the country code and trunk "0", then a valid UK
 * number is exactly 10 digits.
 */
export function isValidUkPhone(phone: string): boolean {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0044")) digits = digits.slice(4);
  else if (digits.startsWith("44")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.length === 10;
}
