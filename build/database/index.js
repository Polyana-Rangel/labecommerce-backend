"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putProduct = exports.putUser = exports.deleteProducts = exports.deleteUser = exports.getCategory = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getAllProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUsers = exports.purchase = exports.product = exports.users = void 0;
const types_1 = require("../types");
const knex_1 = require("./knex");
exports.users = [
    {
        id: "12345",
        email: "polyana@labenu.com",
        password: "1234567"
    },
    {
        id: "12395",
        email: "izabel@labenu.com",
        password: "1034567"
    }
];
exports.product = [
    {
        id: "34567",
        name: "camisa",
        price: 10,
        category: types_1.Category.ACCESSORIES,
    },
    {
        id: "37567",
        name: "sapato",
        price: 20,
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
async function getAllUsers() {
    try {
        const result = await (0, knex_1.db)("users");
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
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
    return (query);
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
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    return exports.purchase.filter((purchase) => {
        return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()));
    });
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
function getCategory(categoryName) {
    if (categoryName.toLocaleLowerCase() === 'acessórios') {
        return types_1.Category.ACCESSORIES;
    }
    else if (categoryName.toLocaleLowerCase() === 'roupas e calçados') {
        return types_1.Category.CLOTHES_AND_SHOES;
    }
    else {
        return types_1.Category.ELECTRONICS;
    }
}
exports.getCategory = getCategory;
function deleteUser(id) {
    exports.users = exports.users.filter(user => user.id !== id);
}
exports.deleteUser = deleteUser;
function deleteProducts(id) {
    exports.product = exports.product.filter(p => p.id !== id);
}
exports.deleteProducts = deleteProducts;
function putUser(id, email, password) {
    exports.users = exports.users.map(user => {
        if (user.id === id) {
            user.email = email;
            user.password = password;
        }
        return user;
    });
}
exports.putUser = putUser;
function putProduct(id, name, price, category) {
    exports.product = exports.product.map(p => {
        if (p.id === id) {
            p.name = name;
            p.price = price;
            p.category = category;
        }
        return p;
    });
}
exports.putProduct = putProduct;
//# sourceMappingURL=index.js.map