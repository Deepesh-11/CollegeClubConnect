// const con = require('../connection')
// const bodyParser = require('body-parser')


// module.exports.getUserCredential= async (req, res)=>{
//     const email = req.params.email
//     const password = req.params.password
    const rows = await con.query("Select * from users where uname=? and upassword=?",[email,password])
//     return rows
    
// }