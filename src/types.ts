import { product } from './database/index';

export enum Category {
     ACCESSORIES = "Acessórios",
     CLOTHES_AND_SHOES = "Roupas e calçados",
     ELECTRONICS = "Eletrônicos"
}

export type TUser = {
     id: string,
     name: string,
     email: string,
     password: string,
     createdAt: string

}

export type TProduct = {
     id: string,
     name: string,
     price: number,
     category: string,
}

export type TPurchase = {
     id: string
     buyer: string,
     productId: string,
     quantity: number,
     totalPrice: number
}

export type TPurchaseProduct ={
     id: string,
     quantity: number
}