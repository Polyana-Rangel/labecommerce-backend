"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong! amal a');
});
app.get('/users', async (req, res) => {
    console.log("Heç+ll");
    try {
        const result = await (0, database_1.getAllUsers)();
        if (!result) {
            res.status(404);
            throw new Error(" nenhum usuario nao encontrado ");
        }
        res.status(200).send(result);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/users/:id/purchases', async (req, res) => {
    try {
        const id = req.params["id"];
        const usersDB = await (0, database_1.getAllUsers)();
        const { productId, userId } = req.body;
        const userExist = usersDB.filter((users) => users.id === userId);
        if (userExist.length !== 1) {
            res.status(422);
            throw new Error("id diferente das ja cadastradas");
        }
        const purchase = (0, database_1.getAllPurchasesFromUserId)(id);
        res.status(200).send(purchase);
        res.status(201).send("Produto encontrado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/products/:id', (req, res) => {
    try {
        const id = req.params["id"];
        const purchase = (0, database_1.getAllProductById)(id);
        const productExist = (0, database_1.getAllProducts)().filter((product) => product.id === productId);
        const { productId, } = req.body;
        if (productExist.length === 1) {
            res.status(422);
            throw new Error("id do produto nao cadastrado");
        }
        res.status(200).send(purchase);
        res.status(201).send("Produto encontrado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get('/product', (req, res) => {
    try {
        const product = (0, database_1.getAllProducts)();
        res.status(200).send(product);
        if (!product) {
            res.status(404);
            throw new Error("nenhum produto nao encontrado ");
        }
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/product/search", (req, res) => {
    try {
        const q = req.query.q;
        const product = (0, database_1.queryProductsByName)(q);
        if (q !== undefined) {
            if (q.length < 1) {
                res.status(400);
                throw new Error("`q` deve ter mais de um caracter");
            }
        }
        if (product.length < 1) {
            res.status(404);
            throw new Error("produto nao encontrado ");
        }
        res.status(200).send(product);
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/users', async (req, res) => {
    try {
        const { id, email, password } = req.body;
        const newUser = { id, email, password };
        if (newUser.id === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.id !== "string") {
            res.status(400);
            throw new Error("Digite uma string");
        }
        if (newUser.email === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.email !== "string") {
            res.status(400);
            throw new Error("`email` inválido. Deve colocar um novo email");
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido");
        }
        if (newUser.password === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.password !== "string") {
            throw new Error("Parâmetro 'password' inválido");
        }
        const usersDB = await (0, database_1.getAllUsers)();
        const userid = usersDB.filter((user) => user.id === id);
        const useremail = usersDB.filter((user) => user.email === email);
        if (userid.length >= 1) {
            res.status(422);
            throw new Error("id ja cadastrada");
        }
        if (useremail.length >= 1) {
            res.status(422);
            throw new Error("email ja encontrado");
        }
        (0, database_1.createUsers)(id, email, password);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post('/product', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const newProduct = { id, name, price, category };
        if (newProduct.id === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.id !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'id' inválido");
        }
        if (newProduct.name === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.name !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'name' inválido");
        }
        if (newProduct.price === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.price !== "number") {
            res.status(400);
            throw new Error("Parâmetro 'price' inválido");
        }
        if (newProduct.category === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.category !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'category' inválido");
        }
        const productId = (0, database_1.getAllProducts)().filter((product) => product.id === id);
        if (productId.length >= 1) {
            res.status(422);
            throw new Error("id ja cadastrada");
        }
        (0, database_1.createProduct)(id, name, price, (0, database_1.getCategory)(category));
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.post("/purchase", async (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        console.log(newPurchase);
        if (newPurchase.userId === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newPurchase.userId !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'userId' inválido");
        }
        if (newPurchase.productId === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newPurchase.productId !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'productId' inválido");
        }
        if (newPurchase.totalPrice === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newPurchase.totalPrice !== "number") {
            res.status(400);
            throw new Error("Parâmetro 'totalPrice' inválido");
        }
        if (newPurchase.quantity === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newPurchase.quantity !== "number") {
            res.status(400);
            throw new Error("Parâmetro 'quantity' inválido");
        }
        const usersDB = await (0, database_1.getAllUsers)();
        const userExist = usersDB.filter((users) => users.id === userId);
        if (userExist.length !== 1) {
            res.status(422);
            throw new Error("id diferente das ja cadastradas");
        }
        const productExist = (0, database_1.getAllProducts)().filter((product) => product.id === productId);
        if (productExist.length !== 1) {
            res.status(422);
            throw new Error("id do produto nao cadastrado");
        }
        console.log(productExist);
        if (productExist[0].price * quantity !== totalPrice) {
            res.status(400);
            throw new Error("preço total não condiz com a quantidade de produto ");
        }
        (0, database_1.createPurchase)(userId, productId, quantity, totalPrice);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/users/:id", async (req, res) => {
    try {
        const { userId } = req.body;
        const usersDB = await (0, database_1.getAllUsers)();
        const userExist = usersDB.filter((users) => users.id === userId);
        if (userExist.length !== 1) {
            res.status(422);
            throw new Error("id diferente das ja cadastradas");
        }
        const id = req.params["id"];
        (0, database_1.deleteUser)(id);
        res.status(201).send("User apagado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.delete("/product/:id", (req, res) => {
    try {
        const id = req.params["id"];
        const { productId } = req.body;
        const productExist = (0, database_1.getAllProducts)().filter((product) => product.id === productId);
        if (productExist.length !== 1) {
            res.status(422);
            throw new Error("id do produto nao cadastrado");
        }
        (0, database_1.deleteProducts)(id);
        res.status(201).send("User apagado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/product/:id", (req, res) => {
    try {
        const id = req.params["id"];
        const { name, price, category } = req.body;
        const newProduct = { id, name, price, category };
        if (newProduct.id === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.id !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'id' inválido");
        }
        if (newProduct.name === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.name !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'name' inválido");
        }
        if (newProduct.price === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.price !== "number") {
            res.status(400);
            throw new Error("Parâmetro 'price' inválido");
        }
        if (newProduct.category === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newProduct.category !== "string") {
            res.status(400);
            throw new Error("Parâmetro 'category' inválido");
        }
        const productId = (0, database_1.getAllProducts)().filter((product) => product.id === id);
        if (productId.length >= 1) {
            res.status(422);
            throw new Error("id ja cadastrada");
        }
        (0, database_1.putProduct)(id, name, price, (0, database_1.getCategory)(category));
        res.status(201).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.put("/users/:id", async (req, res) => {
    try {
        const id = req.params["id"];
        const { email, password } = req.body;
        const newUser = { id, email, password };
        if (newUser.id === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.id !== "string") {
            res.status(400);
            throw new Error("Digite uma string");
        }
        if (newUser.email === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.email !== "string") {
            res.status(400);
            throw new Error("`email` inválido. Deve colocar um novo email");
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new Error("Parâmetro 'email' inválido");
        }
        if (newUser.password === undefined) {
            res.status(400);
            throw new Error("Digite um valor");
        }
        if (typeof newUser.password !== "string") {
            throw new Error("Parâmetro 'password' inválido");
        }
        const usersDB = await (0, database_1.getAllUsers)();
        const userid = usersDB.filter((user) => user.id === id);
        const useremail = usersDB.filter((user) => user.email === email);
        if (userid.length >= 1) {
            res.status(422);
            throw new Error("id ja cadastrada");
        }
        if (useremail.length >= 1) {
            res.status(422);
            throw new Error("email ja encontrado");
        }
        (0, database_1.putUser)(id, email, password);
        res.status(201).send("Produto atualizado com sucesso");
    }
    catch (error) {
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
//# sourceMappingURL=index.js.map