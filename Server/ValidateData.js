const validateName = (name) =>
{
    if (name.trim() === '') {
        return false;
    }
    return true;
};

const validateMobile = (mobile) =>
{
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
        return false;
    }
    return true;
};

const validateEmail = (email) =>
{
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
        return false;
    }
    return true;
};

function Validation(data)
{
    if (validateName(data.name) && validateMobile(data.mobile) && validateEmail(data.email))
    {
        return true;
    }
    return false;
}

module.exports =Validation;