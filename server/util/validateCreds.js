
function validateEmail(email) {
    return email.includes('@');
}

function validatePassword(password) {
    return password.length > 7;
}

module.exports = {
    validateEmail,
    validatePassword
}
