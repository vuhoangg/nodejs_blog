// const connection = require('../config/database.js');
const jwt = require('jsonwebtoken');


class Authorize {
    // Middleware check role 
    authorize(permissions) {
        return (req, res, next) => {
            // const token = req.cookies.token; // get token from cookie
            const authHeader = req.headers.authorization;
            console.log('get token', authHeader)

            // console.log(permissions)

            if (!authHeader) {
                return res.status(401).json({
                    message: 'Không có token, vui lòng đăng nhập'
                });
            }
            const token = authHeader.split(' ')[1];
            console.log('cookie là :', token)
            jwt.verify(token, 'SECRET_KEY', (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Token không hợp lệ'
                    });
                }
                //Kiểm tra phân quyền
                console.log(user.permission)
                if (!permissions.includes(user.permission)) {
                    return res.status(403).json({
                        message: 'Không có quyền truy cập'
                    });
                }

                // user.permission
                req.user = user

                console.log('User in authorize middleware:', req.user);
                next();
            })

        };
    }
}
module.exports = new Authorize();