const query = require("../public/mysqlPool");
const getAllUser = async () => {
    const sql = "select * from user";
    const r = await query(sql);
    return r;
}


module.exports = {
    getAllUser
}