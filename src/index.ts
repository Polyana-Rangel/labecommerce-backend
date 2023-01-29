import { product, } from './database/index';
import express, { Request, Response } from 'express'
import cors from 'cors'

import {
    deleteProducts, deleteUser, createUsers, putUser, putProduct, getAllProductById,
    getAllProducts, getAllUsers, createProduct, queryProductsByName, createPurchase,
    deletePurchase, getPurchaseById
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

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await getAllUsers()

        if (!result) {
            res.status(404)
            throw new Error(" nenhum usuario nao encontrado ")
        }

        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {

        const id = req.params["id"]

        const usersDB = await getAllUsers()

        const {
            productId, userId } = req.body

        const userExist = usersDB.filter((users) => users.id === userId)

        if (userExist.length !== 1) {
            res.status(422)
            throw new Error("id diferente das ja cadastradas")
        }


        // const purchase = getAllPurchasesFromUserId(id)


        // res.status(200).send(purchase)

        res.status(201).send("Produto encontrado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get('/products/:id', async (req: Request, res: Response) => {
    try {

        const id = req.params["id"]
        const purchase = getAllProductById(id)

        const productBD = await getAllProducts()

        const productExist = productBD.filter((product) => product.id === productId)
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

app.get('/product', async (req: Request, res: Response) => {
    try {
        const product = await getAllProducts()
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

app.get("/product/search", async (req: Request, res: Response) => {
    try {

        const q = req.query.q as string
        const product = await queryProductsByName(q)

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

app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        const newUser = { id, name, email, password }




        if (newUser.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }

        if (newUser.name === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }

        if (typeof newUser.id !== "string") {
            res.status(400)
            throw new Error("Digite uma string")
        }

        if (typeof newUser.name !== "string") {
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

        const usersDB = await getAllUsers()


        const userid = usersDB.filter((user) => user.id === id)
        const useremail = usersDB.filter((user) => user.email === email)
        if (userid.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }
        if (useremail.length >= 1) {
            res.status(422)
            throw new Error("email ja encontrado")
        }

        await createUsers(id, name, email, password)

        res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)

    }


})

app.post('/product', async (req: Request, res: Response) => {

    try {

        const { id, name, price, description, imageUrl } = req.body
        const newProduct = { id, name, price, description, imageUrl }

        if (newProduct.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.id !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'id' inválido")
        }

        if (newProduct.imageUrl === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.imageUrl !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'imageUrl' inválido")
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

        if (newProduct.description === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.description !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'description' inválido")
        }

        const productBD = await getAllProducts()
        const productId = productBD.filter((product) => product.id === id)

        if (productId.length >= 1) {
            res.status(422)
            throw new Error("id ja cadastrada")
        }

        createProduct(id, name, price, description, imageUrl)

        res.status(201).send("Produto cadastrado com sucesso")


    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/purchase", async (req: Request, res: Response) => {

    try {

        const { id,
            buyer,
            products,
            totalPrice } = req.body

        const newPurchase = {
            id,
            buyer,
            products,
            totalPrice
        }

        if (newPurchase.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.id !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'id' inválido")
        }


        if (newPurchase.buyer === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.buyer !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'buyer' inválido")
        }


        if (newPurchase.totalPrice === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newPurchase.totalPrice !== "number") {

            res.status(400)
            throw new Error("Parâmetro 'totalPrice' inválido")
        }


        const usersDB = await getAllUsers()
        const userExist = usersDB.filter((users) => users.id === buyer)

        if (userExist.length !== 1) {
            res.status(422)
            throw new Error("id diferente das ja cadastradas")
        }

        if (products === undefined) {
            res.status(400)
            throw new Error("Produto vazio")

        }

        createPurchase(id, buyer, totalPrice, products)

        res.status(201).send("Compra realizada com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})



app.delete("/users/:id", async (req: Request, res: Response) => {
    try {

        const {
            userId } = req.body

        const usersDB = await getAllUsers()

        const userExist = usersDB.filter((users) => users.id === userId)

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

app.get("/purchase/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params["id"]
        
        const result = await getPurchaseById(id)

        res.status(200).send(result)
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.delete("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params["id"]
        const {
            productId
        } = req.body
        const productBD = await getAllProducts()
        const productExist = productBD.filter((product) => product.id === productId)
        
  
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

app.delete("/purchase/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params["id"]

        await deletePurchase(id)

        res.status(201).send("User apagado com sucesso")
    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.put("/product/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params["id"]
        const { name, price, description, imageUrl } = req.body

        const newProduct = { id, name, price, description, imageUrl }

        if (newProduct.id === undefined) {
            res.status(400)
            throw new Error("Digite um valor")
        }
        if (typeof newProduct.id !== "string") {

            res.status(400)
            throw new Error("Parâmetro 'id' inválido")
        }

        const productBD = await getAllProducts()
        const productId = productBD.filter((product) => product.id === id)

        if (productId.length < 1) {
            res.status(422)
            throw new Error("id não cadastrada")
        }

        putProduct(id, name, price, description, imageUrl)

        res.status(201).send("Cadastro atualizado com sucesso")

    } catch (error) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.put("/users/:id", async (req: Request, res: Response) => {
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

        const usersDB = await getAllUsers()


        const userid = usersDB.filter((user) => user.id === id)
        const useremail = usersDB.filter((user) => user.email === email)
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



