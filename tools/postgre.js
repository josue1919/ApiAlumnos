const {Pool}= require('pg');
require('dotenv').config();



// credenciales
const pool = new Pool ({

    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD_DB,
    database:process.env.DATABASE,
    port:process.env.PORT_DB,
    ssl:{

        rejectUnauthorized:false,
    }

});

module.exports=pool;