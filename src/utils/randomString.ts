export function randomString(prefix: string) {
  const randomPart = Math.floor(Math.random() * Date.now()).toString(36);
  const randomString = prefix + '_' + randomPart.slice(0, 7);
  return randomString;
}