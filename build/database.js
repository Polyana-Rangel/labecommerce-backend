"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.product = exports.users = void 0;
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
        category: "roupa",
    },
    {
        id: "37567",
        name: "sapato",
        price: 356,
        category: "roupa",
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
//# sourceMappingURL=database.js.map