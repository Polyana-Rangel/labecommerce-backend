import { TPurchase } from './../types';
import { TUser, TProduct, TPurchaseProduct, Category } from "../types";
import { db } from "./knex"


export let users = [
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

]

export let product: TProduct[] = [
    {
        id: "34567",
        name: "camisa",
        price: 10,
        category: Category.ACCESSORIES,
    },
    {
        id: "37567",
        name: "sapato",
        price: 20,
        category: Category.CLOTHES_AND_SHOES,

    }
]

export const purchase = [
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
]

export async function createUsers(id: string, name: string, email: string, password: string): Promise<void> {

    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password

    }

    await db("users").insert(newUser)

}

export async function getAllUsers(): Promise<TUser[]> {
    try {
        // const result = await db.raw(`
        //     SELECT * FROM users;
        // `

        // const result = await db.select("*").from("users")

        const result = await db.select("id", "name", "email", "password", "created_at as createdAt").from("users")
        return result
    } catch (error) {
        throw error
    }

}

export async function createProduct(id: string, name: string, price: number, description: string, imageUrl: string): Promise<void> {
    try {


        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl

        }

        await db("product").insert(newProduct)

    } catch (error) {
        throw error
    }

}

export async function getAllProducts(): Promise<TProduct[]> {
    try {

        const result = await db.select("id", "name", "price", "description", "imageUrl").from("product")
        return result

    } catch (error) {
        throw error
    }
}

export function getAllProductById(idToSearch: string | undefined): TProduct[] {
    return product.filter(
        (product) => {
            return product.id === idToSearch
        }
    )
}


export const queryProductsByName = async (q: string): Promise<TProduct[]> => {
    try {
        const result = await db.select("*").from("product").where({ name: q })
        return result
    } catch (error) {
        throw error
    }
}

export const createPurchase = async (id: string, buyer: string, totalPrice: number, products: TPurchaseProduct[]): Promise<void> => {
    try {

        const newPurchase = {
            id: id,
            buyer_id: buyer,
            total_price: totalPrice
        }

        await db("purchase").insert(newPurchase)

        for (let product of products) {
            if (product.quantity === undefined) {
               
                throw new Error("Produto vazio")
            } if (typeof product.quantity !== "number") {

               
                throw new Error("Parâmetro 'quantity' inválido")
            }
            const productsBD = await getAllProducts()

            const productsExist = productsBD.filter((productBD) => productBD.id === product.id)

            if (productsExist.length !== 1) {
                throw new Error("id do produto nao cadastrado")
            }

            const newPurchaseProducts = {
               purchase_id: id,
               product_id: product.id,
               quantity: product.quantity

            
            }
            await db("purchases_products").insert(newPurchaseProducts)

        }
        
    } catch (error) {
        throw error
    }
}

export function getCategory(categoryName: string): Category {
    if (categoryName.toLocaleLowerCase() === 'acessórios') {
        return Category.ACCESSORIES;
    } else if (categoryName.toLocaleLowerCase() === 'roupas e calçados') {
        return Category.CLOTHES_AND_SHOES;
    } else {
        return Category.ELECTRONICS;
    }
}

export function deleteUser(id: string): void {
    users = users.filter(user => user.id !== id)
}
export function deleteProducts(id: string): void {
    product = product.filter(p => p.id !== id)
}

export function putUser(id: string, email: string, password: string): void {
    users = users.map(user => {
        if (user.id === id) {
            user.email = email;
            user.password = password;

        }
        return user
    })
}
export async function putProduct(id: string, name: string, price: number, description: string, imageUrl: string): Promise<void> {
    const [product] = await db("product").where({ id: id })

    if (product) {


        const updateProduct = {
            id: id || product.id,
            name: name || product.name,
            price: price || product.price,
            description: description || product.description,
            imageUrl: imageUrl || product.imageUrl

        }

        await db("product").update(updateProduct).where({ id: id })

    } else {
    
        throw new Error("'id' não encontrada")
    }


}

export async function deletePurchase(id: string): Promise<void>{

    const [ purchaseBD] = await db("purchases").where({ id: id })

    if (! purchaseBD) {

        throw new Error("'id purchase' não encontrada")
    }

   
    await db("purchases").del().where({ id: id })

}

export async function getPurchaseById(id: string | undefined): Promise<TPurchase> {
 
    try {
        const [purchaseExist] = await db("purchase")
        .select(
            "purchase.id AS purchaseId",
            "users.id AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchase.total_price AS totalPrice",
            "purchase.created_at AS createdAt",
            "purchase.paid",
        ).innerJoin("users","purchase.buyer_id","=","users.id")
        .where({ "purchase.id": id })

        if (!purchaseExist) {
            throw new Error("Id informado não consta no cadastro")
        }
        
        const productsPurchase = await db("product")
            .select("id","name","price", "description", "imageUrl", "quantity")
            .innerJoin("purchases_products", "product.id", "=", "product_id")
            .where({ purchase_id: id })

        const result = { ...purchaseExist, products: productsPurchase }

        return result
    } catch (error) {
        throw error
    }
}
