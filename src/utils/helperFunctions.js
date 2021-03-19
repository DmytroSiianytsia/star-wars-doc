export const toggleExistElemInArr = (arr, el) => {
  if (arr.includes(el)) {
    const idx = arr.findIndex((item) => item === el)
    arr.splice(idx, 1)
  } else {
    arr.push(el)
  }
}
