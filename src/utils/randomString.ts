export function randomString(prefix: string) {
  const randomString =
    prefix + '_' + Math.floor(Math.random() * Date.now()).toString(36);
  return randomString;
}
