const express = require('express');
const cors = require('cors');
const db = require('./database'); 

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = 3000;
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

app.post('/reciclaje', async (req, res) => {
    const { residuo_id, cantidad, usuario_id, otro_material, foto, recolector_id } = req.body;
    try {
        const fotoBuffer = foto ? Buffer.from(foto, 'base64') : null;
        await db.query(
            'INSERT INTO reciclaje (residuo_id, cantidad, usuario_id, otro_material, foto, recolector_id) VALUES (?, ?, ?, ?, ?, ?)',
            [residuo_id || null, cantidad, usuario_id, otro_material || null, fotoBuffer, recolector_id || null]
        );
        res.json({ success: true, mensaje: 'Reciclaje guardado' });
    } catch (err) {
        console.error('Error al guardar reciclaje:', err);
        res.status(500).json({ success: false, mensaje: 'Error al guardar' });
    }
});
app.get('/estadisticas/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const query = `
        SELECT m.nombre as material, SUM(r.cantidad) as total 
        FROM reciclaje r 
        JOIN residuos m ON r.residuo_id = m.id 
        WHERE r.usuario_id = ? AND r.estado = 'aprobado' 
        GROUP BY m.nombre`;

    try {
        const [rows] = await db.query(query, [usuario_id]);
        res.json(rows);
    } catch (err) {
        console.error("❌ Error en estadísticas individuales:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/admin/estadisticas-globales', async (req, res) => {
    const query = `
        SELECT m.nombre as material, SUM(r.cantidad) as total 
        FROM reciclaje r 
        JOIN residuos m ON r.residuo_id = m.id 
        WHERE r.estado = 'aprobado' 
        GROUP BY m.nombre`;
    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error("Error en globales:", err); 
        res.status(500).json({ error: err.message });
    }
});

app.get('/impacto-total/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const [rows] = await db.query('SELECT SUM(cantidad) as total FROM reciclaje WHERE usuario_id = ?', [usuario_id]);
        res.json({ total: rows[0].total || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//perfil usuario
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
app.get('/residuos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM residuos ORDER BY id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
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

//historial de reciclajes de un usuario
app.get('/reciclajes/:usuario_id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM reciclaje WHERE usuario_id = ? ORDER BY fecha DESC', 
            [req.params.usuario_id]
        );
        const registros = rows.map(r => ({
            ...r,
            foto: r.foto ? Buffer.from(r.foto).toString('base64') : null
        }));
        res.json(registros);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

app.get('/admin/pendientes', async (req, res) => {
    const query = `
        SELECT 
            r.id, 
            u.nombre AS alumno_nombre,
            u.usuario,
            u.id AS usuario_id,
            COALESCE(res.nombre, r.otro_material, 'Otro material') AS material, 
            r.residuo_id,
            r.otro_material,
            r.cantidad, 
            r.foto, 
            r.fecha,
            r.estado
        FROM reciclaje r
        JOIN usuarios u ON r.usuario_id = u.id
        LEFT JOIN residuos res ON r.residuo_id = res.id
        WHERE r.estado = 'pendiente'
        ORDER BY r.fecha DESC
    `;
    
    try {
        const [rows] = await db.query(query);
        const registros = rows.map(r => ({
            ...r,
            foto: r.foto ? Buffer.from(r.foto).toString('base64') : null
        }));
        console.log('📋 Pendientes encontrados:', registros.length);
        res.json(registros);
    } catch (err) {
        console.error('Error al obtener pendientes:', err);
        res.status(500).json({ error: err.message });
    }
});
app.put('/admin/validar/:id', async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; 

    try {
        await db.query('UPDATE reciclaje SET estado = ? WHERE id = ?', [estado, id]);
        res.json({ success: true, mensaje: `Registro ${estado} con éxito` });
    } catch (err) {
        console.error('Error al validar:', err);
        res.status(500).json({ error: err.message });
    }
});
app.put('/admin/asignar-recolector/:reciclaje_id', async (req, res) => {
    const { reciclaje_id } = req.params;
    const { recolector_id } = req.body;
    
    try {
        await db.query(
            'UPDATE reciclaje SET recolector_id = ? WHERE id = ?', 
            [recolector_id, reciclaje_id]
        );
        res.json({ success: true, mensaje: 'Recolector asignado correctamente' });
    } catch (err) {
        console.error('Error al asignar recolector:', err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor MySQL corriendo en http://localhost:${PORT}`);
});