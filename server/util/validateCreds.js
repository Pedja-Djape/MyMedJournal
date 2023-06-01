
function validateEmail(email) {
    return email.includes('@');
}

function validatePassword(password) {
    return password.length > 7;
}

function validateCredentials(email, password) {
    let errors = {}
    if (!validateEmail(email)){ 
        errors.email = "Invalid email!";
    }

    if (!validatePassword(password)) {
        errors.password = "Invalid password!";
    }
    return errors
}

module.exports = {
    validateCredentials
}
