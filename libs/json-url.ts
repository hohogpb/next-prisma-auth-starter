/**
 * 解码 uri 中的 json
 * @param encoded
 * @returns
 */
export function decodeJsonURIComponent(encoded: string) {
  try {
    return JSON.parse(decodeURIComponent(encoded));
  } catch (error) {
    console.error(error);
  }
  return {};
}

/**
 * 编码 json 到可以用的 uri
 * @param value
 * @returns
 */
export function encodeJsonURIComponent(value: object) {
  try {
    return encodeURIComponent(JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
  return "";
}
