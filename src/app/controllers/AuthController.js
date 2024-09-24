const connection = require('../../config/database.js');
const jwt = require('jsonwebtoken');

class AuthController {
    // API Login 
    login(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        console.log('Email ', email);
        console.log('password ', password);

        // This is used to check email and pass have been sent 
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email và mật khẩu là bắt buộc'
            });
        }
        // query SQL user 
        connection.query(
            'SELECT * FROM account WHERE email = ? AND password = ?',
            [email, password],
            (err, results) => {
                if (err) {
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        message: 'Email hoặc mật khẩu không đúng'
                    });
                }
                const user = results[0];
                console.log('permission', user.Permission)
                // create token JWT with information user
                const token = jwt.sign({
                    id: user.id,
                    name: user.Name,
                    email: user.email,
                    permission: user.Permission // put role in token
                }, 'SECRET_KEY', {
                    expiresIn: '1h'
                });

                // save token in cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 3600000,
                    secure: false,
                    sameSite: 'Lax'
                });

                return res.status(200).json({
                    message: 'Đăng nhập thành công',
                    token: token,
                    // permission: user.Permission
                });
            }
        );
    }
}

module.exports = new AuthController();