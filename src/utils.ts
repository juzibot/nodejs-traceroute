export function parseRttStr(rttStr: string) {
  let ms = -1
  const regex = /([\d.]+)/
  const parsedData = new RegExp(regex, '').exec(rttStr)
  if (parsedData) {
    ms = parseFloat(parsedData[1])
  }
  return ms
}
