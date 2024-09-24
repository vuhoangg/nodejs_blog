const connection = require('../../config/database.js')
const jwt = require('jsonwebtoken');

class SpendingController {

    // Get [] /news
    showSpending(req, res) {

        console.log("req user", req.user)
        let page = req.query.page || 1; // get parameter  'page' from  query string
        let limit = 8; // Define the number element a page 
        let offset = (page - 1) * limit;
        let keyword = req.query.keyword;
        let dateCreate = req.query.dateCreate;
        let voter = req.query.voter;
        let status = req.query.status;
        let sortOrder = req.query.sortOrder;
        let query = `SELECT * FROM tbl_spending `; // initalize query statement and condition array 
        let whereConditions = []; // initialize the condition array
        let queryParams = []; // initialize the parameter array 
        if (keyword) {
            whereConditions.push(`dateCreate LIKE ?`);
            queryParams.push(`%${keyword}%`);
        }
        if (dateCreate) {
            whereConditions.push(`dateCreate LIKE ?`);
            queryParams.push(`%${dateCreate}%`);
        }
        if (voter) {
            whereConditions.push(`voter LIKE ?`);
            queryParams.push(`%${voter}%`);
        }
        if (status) {
            whereConditions.push(`status LIKE ?`);
            queryParams.push(`%${status}%`);
        }
        //  combine condition WHERE if only 
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        if (sortOrder) {
            query += ` ORDER BY ${sortOrder} `;
            // sorOrder = dateCreate ASC (sort by dateCreate asceding )
            // sorOrder = valueCreate DESC (sort by value desceding )

        }

        // Add pagination to the  query  
        query += ` LIMIT ? OFFSET ? `;
        queryParams.push(limit, offset);

        console.log(query); // display query statement to check 

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
    // api show all 
    showSpendingAll(req, res) {
        connection.query(
            'SELECT * FROM tbl_spending',
            function (err, results, fields) {
                if (err) {
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }
                return res.status(200).json({
                    results
                });
            }
        );
    }

    // Api create spending
    createSpendingShow(req, res) {
        console.log('req body >> ', req.body)
        let id
        // = req.body.id_tk;
        let dateCreate = req.body.dateCreate;
        let voter = req.body.voter;
        let approver = req.body.approver;
        let value = req.body.value;
        let money_Source = req.body.money_Source;
        let branch = req.body.branch;
        let address = req.body.address;
        let taxCode = req.body.taxCode;
        let status = req.body.status;

        connection.query(
            `INSERT INTO tbl_spending VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, dateCreate, voter, value, approver, money_Source, branch, address, taxCode, status],
            function (err, results, fields) {

                if (err) {
                    console.error('Lỗi khi thêm dữ liệu:', err);
                    return res.status(500).json({
                        message: 'Lỗi khi thêm dữ liệu',
                        error: err
                    });
                }
                console.log('kết quả >>> ', results);
                // res.send('create user success');
                return res.status(200).json({
                    messager: 'create spending',
                    ketqua: results
                })
            }
        );

    }


    // API (delete)
    deleteSpending(req, res) {
        //let id = req.body.id;
        // let id = req.query.id;
        let id = req.params.id;


        connection.query(
            `DELETE FROM tbl_spending WHERE id = ?`,
            [id],
            function (err, results, fields) {
                if (err) {
                    console.error('Database error:', err); // Log chi tiết lỗi
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
    // Api update of  speding by id 
    updateSpending(req, res) {
        let id = req.params.id;
        let dateCreate = req.body.dateCreate;
        let voter = req.body.voter;
        let approver = req.body.approver;
        let value = req.body.value;
        let money_Source = req.body.money_Source;
        let branch = req.body.branch;
        let address = req.body.address;
        let taxCode = req.body.taxCode;
        let status = req.body.status;
        connection.query(
            `UPDATE tbl_spending SET dateCreate = ?, voter = ?, approver = ?, value = ?, money_Source = ?, branch = ?,address = ?, taxCode = ?,status = ? WHERE id = ?`,
            [dateCreate, voter, approver, value, money_Source, branch, address, taxCode, status, id],
            function (err, results, fields) {
                if (err) {
                    return res.status(500).json({
                        error: 'Database error'
                    });
                }
                return res.status(200).json({
                    message: 'Update spending success',
                    result: results
                });
            }
        );
    }
    // Api update status 
    updateStatus(req, res) {
        let id = req.params.id; // get ID from params ofrevquest
        let status = req.body.status; // get new status from body of request
        console.log("req user", req.user)
        let approver = req.user.name;
        console.log('get approver :', approver);
        connection.query(
            'UPDATE tbl_spending SET status = ?, approver = ?  WHERE id = ?', // query  SQL to update status 
            [status, approver, id],
            function (err, results, fields) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({
                        error: 'Database error',
                        details: err.message
                    });
                }

                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'Spending not found'
                    });
                }

                return res.status(200).json({
                    message: 'Update status success',
                    result: results
                });
            }
        );
    }


    // API get information of spending by id  
    getSpendingById(req, res) {
        let id = req.params.id;

        connection.query(
            'SELECT * FROM tbl_spending WHERE id = ?',
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
                    results: results[0] //  returns only a spending object 
                });
            }
        );
    }
    index(req, res) {
        // res.send('Haha');
        res.render('news');
    }

}
module.exports = new SpendingController;