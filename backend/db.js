const Pool=require('pg').Pool;

const pool=new Pool({
    user:'postgres',
    password:'9513571949',
    host:'localhost',
    port:'5432',
    database:'school'
})
module.exports=pool;