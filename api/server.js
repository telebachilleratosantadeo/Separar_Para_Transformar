const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();

// ==========================
// 🔥 MIDDLEWARES
// ==========================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let db;

// ==========================
// 🔗 CONEXIÓN SQLITE Y CREACIÓN DE TABLAS
// ==========================
(async () => {
    try {
        db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        });

        // Crear tablas exactamente con tus columnas de MySQL
        await db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT, apellidos TEXT, usuario TEXT, email TEXT, 
                telefono TEXT, password TEXT, curp TEXT UNIQUE, rol TEXT, foto BLOB
            );
            CREATE TABLE IF NOT EXISTS residuos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nombre TEXT
            );
            CREATE TABLE IF NOT EXISTS reciclaje (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                residuo_id INTEGER, cantidad REAL, usuario_id INTEGER,
                otro_material TEXT, foto BLOB, fecha DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS enlaces (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                titulo TEXT, url TEXT
            );
            CREATE TABLE IF NOT EXISTS alertas (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                mensaje TEXT, fecha DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS ubicaciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nombre TEXT, lat REAL, lng REAL
            );
        `);

        // Insertar ubicación por defecto si no existe
        const ubicacionExists = await db.get('SELECT COUNT(*) as count FROM ubicaciones');
        if (ubicacionExists.count === 0) {
            await db.run(`INSERT INTO ubicaciones (nombre, lat, lng) VALUES ('Centro de Reciclaje', 19.4326, -99.1332)`);
            console.log("📍 Ubicación por defecto creada");
        }

        // Insertar residuos por defecto
        const residuosExists = await db.get('SELECT COUNT(*) as count FROM residuos');
        if (residuosExists.count === 0) {
            await db.run(`INSERT INTO residuos (nombre) VALUES 
                ('Plástico'), ('Papel'), ('Vidrio'), ('Metal'), ('Orgánico'), ('Electrónico')`);
            console.log("♻️ Residuos por defecto creados");
        }

        // Usuario de prueba para que puedas entrar ya mismo
        await db.run(`INSERT OR IGNORE INTO usuarios (nombre, curp, password, rol) VALUES ('Admin', '123', '123', 'admin')`);

        console.log("✅ SQLite Conectado. La base de datos está en 'database.db'");
        
        // ==========================
        // 🚀 INICIAR SERVIDOR SOLO DESPUÉS DE CONECTAR DB
        // ==========================
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
            console.log(`📌 Endpoints disponibles:`);
            console.log(`   POST   /login`);
            console.log(`   POST   /register`);
            console.log(`   POST   /reciclaje`);
            console.log(`   GET    /enlaces`);
            console.log(`   GET    /usuario/:id`);
            console.log(`   PUT    /usuario/:id`);
            console.log(`   GET    /alertas`);
            console.log(`   GET    /reciclajes/:usuario_id`);
            console.log(`   GET    /estadisticas/:usuario_id`);
            console.log(`   GET    /ubicacion`);
            console.log(`   PUT    /ubicacion/:id`);
            console.log(`   GET    /admin/usuarios`);
            console.log(`   GET    /residuos`);
        });
        
    } catch (err) {
        console.error("❌ Error crítico al conectar con SQLite:", err.message);
        process.exit(1);
    }
})();

// ==========================
// 🔐 LOGIN
// ==========================
app.post('/login', async (req, res) => {
    const { curp, password } = req.body;
    try {
        const row = await db.get('SELECT * FROM usuarios WHERE curp = ? AND password = ?', [curp, password]);
        if (row) {
            if (row.foto) row.foto = Buffer.from(row.foto).toString('base64');
            res.json({ success: true, usuario: row });
        } else {
            res.status(401).json({ success: false, mensaje: 'CURP o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ success: false, mensaje: 'Error en login' });
    }
});

// ==========================
// 👤 REGISTRO
// ==========================
app.post('/register', async (req, res) => {
    const { nombre, apellidos, usuario, email, password, curp, rol, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.run(
            'INSERT INTO usuarios (nombre, apellidos, usuario, email, password, curp, rol, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, usuario, email, password, curp, rol, fotoBuffer]
        );
        res.json({ success: true, mensaje: 'Usuario registrado' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ success: false, mensaje: 'Error al registrar usuario' });
    }
});

// ==========================
// ♻️ TAB1: RECICLAJE
// ==========================
app.post('/reciclaje', async (req, res) => {
    const { residuo_id, cantidad, usuario_id, otro_material, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.run(
            'INSERT INTO reciclaje (residuo_id, cantidad, usuario_id, otro_material, foto) VALUES (?, ?, ?, ?, ?)',
            [residuo_id || null, cantidad, usuario_id, otro_material || null, fotoBuffer]
        );
        res.json({ success: true, mensaje: 'Reciclaje guardado' });
    } catch (err) {
        console.error('Error al guardar reciclaje:', err);
        res.status(500).json({ success: false, mensaje: 'Error al guardar reciclaje' });
    }
});

// ==========================
// 📚 TAB2: ENLACES
// ==========================
app.get('/enlaces', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM enlaces ORDER BY id DESC');
        res.json(rows);
    } catch (err) { 
        console.error('Error en /enlaces:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// 📝 AGREGAR ENLACE (Admin)
// ==========================
app.post('/enlaces', async (req, res) => {
    const { titulo, url, rol } = req.body;
    
    if (rol !== 'admin') {
        return res.status(403).json({ success: false, mensaje: 'Solo el admin puede agregar enlaces' });
    }

    try {
        await db.run('INSERT INTO enlaces (titulo, url) VALUES (?, ?)', [titulo, url]);
        res.json({ success: true, mensaje: 'Enlace agregado correctamente' });
    } catch (err) {
        console.error('Error al agregar enlace:', err);
        res.status(500).json({ success: false, mensaje: 'Error al agregar enlace' });
    }
});

// ==========================
// 👤 TAB5: PERFIL (GET)
// ==========================
app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const row = await db.get('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (row) {
            if (row.foto) row.foto = Buffer.from(row.foto).toString('base64');
            res.json(row);
        } else {
            res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
        }
    } catch (err) { 
        console.error('Error en /usuario/:id:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// ✏️ TAB5: ACTUALIZAR USUARIO (PUT)
// ==========================
app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, email, telefono, password, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        const result = await db.run(
            'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, telefono = ?, password = ?, foto = ? WHERE id = ?',
            [nombre, apellidos, email, telefono, password, fotoBuffer, id]
        );
        if (result.changes > 0) {
            const row = await db.get('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (row.foto) row.foto = Buffer.from(row.foto).toString('base64');
            res.json({ success: true, mensaje: 'Usuario actualizado', usuario: row });
        } else {
            res.status(404).json({ success: false, mensaje: 'No encontrado' });
        }
    } catch (err) { 
        console.error('Error en PUT /usuario/:id:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// 🚨 TAB4: ALERTAS
// ==========================
app.get('/alertas', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM alertas ORDER BY id DESC');
        res.json(rows);
    } catch (err) { 
        console.error('Error en /alertas:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// 📝 AGREGAR ALERTA (Admin)
// ==========================
app.post('/alertas', async (req, res) => {
    const { mensaje, rol } = req.body;
    
    if (rol !== 'admin') {
        return res.status(403).json({ success: false, mensaje: 'Solo el admin puede agregar alertas' });
    }

    try {
        await db.run('INSERT INTO alertas (mensaje) VALUES (?)', [mensaje]);
        res.json({ success: true, mensaje: 'Alerta agregada correctamente' });
    } catch (err) {
        console.error('Error al agregar alerta:', err);
        res.status(500).json({ success: false, mensaje: 'Error al agregar alerta' });
    }
});

// ==========================
// 📊 TAB5: RECICLAJES (HISTORIAL)
// ==========================
app.get('/reciclajes/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const rows = await db.all('SELECT * FROM reciclaje WHERE usuario_id = ? ORDER BY fecha DESC', [usuario_id]);
        const registros = rows.map(r => ({
            ...r,
            foto: r.foto ? Buffer.from(r.foto).toString('base64') : null
        }));
        res.json(registros);
    } catch (err) { 
        console.error('Error en /reciclajes/:usuario_id:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// 📊 TAB5: ESTADÍSTICAS
// ==========================
app.get('/estadisticas/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const rows = await db.all(
            `SELECT COALESCE(r.nombre, rec.otro_material) AS material, SUM(rec.cantidad) AS total
             FROM reciclaje rec LEFT JOIN residuos r ON rec.residuo_id = r.id
             WHERE rec.usuario_id = ? GROUP BY material`,
            [usuario_id]
        );
        res.json(rows);
    } catch (err) { 
        console.error('Error en /estadisticas/:usuario_id:', err);
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================
// 📍 UBICACIÓN GLOBAL (GET)
// ==========================
app.get('/ubicacion', async (req, res) => {
    try {
        const row = await db.get('SELECT * FROM ubicaciones LIMIT 1');
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ success: false, mensaje: 'No hay ubicación registrada' });
        }
    } catch (err) {
        console.error('Error en /ubicacion:', err);
        res.status(500).json({ success: false, mensaje: 'Error al obtener ubicación' });
    }
});

// ==========================
// ✏️ ACTUALIZAR UBICACIÓN (PUT - Solo admin)
// ==========================
app.put('/ubicacion/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, lat, lng, rol } = req.body;
    
    if (rol !== 'admin') {
        return res.status(403).json({ success: false, mensaje: 'Solo el admin puede modificar ubicaciones' });
    }

    try {
        const result = await db.run(
            'UPDATE ubicaciones SET nombre = ?, lat = ?, lng = ? WHERE id = ?',
            [nombre, lat, lng, id]
        );
        
        if (result.changes > 0) {
            res.json({ success: true, mensaje: 'Ubicación actualizada correctamente' });
        } else {
            res.status(404).json({ success: false, mensaje: 'Ubicación no encontrada' });
        }
    } catch (err) {
        console.error('Error al actualizar ubicación:', err);
        res.status(500).json({ success: false, mensaje: 'Error al actualizar ubicación' });
    }
});

// ==========================
// 👑 ADMIN: OBTENER TODOS LOS USUARIOS
// ==========================
app.get('/admin/usuarios', async (req, res) => {
    try {
        const rows = await db.all('SELECT id, nombre, apellidos, usuario, email, telefono, curp, rol, foto FROM usuarios');
        const usuarios = rows.map(u => ({
            ...u,
            foto: u.foto ? Buffer.from(u.foto).toString('base64') : null
        }));
        res.json(usuarios);
    } catch (err) {
        console.error('Error en /admin/usuarios:', err);
        res.status(500).json({ success: false, mensaje: 'Error al obtener usuarios' });
    }
});

// ==========================
// ♻️ OBTENER LISTA DE RESIDUOS
// ==========================
app.get('/residuos', async (req, res) => {
    try {
        const rows = await db.all('SELECT * FROM residuos ORDER BY id');
        res.json(rows);
    } catch (err) {
        console.error('Error en /residuos:', err);
        res.status(500).json({ success: false, mensaje: 'Error al obtener residuos' });
    }
});

// ==========================
// 📊 ESTADÍSTICAS GLOBALES (Admin)
// ==========================
app.get('/admin/estadisticas', async (req, res) => {
    try {
        const totalUsuarios = await db.get('SELECT COUNT(*) as total FROM usuarios');
        const totalReciclajes = await db.get('SELECT COUNT(*) as total FROM reciclaje');
        const totalCantidad = await db.get('SELECT SUM(cantidad) as total FROM reciclaje');
        const reciclajesPorMaterial = await db.all(`
            SELECT COALESCE(r.nombre, rec.otro_material) AS material, SUM(rec.cantidad) AS total
            FROM reciclaje rec LEFT JOIN residuos r ON rec.residuo_id = r.id
            GROUP BY material
        `);
        
        res.json({
            total_usuarios: totalUsuarios.total,
            total_reciclajes: totalReciclajes.total,
            total_kilos: totalCantidad.total || 0,
            reciclajes_por_material: reciclajesPorMaterial
        });
    } catch (err) {
        console.error('Error en /admin/estadisticas:', err);
        res.status(500).json({ success: false, mensaje: 'Error al obtener estadísticas globales' });
    }
});

app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({ 
        success: false, 
        mensaje: 'Error interno del servidor',
        error: err.message 
    });
});