const OTPStorage = new Map(); // Using a simple in-memory storage. Use Redis or database for production.

async function save(key, otp) {
    OTPStorage.set(key, otp);
    setTimeout(() => OTPStorage.delete(key), 5 * 60 * 1000); // expiry time 5 minutes
}

async function verify(key, otp) {
    const storedOtp = OTPStorage.get(key);
    return storedOtp === otp;
}

module.exports = {
    save,
    verify
};