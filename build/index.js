"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("lista de usuarios");
console.table(database_1.users);
console.log("lista de produtos");
console.table(database_1.product);
console.log("lista de compras");
console.table(database_1.purchase);
//# sourceMappingURL=index.js.map