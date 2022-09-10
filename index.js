const express = require('express')
const app = express()
const db = require('./db.json')
const fs = require('fs')

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send('Hello world! 123')
})

// RETORNA TODOS CLIENTES
app.get('/cliente', (req, res) => {
    return res.status(200).json(db)
})

// RETORNA 1 CLIENTE
app.get('/cliente/:id', (req, res) => {
    const id = req.params.id
    const result = db.find(cliente => cliente.id === id)
    if (!result) {
        return res.status(404).send()
    }

    return res.status(200).json(result)
})

//CADASTRA UM CLIENTE
app.post('/cliente', (req, res) => {
    const body = req.body
    const data = [...db, body]

    fs.writeFileSync('db.json', JSON.stringify(data))

    return res.status(201).json(body)
})

// DELETA UM CLIENTE
app.delete('/cliente/:id', (req, res) => {
    const id = req.params.id
    const result = db.find(cliente => cliente.id === id)
    if (!result) {
        return res.status(404).send()
    }

    const data = db.filter((cliente) => {
        return cliente.id !== id
    })

    fs.writeFileSync('db.json', JSON.stringify(data))

    return res.status(204).send()
})

// ALTERA UM CLIENTE
app.put('/cliente/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    const result = db.find(cliente => cliente.id === id)
    if (!result) {
        return res.status(404).send()
    }

    const data = db.map((cliente) => {
        if (cliente.id === id) {
            const dados = {
                id: id,
                ...body
            }

            return dados
        }

        return cliente
    })

    fs.writeFileSync('db.json', JSON.stringify(data))

    return res.status(200).json(body)
})

app.listen('3000', () => {
    console.log('Api rodando porta 3000!')
})