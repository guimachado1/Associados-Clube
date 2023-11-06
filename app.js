const express = require('express');
const app = express();

app.use(express.json());

const db = require('./db');

// Endpoint para criar um novo associado (CREATE)
app.post('/associados', (req, res) => {
    const { cpf_associado, nome_associado, email_associado } = req.body;
    
    if (!cpf_associado || !nome_associado || !email_associado) {
        res.status(400).send('Campos obrigatórios estão faltando.');
    } else {
        const query = `INSERT INTO associados(cpf_associado, nome_associado, email_associado) VALUES (?, ?, ?)`;

        db.query(query, [cpf_associado, nome_associado, email_associado], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro ao criar associado.');
            } else {
                res.status(201).json({ message: 'Associado criado com sucesso.' });
            }
        });
    }
});


// Endpoint que lista todos os associados (READ)
app.get('/associados', (req, res) => {
    const query = 'SELECT * FROM associados';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao listar associados.');
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint que atualiza os dados de um associado por CPF (UPDATE)
app.put('/associados/:cpf', (req, res) => {
    const { nome_associado, email_associado } = req.body;
    const cpf_associado = req.params.cpf;
    
    const query = 'UPDATE associados SET nome_associado = ?, email_associado = ? WHERE cpf_associado = ?';

    db.query(query, [nome_associado, email_associado, cpf_associado], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao atualizar associado.');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Associado não encontrado.');
            } else {
                res.status(200).json({ message: 'Associado atualizado com sucesso.' });
            }
        }
    });
});

// Endpoint que deleta um associado por CPF (DELETE)
app.delete('/associados/:cpf', (req, res) => {
    const cpf_associado = req.params.cpf;
    
    const query = 'DELETE FROM associados WHERE cpf_associado = ?';

    db.query(query, [cpf_associado], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao excluir associado.');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Associado não encontrado.');
            } else {
                res.status(200).json({ message: 'Associado excluído com sucesso.' });
            }
        }
    });
});

// Endpoint para pesquisar um associado por CPF
app.get('/associados/:cpf', (req, res) => {
    const cpf_associado = req.params.cpf;
    
    const query = 'SELECT * FROM associados WHERE cpf_associado = ?';

    db.query(query, [cpf_associado], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar associado.');
        } else {
            if (results.length === 0) {
                res.status(404).send('Associado não encontrado.');
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

module.exports = app;