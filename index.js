const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener el contador
app.get('/api/counter', (req, res) => {
    try {
        const counterPath = path.join(__dirname, 'counter.txt');
        let count = 0;
        
        if (fs.existsSync(counterPath)) {
            count = parseInt(fs.readFileSync(counterPath, 'utf8')) || 0;
        }
        
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el contador' });
    }
});

// Ruta para incrementar el contador
app.post('/api/counter/increment', (req, res) => {
    try {
        const counterPath = path.join(__dirname, 'counter.txt');
        let count = 0;
        
        if (fs.existsSync(counterPath)) {
            count = parseInt(fs.readFileSync(counterPath, 'utf8')) || 0;
        }
        
        count++;
        fs.writeFileSync(counterPath, count.toString());
        
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el contador' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 