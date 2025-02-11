const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Ensure cookies are being received
        const token = req.cookies?.token;

        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({  // Change 200 to 401 (Unauthorized)
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("JWT Verification Error:", err);
                return res.status(403).json({  // 403 (Forbidden) if token is invalid
                    message: "Invalid Token!",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded Token:", decoded);

            req.userId = decoded?._id; // Ensure decoded contains _id

            next(); // Move to the next middleware
        });

    } catch (err) {
        res.status(500).json({ // 500 for server errors
            message: err.message || "Internal Server Error",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
