const jwtConfig = {
    secret: 'mysecret',
    expiresIn: "15m",
}

const refreshJwtConfig = {
    secret: 'mysecret',
    expiresIn: "7d",
}

module.exports = { jwtConfig, refreshJwtConfig }