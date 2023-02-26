const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    // getting the token from the header
    const accessTokenn = await req.header("token");

    // console.log(accessTokenn);

    if (!accessTokenn) return res.status(401).json({ msg: "Access Denied" });

    try {
        const validToken = jwt.verify(accessTokenn, process.env.JWT_SECRET);
        if (validToken) {
            next();
        }
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token" });
        console.log(err);
    }
};

module.exports = validateToken;
