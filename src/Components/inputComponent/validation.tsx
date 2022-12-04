//validate input not empty
export const validateNotEmptyInput = (input: string) => {   
  return input.length > 0 && validateSqlInjection(input) && validateXss(input);
}
//validate input not empty with spaces
export const validateNotEmptyInputWithSpaces = (input: string) => {
    return  input==="" && validateSqlInjection(input) && validateXss(input);
}
//validate number state not empty
export const validateNotEmptyNumber = (input: number) => {
    return input!==0;
}
//validate login not empty without special characters   
export const validateLogin = (login: string) => {
  const loginRegex = /^[a-zA-Z0-9]{3,}$/;
  return loginRegex.test(login) && validateSqlInjection(login) && validateXss(login);
}
//validate password not empty with at least one special charters and numbers minimum 8 characters
export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password) && validateSqlInjection(password) && validateXss(password);; 
}
//validate to check for sql injection
export const validateSqlInjection = (input: string) => {
    const sqlInjectionRegex = /[\s\(\)\'\;\-\=\%]/;
    return !sqlInjectionRegex.test(input);
}

export const validateEmail = (email: string) => {
  const emaailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emaailRegex.test(email) && validateSqlInjection(email) && validateXss(email);
}
export const validateZipCode = (zipCode: string) => {
    const zipCodeRegex = /^[0-9]{2}-[0-9]{3}/;
    return zipCodeRegex.test(zipCode);
}

//validate to check input for phone number
export const validatePhone = (phone: string) => {
    const phoneRegex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    return phoneRegex.test(phone) && validateSqlInjection(phone) && validateXss(phone);
}
//validate to check for xss
export const validateXss = (input: string) => {
    const xssRegex = /<[^>]*>?/g;
    return !xssRegex.test(input);
}


// //validate to check input for website
// export const validateWebsite = (website: string) => {
//     const websiteRegex = /^https?:\/\/\S+\.\S+$/;
//     return websiteRegex.test(website);
// }
// //Determining images files resolution without promise
// export const validateImagesResolution = (files: File[]) => {
//     let result = true;
//     files.forEach((file) => {
//         const img = new Image();
//         img.src = URL.createObjectURL(file);
//         img.onload = () => {
//             const width = img.naturalWidth;
//             const height = img.naturalHeight;
//             URL.revokeObjectURL(img.src);
//             if (width >= 100 && height >= 100 && width <= 1000 && height <= 1000) {
//                 result = true;
//             } else {
//                 result = false;
//             }
//         };
//     });
//     return result;
// }

// //Determining image file size
// export const validateMaxWeightFiles = (files: File[]) => {
//     const maxWeight = 5;
//     let valid = true;
//     files.forEach((file) => {
//         if (file.size / 1024 / 1024 > maxWeight) {
//             valid = false;
//         }
//     });
//     return valid;
// }
