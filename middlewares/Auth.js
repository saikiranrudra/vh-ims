
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY || "vh-ims";

const authMiddleaware = (req, res, next) => {
    jwt.verify(req.body.token, privateKey, (err, decode) => {
        if(err) {
            res.status(401).json({
                status: "failure",
                error: "unauthorised access"
            })
            return;
        }
        next();
    })
}
module.exports = authMiddleaware;