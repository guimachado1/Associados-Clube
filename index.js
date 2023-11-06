const app = require('./app'); // Importa o código Express
const db = require('./db'); // Importa a configuração do banco de dados

// Inicia o servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
