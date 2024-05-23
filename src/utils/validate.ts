/**
 * 判断url是否是http或https
 * @returns {Boolean}
 * @param url
 */
export const isHttp = (url: string): boolean => {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}
