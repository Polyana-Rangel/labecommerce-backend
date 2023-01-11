"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getAllProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUsers = exports.purchase = exports.product = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    { id: "12345",
        email: "polyana@labenu.com",
        password: "1234567" },
    { id: "12395",
        email: "izabel@labenu.com",
        password: "1034567" }
];
exports.product = [
    {
        id: "34567",
        name: "camisa",
        price: 3456,
        category: types_1.Category.ACCESSORIES,
    },
    {
        id: "37567",
        name: "sapato",
        price: 356,
        category: types_1.Category.CLOTHES_AND_SHOES,
    }
];
exports.purchase = [
    {
        userId: "12345",
        productId: "34567",
        quantity: 3,
        totalPrice: 10368
    },
    {
        userId: "12395",
        productId: "37567",
        quantity: 2,
        totalPrice: 712
    }
];
function createUsers(id, email, password) {
    exports.users.push({ id, email, password });
    return ("Cadastro realizado");
}
exports.createUsers = createUsers;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.product.push({ id, name, price, category });
    return ("produto criado");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.product;
}
exports.getAllProducts = getAllProducts;
function getAllProductById(idToSearch) {
    return exports.product.filter((product) => {
        return product.id === idToSearch;
    });
}
exports.getAllProductById = getAllProductById;
const queryProductsByName = (q) => {
    const query = exports.product.filter((product) => {
        return (product.name.toLowerCase().includes(q.toLowerCase()));
    });
    console.log(query);
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchase.push(newPurchase);
    console.log("compra realizada com sucesso");
    console.table(exports.purchase);
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchase.filter((purchase) => {
        return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()));
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map