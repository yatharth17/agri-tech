const authMiddleware = (req, res, next) => {
    // Add code to check for valid auth
    next()
}

exports.authMiddleware = authMiddleware