const mysql = require('mysql2');

// Configuramos la conexión con los datos de tu captura de Workbench
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // 🚨 Pon aquí tu contraseña de MySQL (si no tienes, déjalo vacío '')
    database: 'reciclaje_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos la conexión para usarla en el servidor
module.exports = pool.promise();