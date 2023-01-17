import express, { Request, Response } from 'express'
import cors from 'cors'

import { TUser, TProduct, TPurchase } from './types';
import {
    getCategory, deleteProducts, deleteUser, users,
    purchase, createUsers, putUser, putProduct,
    getAllProductById, getAllProducts, getAllUsers, createProduct,
    queryProductsByName, createPurchase, getAllPurchasesFromUserId, product
} from "./database";

const app = express()

app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong! amal a')
})

app.get('/users', (req: Request, res: Response) => {

    try {
        const users = getAllUsers()
        res.status(200).send(users)

        if (!users) {
            res.status(404)
            throw new Error(" nenhum usuario nao encontrado ")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        
        const id = req.params["id"]
        
        const {
            productId, userId } = req.body
            
        const userExist = getAllUsers().filter((users) => users.id === userId)

        if (userExist.length !== 1) {
            res.status(422)
            throw new Error("id diferente das ja cadastradas")
        }

        
        const purchase = getAllPurchasesFromUserId(id)
        
       
        res.status(200).send(purchase)

        res.status(201).send("Produto encontrado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        
        const id = req.params["id"]
        const purchase = getAllProductById(id)
        
        const productExist = getAllProducts().filter((product) => product.id === productId)
        const {
            productId, } = req.body

        if (productExist.length === 1) {
            res.status(422)
            throw new Error("id do produto nao cadastrado")
        }
        res.status(200).send(purchase)

        res.status(201).send("Produto encontrado com sucesso")
        

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get('/product', (req: Request, res: Response) => {
    try {
        const product = getAllProducts()
        res.status(200).send(product)

        if (!product) {
            res.status(404)
            throw new Error("nenhum produto nao encontrado ")
        }
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get("/product/search", (req: Request, res: Response) => {
    try {

        const q = req.query.q as string
        const product = queryProductsByName(q)

        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400)
                throw new Error("`q` deve ter mais de um caracter")
            }

        }

        if (product.length < 1) {
            res.status(404)
            throw new Error("produto nao encontrado ")
        }
        res.status(200).send(product)

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body

        const newUser = { id, email, password }


        if (newUser.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }

        if (typeof newUser.id !== "string") {
            res.status(400)
            throw new Error("Digite uma string")
        }

        if (newUser.email === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newUser.email !== "string") {
            res.status(400)
            throw new Error("`email` inválido. Deve colocar um novo email")
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido")
        }

        if (newUser.password === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newUser.password !== "string") {
            throw new Error("Parâmetro 'password' inválido")
        }


        const userid = getAllUsers().filter((user) => user.id === id)
        const useremail = getAllUsers().filter((user) => user.email === email)
        if (userid.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }
        if (useremail.length >= 1) {
            res.status(422)
            throw new Error("email ja encontrado")
        }

        createUsers(id, email, password)

        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

    }


})

app.post('/product', (req: Request, res: Response) => {

    try {

        const { id, name, price, category } = req.body
        const newProduct = { id, name, price, category }

        if (newProduct.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.id !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'id' inválido")
        }

        if (newProduct.name === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.name !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'name' inválido")
        }

        if (newProduct.price === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.price !== "number") {

            res.status(400)
            throw new Error("Parâmetro 'price' inválido")
        }

        if (newProduct.category === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.category !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'category' inválido")
        }

        const productId = getAllProducts().filter((product) => product.id === id)

        if (productId.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }

        createProduct(id, name, price, getCategory(category))

        res.status(201).send("Produto cadastrado com sucesso")


    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/purchase", (req: Request, res: Response) => {

    try {

        const { userId,
            productId,
            quantity,
            totalPrice } = req.body

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }

        console.log(newPurchase)

        if (newPurchase.userId === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.userId !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'userId' inválido")
        }

        if (newPurchase.productId === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.productId !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'productId' inválido")
        }


        if (newPurchase.totalPrice === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.totalPrice !== "number") {

            res.status(400)
            throw new Error("Parâmetro 'totalPrice' inválido")
        }


        if (newPurchase.quantity === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.quantity !== "number") {

            res.status(400)
            throw new Error("Parâmetro 'quantity' inválido")
        }


        const userExist = getAllUsers().filter((users) => users.id === userId)

        if (userExist.length !== 1) {
            res.status(422)
            throw new Error("id diferente das ja cadastradas")
        }

        const productExist = getAllProducts().filter((product) => product.id === productId)

        if (productExist.length !== 1) {
            res.status(422)
            throw new Error("id do produto nao cadastrado")
        }

        console.log(productExist)
        if(productExist[0].price * quantity !== totalPrice){
            res.status(400)
            throw new Error("preço total não condiz com a quantidade de produto ")
        }

        createPurchase(userId, productId, quantity, totalPrice)

        res.status(201).send("Compra realizada com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        
        const {
            userId } = req.body
            
        const userExist = getAllUsers().filter((users) => users.id === userId)

        if (userExist.length !== 1) {
            res.status(422)
            throw new Error("id diferente das ja cadastradas")
        }

        const id = req.params["id"]
        deleteUser(id)
    
        res.status(201).send("User apagado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params["id"]
        const { 
            productId
            } = req.body
        const productExist = getAllProducts().filter((product) => product.id === productId)

        if (productExist.length !== 1) {
            res.status(422)
            throw new Error("id do produto nao cadastrado")
        }
        deleteProducts(id)
    
        res.status(201).send("User apagado com sucesso")
        
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.put("/product/:id", (req: Request, res: Response) => {

    try {
        const id = req.params["id"]
        const { name, price, category } = req.body

        const newProduct = { id, name, price, category }

        if (newProduct.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.id !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'id' inválido")
        }

        if (newProduct.name === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.name !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'name' inválido")
        }

        if (newProduct.price === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.price !== "number") {

            res.status(400)
            throw new Error("Parâmetro 'price' inválido")
        }

        if (newProduct.category === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.category !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'category' inválido")
        }

        const productId = getAllProducts().filter((product) => product.id === id)

        if (productId.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }

        putProduct(id, name, price, getCategory(category))
    
        res.status(201).send("Cadastro atualizado com sucesso")
        
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message) 
    }

})

app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params["id"]
        const { email, password } = req.body

        const newUser = { id, email, password }


        if (newUser.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }

        if (typeof newUser.id !== "string") {
            res.status(400)
            throw new Error("Digite uma string")
        }

        if (newUser.email === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newUser.email !== "string") {
            res.status(400)
            throw new Error("`email` inválido. Deve colocar um novo email")
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido")
        }

        if (newUser.password === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newUser.password !== "string") {
            throw new Error("Parâmetro 'password' inválido")
        }


        const userid = getAllUsers().filter((user) => user.id === id)
        const useremail = getAllUsers().filter((user) => user.email === email)
        if (userid.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }
        if (useremail.length >= 1) {
            res.status(422)
            throw new Error("email ja encontrado")
        }


        putUser(id, email, password)
    
        res.status(201).send("Produto atualizado com sucesso"
        )
        
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message) 
    }

})







// console.log(createUsers("vinicios", "vinicios@gmail.com", "456789"))

// console.log(getAllUsers())

// // console.table(createProduct("345", "celular", 234, Category.ELECTRONICS))
// console.log("================================================================")
// console.log(getAllProducts())
// console.log(queryProductsByName("celular"))

// console.log(purchase)
// console.log(createPurchase("987", "789", 1, 7890))

// console.log(getAllProductById("09"))



