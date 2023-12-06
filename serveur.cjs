const express = require('express');
const app = express();
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

// Permet de donner un chemin statique (qui est ici la racine)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'vue', 'configuration_jeu.html'));
});

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'vue', 'configuration_jeu.html'));
});

app.get('/jeu', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'vue', 'plateau_puissance_4.html'));
});

app.post('/jeu', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'vue', 'plateau_puissance_4.html'));
});

app.listen(port, hostname, () => {
    console.log(`Serveur tournant à l'adresse :  http://${hostname}:${port}/`);
});