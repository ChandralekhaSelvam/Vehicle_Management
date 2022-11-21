const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const emailValidator = (value: string = '') => value?.match(emailRegex);

export const isNumber = (value: number) => isNaN(value) ? "Enter a valid year" : undefined
