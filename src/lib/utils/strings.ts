interface PasswordOptions {
  length?: number;
  withUppercase?: boolean;
  withLowercase?: boolean;
  withDigit?: boolean;
  withUnderscore?: boolean;
}

function createRandomIndex(max = 24) {
  for (;;) {
    const arr = new Uint8Array(1);
    const num = self.crypto.getRandomValues(arr)[0];
    if (num <= max) return num;
  }
}

function createAuthName(username: string, length = 25) {
  return `${username}.${createPassword({
    length,
    withUnderscore: false,
  })}`;
}

function createPassword({
  length = 50,
  withUppercase = true,
  withLowercase = true,
  withDigit = true,
  withUnderscore = true,
}: PasswordOptions) {
  let characters = "";
  if (withUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (withLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
  if (withDigit) characters += "0123456789";
  if (withUnderscore) characters += "_";

  const contains = (arr: string[], regex: RegExp, minCount: number) =>
    arr.filter((e) => e.match(regex)).length > minCount;

  const hasUppercase = (arr: string[], minCount: number) =>
    contains(arr, /[A-Z]/, minCount);
  const hasLowercase = (arr: string[], minCount: number) =>
    contains(arr, /[a-z]/, minCount);
  const hasDigit = (arr: string[], minCount: number) =>
    contains(arr, /[0-9]/, minCount);
  const hasUnderscore = (arr: string[], minCount: number) =>
    contains(arr, /_/, minCount);

  for (;;) {
    const result = Array.from(
      { length },
      () => characters[createRandomIndex(characters.length - 1)]
    );

    // Check that all required character classes are present
    // See: https://wiki.pbi.online/passwortrichtlinie/
    if (withUnderscore && !hasUnderscore(result, 1)) continue;
    if (withDigit && !hasDigit(result, 2)) continue;
    if (withLowercase && !hasLowercase(result, 2)) continue;
    if (withUppercase && !hasUppercase(result, 1)) continue;

    return result.join("");
  }
}

export { createAuthName, createPassword };
