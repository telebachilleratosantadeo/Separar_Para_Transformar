const express = require('express');
const cors = require('cors');
const db = require('./database'); // Tu conexión a MySQL

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = 3000;

// ==========================
// 🔐 LOGIN
// ==========================
app.post('/login', async (req, res) => {
    const { curp, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE curp = ? AND password = ?', [curp, password]);
        if (rows.length > 0) {
            const row = rows[0];
            if (row.foto) row.foto = Buffer.from(row.foto).toString('base64');
            res.json({ success: true, usuario: row });
        } else {
            res.status(401).json({ success: false, mensaje: 'CURP o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ success: false, mensaje: 'Error en el servidor' });
    }
});

// ==========================
// 👤 REGISTRO
// ==========================
app.post('/register', async (req, res) => {
    const { nombre, apellidos, usuario, email, password, curp, rol, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.query(
            'INSERT INTO usuarios (nombre, apellidos, usuario, email, password, curp, rol, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, usuario, email, password, curp, rol || 'usuario', fotoBuffer]
        );
        res.json({ success: true, mensaje: 'Usuario registrado' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ success: false, mensaje: 'Error al registrar' });
    }
});

// ==========================
// ♻️ RECICLAJE (TAB1)
// ==========================
app.post('/reciclaje', async (req, res) => {
    const { residuo_id, cantidad, usuario_id, otro_material, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.query(
            'INSERT INTO reciclaje (residuo_id, cantidad, usuario_id, otro_material, foto) VALUES (?, ?, ?, ?, ?)',
            [residuo_id || null, cantidad, usuario_id, otro_material || null, fotoBuffer]
        );
        res.json({ success: true, mensaje: 'Reciclaje guardado' });
    } catch (err) {
        console.error('Error al guardar reciclaje:', err);
        res.status(500).json({ success: false, mensaje: 'Error al guardar' });
    }
});

// ==========================
// 📊 ESTADÍSTICAS GLOBALES (ADMIN)
// ==========================
app.get('/admin/estadisticas-globales', async (req, res) => {
    const query = `
        SELECT r.nombre AS material, SUM(rec.cantidad) AS total 
        FROM reciclaje rec 
        JOIN residuos r ON rec.residuo_id = r.id 
        GROUP BY r.nombre`;
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('❌ Error en SQL Globales:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// 📊 ESTADÍSTICAS POR USUARIO
// ==========================
app.get('/estadisticas/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const query = `
        SELECT COALESCE(r.nombre, rec.otro_material, 'Otro') AS material, SUM(rec.cantidad) AS total
        FROM reciclaje rec 
        LEFT JOIN residuos r ON rec.residuo_id = r.id
        WHERE rec.usuario_id = ? 
        GROUP BY material`;
    try {
        const [rows] = await db.query(query, [usuario_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// 📊 IMPACTO TOTAL
// ==========================
app.get('/impacto-total/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const [rows] = await db.query('SELECT SUM(cantidad) as total FROM reciclaje WHERE usuario_id = ?', [usuario_id]);
        res.json({ total: rows[0].total || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// 👤 PERFIL DE USUARIO
// ==========================
app.get('/usuario/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            const row = rows[0];
            if (row.foto) row.foto = Buffer.from(row.foto).toString('base64');
            res.json(row);
        } else {
            res.status(404).json({ mensaje: 'No encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { nombre, apellidos, email, telefono, password, foto } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.query(
            'UPDATE usuarios SET nombre=?, apellidos=?, email=?, telefono=?, password=?, foto=? WHERE id=?',
            [nombre, apellidos, email, telefono, password, fotoBuffer, req.params.id]
        );
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        const user = rows[0];
        if (user.foto) user.foto = Buffer.from(user.foto).toString('base64');
        res.json({ success: true, usuario: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// ♻️ CATÁLOGO DE RESIDUOS
// ==========================
app.get('/residuos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM residuos ORDER BY id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// 📍 UBICACIÓN, ENLACES Y ALERTAS
// ==========================
app.get('/ubicacion', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM ubicaciones LIMIT 1');
        res.json(rows[0] || {});
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/enlaces', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM enlaces ORDER BY id DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/alertas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM alertas ORDER BY id DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================
// 📊 HISTORIAL DE RECICLAJES
// ==========================
app.get('/reciclajes/:usuario_id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reciclaje WHERE usuario_id = ? ORDER BY fecha DESC', [req.params.usuario_id]);
        const registros = rows.map(r => ({
            ...r,
            foto: r.foto ? Buffer.from(r.foto).toString('base64') : null
        }));
        res.json(registros);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Encendido del servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor MySQL corriendo en http://localhost:${PORT}`);
});