const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//READ
app.get('/', (req, res) => {
    res.send(`
        <h1>Lista de usuarios</h1>
        <ul>
            ${usuarios.map((usuario) => `
            <li>
                Nombre: ${usuario.nombre} |
                Edad: ${usuario.edad} |
                Origen: ${usuario.lugarProcedencia}
            </li>
            `).join('')}
        </ul>
        
        <form action="/usuarios" method="post">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <br>
            <label for="edad">Edad</label>
            <input type="number" id="edad" name="edad" required>
            <br>
            <label for="lugarProcedencia">Lugar de Procedencia</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
            <br>
            <button type="submit">Añadir usuario</button>
        </form>
        
        <br>
        <br>

        <a href="/usuarios">Usuarios JSON</a>
    `);
});

//CREATE
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };

    usuarios.push(nuevoUsuario);
    res.redirect('/');
});

// READ (JSON)
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

//READ NOME
app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find((u) => u.nombre === req.params.nombre);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

// // UPDATE (por nombre)
// app.put('/usuarios/:nombre', (req, res) => {
//     const index = usuarios.findIndex((u) => u.nombre === req.params.nombre);
//     if (index !== -1) {
//         usuarios[index] = {
//             ...usuarios[index],
//             ...req.body,
//         };
//         res.json(usuarios[index]);
//     } else {
//         res.status(404).json({ error: 'Usuario no encontrado' });
//     }
// });

// // DELETE (por nombre)
// app.delete('/usuarios/:nombre', (req, res) => {
//     usuarios = usuarios.filter((u) => u.nombre !== req.params.nombre);
//     res.json({ message: 'Usuario eliminado correctamente' });
// });

app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
});
