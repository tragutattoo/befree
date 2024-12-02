const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreta-trocar')
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' })
    }
}