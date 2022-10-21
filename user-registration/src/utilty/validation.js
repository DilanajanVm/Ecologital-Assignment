
export const mobileNumberInputValidation = (value,withdialcode,condition) => {
    let reg =  new RegExp('^\\+[0-9]*$|^[0-9]*$');
    return {
        numberInputValidation:reg.test(value),
        mobileNumberValidation:newMobileNumberValidation(withdialcode.substr(1).replace(/\s/g, ""), condition)
    };
}

export const newMobileNumberValidation = (number, condition) => {
    let result = condition;
    if (!result) {
        let reg = new RegExp("^(9474)[0-9]{7}$");
        result = reg.test(number)
    }
    return result;
};
