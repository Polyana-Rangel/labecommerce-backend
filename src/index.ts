import express, { Request, Response } from 'express'
import cors from 'cors'

import {  TUser, TProduct,TPurchase } from './types';
import {getCategory, deleteProducts, deleteUser,
      purchase, createUsers,putUser,putProduct,
      getAllProductById, getAllProducts, getAllUsers, createProduct,
      queryProductsByName, createPurchase, getAllPurchasesFromUserId
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
      const users = getAllUsers()
      res.status(200).send(users) 
  
  })
app.get('/users/:id/purchases', (req: Request, res: Response) => {
      const id = req.params["id"]
      const purchase = getAllPurchasesFromUserId(id)
      res.status(200).send(purchase) 
  
  })

app.get('/products/:id', (req: Request, res: Response) => {
      const id = req.params["id"]
      const purchase = getAllProductById(id)
      res.status(200).send(purchase) 
  
  })

app.get('/product', (req: Request, res: Response) => {
      const product = getAllProducts()
      res.status(200).send(product)
  
  })

  app.get("/product/search", (req: Request, res: Response) => {
      const q = req.query.q as string
    const product =  queryProductsByName(q)
      res.status(200).send(product)
  })

  app.post('/users', (req: Request, res: Response) => {
  
      const { id, email, password } = req.body as TUser
  
      createUsers(id, email, password)
  
      res.status(201).send("Cadastro realizado com sucesso"
      )
  })

  app.post('/product', (req: Request, res: Response) => {
  
      const { id, name, price, category } = req.body as TProduct 
  
    
      createProduct(id, name, price,getCategory(category))
  
      res.status(201).send("Produto cadastrado com sucesso"

      )
  })
  
  app.post("/purchase", (req: Request, res: Response) => {
      
  
      const { userId,
             productId,
             quantity,
            totalPrice } = req.body as TPurchase
  
    
            createPurchase(userId, productId, quantity, totalPrice)
  
      res.status(201).send("Compra realizada com sucesso"
      )
  })

  app.delete("/users/:id", (req: Request, res: Response) => {
      const id = req.params["id"]
      deleteUser(id)

      res.status(201).send("User apagado com sucesso")

  })
  app.delete("/product/:id", (req: Request, res: Response) => {
      const id = req.params["id"]
      deleteProducts(id)

      res.status(201).send("User apagado com sucesso")

  })

  app.put("/product/:id", (req: Request, res: Response) => {
      const id = req.params["id"]
      const {  name, price, category } = req.body 

      putProduct(id, name, price,getCategory(category))

      res.status(201).send("Cadastro atualizado com sucesso")

  })

  app.put("/users/:id", (req: Request, res: Response) => {
      const id = req.params["id"]
      const { email, password } = req.body 
      putUser(id, email, password)

      res.status(201).send("Produto atualizado com sucesso"
      )

  })







console.log(createUsers("vinicios", "vinicios@gmail.com", "456789"))

console.log(getAllUsers())

// console.table(createProduct("345", "celular", 234, Category.ELECTRONICS))
console.log("================================================================")
console.log(getAllProducts())
console.log(queryProductsByName("celular"))

console.log(purchase)
console.log(createPurchase("987", "789", 1, 7890))

console.log(getAllProductById("09"))





