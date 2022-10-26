export const validateEmail = (email: string) => {
  const emaailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emaailRegex.test(email);
}
//validate input not empty
export const validateNotEmptyInput = (input: string) => {   
  return input.length > 0 && validateSqlInjection(input);
}
//validate login not empty without special characters   
export const validateLogin = (login: string) => {
  const loginRegex = /^[a-zA-Z0-9]{3,}$/;
  return loginRegex.test(login) && validateSqlInjection(login);
}
//validate password not empty with at least one special charters and numbers minimum 8 characters
export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password) && validateSqlInjection(password);
}
//validate to check for sql injection
export const validateSqlInjection = (input: string) => {
    const sqlInjectionRegex = /[\s\(\)\'\;\-\=\%]/;
    return !sqlInjectionRegex.test(input);
}
