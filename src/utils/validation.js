export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{1,10}$/.test(code); // alphanumeric max 10 chars
}

export function isValidExpiry(minutes) {
  return Number.isInteger(minutes) && minutes > 0;
}
