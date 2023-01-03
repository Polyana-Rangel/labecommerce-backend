import { TUser } from "./types";
import { TProduct } from "./types";
import { TPurchase } from "./types";

export const users: TUser[]=[
    {id:"12345",
    email:"polyana@labenu.com",
    password: "1234567"},
    
    {id:"12395",
    email:"izabel@labenu.com",
    password: "1034567"}   
    
]

export const product : TProduct[]=[
    {
     id :"34567",
     name: "camisa",
     price: 3456,
     category: "roupa",
    },
    {
     id :"37567",
     name: "sapato",
     price: 356,
     category: "roupa",
    }
]

export const purchase : TPurchase[]=[
    {

        userId :"12345",      
        productId :"34567",
        quantity :3,
        totalPrice :10368
    },
    {

        userId :"12395",      
        productId :"37567",
        quantity :2,
        totalPrice :712
    }
]

