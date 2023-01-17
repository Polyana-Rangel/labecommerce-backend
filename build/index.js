"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const types_1 = require("./types");
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
console.log((0, database_1.createUsers)("vinicios", "vinicios@gmail.com", "456789"));
console.log((0, database_1.getAllUsers)());
console.log((0, database_1.createProduct)("345", "celular", 234, types_1.Category.ELECTRONICS));
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.queryProductsByName)("iPhone"));
console.log(database_1.purchase);
console.log((0, database_1.createPurchase)("987", "789", 1, 7890));
console.log((0, database_1.getAllProductById)("09"));
//# sourceMappingURL=index.js.map