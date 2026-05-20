const express = require('express');
const cors = require('cors');
const db = require('./database'); 
const PDFDocument = require('pdfkit');
const app = express();
const path = require('path');
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
app.get('/estadisticas/:usuarioId', async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const query = `
            SELECT 
                CASE 
                    WHEN r.nombre IN ('Plástico', 'Vidrio', 'Papel', 'Orgánico') THEN r.nombre
                    ELSE 'Otro'
                END AS material, 
                SUM(rec.cantidad) AS total, 
                rec.usuario_id
            FROM reciclaje rec
            LEFT JOIN residuos r ON rec.residuo_id = r.id
            WHERE rec.usuario_id = ? 
              AND rec.estado = 'aprobado'
              AND MONTH(rec.fecha) = MONTH(CURRENT_DATE())
              AND YEAR(rec.fecha) = YEAR(CURRENT_DATE())
            GROUP BY 
                CASE 
                    WHEN r.nombre IN ('Plástico', 'Vidrio', 'Papel', 'Orgánico') THEN r.nombre
                    ELSE 'Otro'
                END, 
                rec.usuario_id
        `;
        const [rows] = await db.query(query, [usuarioId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener estadísticas mensuales" });
    }
});
app.get('/admin/estadisticas-globales', async (req, res) => {
    try {
        const query = `
            SELECT 
                CASE 
                    WHEN r.nombre IN ('Plástico', 'Vidrio', 'Papel', 'Orgánico') THEN r.nombre
                    ELSE 'Otro'
                END AS material, 
                SUM(rec.cantidad) AS total
            FROM reciclaje rec
            LEFT JOIN residuos r ON rec.residuo_id = r.id
            WHERE rec.estado = 'aprobado'
              AND MONTH(rec.fecha) = MONTH(CURRENT_DATE())
              AND YEAR(rec.fecha) = YEAR(CURRENT_DATE())
            GROUP BY 
                CASE 
                    WHEN r.nombre IN ('Plástico', 'Vidrio', 'Papel', 'Orgánico') THEN r.nombre
                    ELSE 'Otro'
                END
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error("❌ Error en globales:", err);
        res.status(500).json({ error: "Error al obtener globales mensuales" });
    }
});

app.get('/impacto-total/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const query = `
            SELECT SUM(cantidad) as total 
            FROM reciclaje 
            WHERE usuario_id = ? 
              AND estado = 'aprobado'
              AND MONTH(fecha) = MONTH(CURRENT_DATE())
              AND YEAR(fecha) = YEAR(CURRENT_DATE())
        `;
        const [rows] = await db.query(query, [usuario_id]);
        res.json({ total: rows[0].total || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
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

const { ChartJSNodeCanvas } = require('chartjs-node-canvas'); // 1. Importar al inicio del archivo
app.get('/admin/exportar-pdf', async (req, res) => {
    try {
        // --- 1. CONFIGURACIÓN DEL GENERADOR (Hacemos la gráfica un poco más ancha para las barras) ---
        const width = 450;
        const height = 250;
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Reporte_Detallado_Impacto.pdf');

        doc.pipe(res);

        // Logo del plantel
        const logoPath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'assets', 'TBCST.jpeg');
        try {
            doc.image(logoPath, 450, 40, { width: 100 });
        } catch (e) {
            console.error("No se pudo cargar el logo en el PDF:", e.message);
        }

        // Encabezado
        doc.fontSize(22).fillColor('#2ecc71').text('REPORTE DE IMPACTO AMBIENTAL', { align: 'left' });
        doc.moveDown(0.2);
        doc.fontSize(14).fillColor('#7f8c8d').text('Telebachillerato Comunitario "San Tadeo"', { align: 'left' });
        
        const fechaReporte = new Date().toLocaleDateString();
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#333').text(`Fecha de emisión: ${fechaReporte}`);
        doc.moveDown(1.5);

        // --- 2. CONSULTA DE DATOS ---
        const query = `
            SELECT 
                u.nombre AS alumno, 
                IFNULL(r.nombre, IFNULL(rec.otro_material, 'Otro')) AS material, 
                rec.cantidad, 
                rec.fecha
            FROM reciclaje rec
            JOIN usuarios u ON rec.usuario_id = u.id
            LEFT JOIN residuos r ON rec.residuo_id = r.id
            WHERE rec.estado = 'aprobado'
              AND MONTH(rec.fecha) = MONTH(CURRENT_DATE())
              AND YEAR(rec.fecha) = YEAR(CURRENT_DATE())
            ORDER BY rec.fecha DESC
        `;
        const [rows] = await db.query(query);

        // --- 3. AGRUPAR CANTIDADES PARA LAS BARRAS ---
        const mapeoColores = {
            'Plástico': '#f1c40f', // Amarillo
            'Vidrio': '#2ecc71',   // Verde
            'Papel': '#3498db',    // Azul
            'Orgánico': '#e67e22', // Naranja
            'Otro': '#95a5a6'      // Gris
        };

        const totalesPorMaterial = {
            'Plástico': 0,
            'Vidrio': 0,
            'Papel': 0,
            'Orgánico': 0,
            'Otro': 0
        };

        // Sumamos los kg reales
        rows.forEach(row => {
            const cat = ['Plástico', 'Vidrio', 'Papel', 'Orgánico'].includes(row.material) ? row.material : 'Otro';
            totalesPorMaterial[cat] += parseFloat(row.cantidad);
        });

        // Filtramos para mostrar en la gráfica solo los materiales que sí tengan algo reciclado (para que no salgan barras en 0)
        const labels = Object.keys(totalesPorMaterial).filter(key => totalesPorMaterial[key] > 0);
        const dataValores = labels.map(key => totalesPorMaterial[key]);
        const backgroundColors = labels.map(label => mapeoColores[label]);

        const totalReciclado = rows.reduce((sum, row) => sum + parseFloat(row.cantidad), 0);
        
        doc.fontSize(12).fillColor('#2c3e50').text(`Impacto Total Acumulado este mes: `, { continued: true });
        doc.fillColor('#2ecc71').text(`${totalReciclado.toFixed(2)} kg de residuos.`);
        doc.moveDown(1);

        // --- 4. RENDERIZAR GRÁFICA DE BARRAS EN MEMORIA ---
        if (labels.length > 0) {
            const configuration = {
                type: 'bar', // 📊 Cambiado a tipo barra
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kilogramos (kg)',
                        data: dataValores,
                        backgroundColor: backgroundColors,
                        borderWidth: 1,
                        borderColor: '#7f8c8d'
                    }]
                },
                options: {
                    responsive: false,
                    plugins: {
                        legend: { display: false } // Quitamos la leyenda de arriba porque cada barra tiene su nombre abajo
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Cantidad (kg)', font: { size: 10 } }
                        },
                        x: {
                            title: { display: true, text: 'Materiales', font: { size: 10 } }
                        }
                    }
                }
            };

            const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
            // Centramos la gráfica de barras en el PDF
            doc.image(imageBuffer, 80, doc.y, { width: 440 });
            doc.y += 270; // Bajamos el cursor para dejarle espacio a la tabla
        }

        // --- 5. TABLA DETALLADA ---
        const tableTop = doc.y; 
        const colAlumno = 50;
        const colMaterial = 200;
        const colCantidad = 350;
        const colFecha = 450;

        doc.rect(50, tableTop, 510, 25).fill('#2ecc71');
        doc.fontSize(10).fillColor('#FFFFFF');
        doc.text('Alumno', colAlumno + 5, tableTop + 8);
        doc.text('Material', colMaterial + 5, tableTop + 8);
        doc.text('Cantidad', colCantidad + 5, tableTop + 8);
        doc.text('Fecha', colFecha + 5, tableTop + 8);

        let y = tableTop + 25;
        doc.fillColor('#333');

        if (rows.length === 0) {
            doc.rect(50, y, 510, 20).stroke('#ecf0f1');
            doc.text('No hay registros de reciclaje aprobados en este mes.', colAlumno + 5, y + 6);
        } else {
            rows.forEach((row) => {
                if (y > 700) {
                    doc.addPage();
                    y = 50;
                }

                doc.rect(50, y, 510, 20).stroke('#ecf0f1');
                const fechaEntrega = new Date(row.fecha).toLocaleDateString();
                
                doc.fontSize(9).fillColor('#333');
                doc.text(row.alumno, colAlumno + 5, y + 6, { width: 140, ellipsis: true });
                doc.text(row.material, colMaterial + 5, y + 6);
                doc.text(`${row.cantidad} kg`, colCantidad + 5, y + 6);
                doc.text(fechaEntrega, colFecha + 5, y + 6);
                
                y += 20;
            });
        }

        doc.end();

    } catch (err) {
        console.error("Error al generar el PDF con barra:", err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Error al generar el reporte" });
        }
    }
});
app.listen(PORT, () => {
    console.log(`✅ Servidor MySQL corriendo en http://localhost:${PORT}`);
});