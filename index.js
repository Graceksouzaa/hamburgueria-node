const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app =  express()
app.use(express.json())


const pedidos = []

const checkIdDoPedido = (request, response, next) => {
    const {id} = request.params

    const index = pedidos.findIndex(pedido => pedido.id ===id)

    if(index <0){
        return response.status(404).json({error:"Not found 😕"})
    }

    request.pedidoIndex = index
    request.pedidoID = id

    next()
}


app.get('/pedidos', (request, response) => {
        return response.json(pedidos)
})


app.post('/pedidos', (request, response) => {
    const {pedido, nomeCliente, preco} = request.body
    
    const idPedido = {id:uuid.v4(),pedido, nomeCliente, preco, status: 'Em preparação!'} 
    
    pedidos.push(idPedido)

    return response.status(201).json(idPedido)
})


app.put('/pedidos/:id', checkIdDoPedido, (request, response) => {
    const {pedido, nomeCliente, preco} = request.body
    const index = request.pedidoIndex
    const id = request.pedidoID

    const pedidoAtualizado = {id, pedido, nomeCliente, preco, status: 'Em preparação!'}

    pedidos[index] = pedidoAtualizado

    return response.json(pedidoAtualizado)
})


app.delete('/pedidos/:id', checkIdDoPedido, (request, response) => {
    const index = request.pedidoIndex

    pedidos.splice(index,1)

    return response.status(204).json()
})


app.get('/pedidos/:id', checkIdDoPedido, (request, response) => {
    const index = request.pedidoIndex
    pedidoEspecifico = pedidos[index]

    return response.json(pedidoEspecifico)
})


app.patch('/pedidos/:id', checkIdDoPedido, (request, response) => {
    const index = request.pedidoIndex
    const {id, pedido, nomeCliente, preco} = pedidos[index]

    const pedidoAtualizado = {id, pedido, nomeCliente, preco, status: 'Pronto'} 

    pedidos[index] = pedidoAtualizado

    return response.json(pedidoAtualizado)
})


app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)
})