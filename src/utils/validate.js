/**
 * 判断是否是外部资源
 * @param {*} path
 * 
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
