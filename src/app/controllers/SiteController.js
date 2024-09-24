const connection = require('../../config/database.js') // inport database 
class SiteController {
    // Get [] /Homes
    index(req, res) {
        res.render('home');
    }
    postCreate(req, res) {
        console.log('req body >> ', req.body)
        let id = req.body.id_tk;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let permission = req.body.permission;
        let pass = req.body.password;
        let repass = req.body.repassword;
        console.log('req body >> ', id, name, email, phone, permission, pass, repass);
        // res.send('create user new');
        connection.query(
            `INSERT INTO account VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, name, email, phone, permission, pass, repass],
            function (err, results) {
                console.log(results);
                res.send('create user success');
            }
        );
    }

    showUser(req, res) {
        let page = parseInt(req.query.page) || 1; // get parameter 'page' to query string, default value is 1 .
        let limit = 5; // Defines the number of elements on a page 
        let offset = (page - 1) * limit; // Position of the next element 
        let keyword = req.query.keyword; // Get search keywords form query string 
        let query = `SELECT * FROM account`; // initialize the query statement and parameter array
        let whereConditions = []; // initialize the condition array 
        let queryParams = []; // initialze the paramenter array 

        // Add search conditions by keywords if any 
        if (keyword) {
            whereConditions.push(`name LIKE ?`);
            queryParams.push(`%${keyword}%`);
        }
        // Combine this condition if any 
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        // Add pagination to the query statement 
        query += ` LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);
        console.log(query); // diplay query statement to check  
        //  Execute query statement SQL with parameter 
        connection.query(query, queryParams, function (err, results, fields) {
            if (err) {
                return res.status(500).json({
                    error: 'Database error',
                    details: err.message
                });
            }
            return res.status(200).json({
                results
            });
        });
    }


    createUser(req, res) {
        console.log('req body >> ', req.body)
        let id
        // = req.body.id_tk;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let permission = req.body.permission;
        let pass = req.body.password;
        let repass = req.body.repassword;

        connection.query(
            `INSERT INTO account VALUES ( ?,?, ?, ?, ?, ?, ?)`,
            [id, name, email, phone, permission, pass, repass],
            function (err, results, fields) {
                // console.log(results);
                // res.send('create user success');
                if (err) {
                    return res.status(500).json({
                        error: 'Database error'
                    });
                }
                return res.status(200).json({
                    messager: 'create account',
                    ketqua: results
                })
            }
        );
    }


    // API(delete)
    deleteUser(req, res) {
        //let id = req.body.id;
        // let id = req.query.id;
        let id = req.params.id;
        connection.query(
            `DELETE FROM account WHERE id = ?`,
            [id],
            function (err, results, fields) {
                if (err) {
                    console.error('Database error:', err); // Log error detail 
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }
                return res.status(200).json({
                    message: 'Delete user success',
                    result: results
                });
            }
        );
    }


    // API  (update)
    updateUser(req, res) {
        let id = req.params.id;
        // let id = req.user.id;
        console.log('user id ', id);

        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let permission = req.body.permission;
        let pass = req.body.password;
        let repass = req.body.repassword;

        connection.query(
            `UPDATE account SET name = ?, email = ?, phone = ?, permission = ?, password = ?, repassword = ? WHERE id = ?`,
            [name, email, phone, permission, pass, repass, id],
            function (err, results, fields) {
                if (err) {
                    return res.status(500).json({
                        error: 'Database error'
                    });
                }
                return res.status(200).json({
                    message: 'Update user success',
                    result: results
                });
            }
        );
    }


    // API get infomation of use by id 
    getUserById(req, res) {
        let id = req.params.id; // get ID from params of request

        connection.query(
            'SELECT * FROM account WHERE id = ?', // qurey SQL get information by  ID
            [id],
            function (err, results, fields) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }
                if (results.length === 0) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                return res.status(200).json({
                    message: 'Get user success',
                    results: results[0] // returns only the user object 
                });
            }
        );
    }
    // API get infomation of me 
    getMe(req, res) {
        let id = req.user.id;

        connection.query(
            'SELECT * FROM account WHERE id = ?',
            [id],
            function (err, results, fields) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }
                if (results.length === 0) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                return res.status(200).json({
                    message: 'Get user success',
                    results: results[0]
                });
            }
        );
    }

    searchUser(req, res) {
        // Lấy giá trị tìm kiếm từ req.body
        let {
            name = '', limit = 10, offset = 0
        } = req.body; // default limit = 10 and offset = 0 if on value

        // intialize query statement SQL with condition search keywords 
        let sql = 'SELECT * FROM account WHERE name LIKE ? LIMIT ? OFFSET ?';
        // intialize paramenter array
        let params = [`%${name}%`, Number(limit), Number(offset)];

        // Execute query SQL 
        connection.query(sql, params, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    error: 'Database error',
                    details: err.message
                });
            }
            res.status(200).json({
                message: 'Search user success',
                results
            });
        });
    }
}
module.exports = new SiteController;