export const bankCardValidator = value => {
  return /^([1-9]{1})(\d{12,19})$/.test(value)
}

export const specialCharactersValidator = value => {
  return !/[~#$%^&~#￥%&<>"{}\']/.test(value)
}

export const IDCardValidator = value => {
  const aa = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)
  console.log(aa)
  return aa
}

export const mobileValidator = value => {
  return /^1[3|4|5|7|8][0-9]{9}$/.test(value)
}

export const moneyValidator = value => {
  return /(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])*$)/.test(value)
}
