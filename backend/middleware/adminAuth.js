
import jwt from 'jsonwebtoken'

export const adminAuth = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];


    if (!token) {
        return res.json({ success: false, message: 'Not authorized, please login again' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not authorized, please login again' });
        }

        next();
    } catch (error) {
        console.error(error)
        return res.json({ success: false, message: 'Not authorized, please login again' });
    }
}