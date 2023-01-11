import { TUser, TProduct,TPurchase, Category } from "./types";


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
     category: Category.ACCESSORIES ,
    },
    {
     id :"37567",
     name: "sapato",
     price: 356,
     category: Category.CLOTHES_AND_SHOES,
    
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

export function createUsers(id: string, email: string, password: string):string{
    users.push({id,email,password})
    return("Cadastro realizado")
}

export function getAllUsers (): TUser[]{
    return users
}

export function createProduct(id: string, name: string, price: number, category: Category): string{
    console.log(category)
    product.push({id, name, price, category})
    return ("produto criado")

}

export function getAllProducts (): TProduct[]{
    return product
}

export function getAllProductById(idToSearch: string | undefined): TProduct[]{
    return product.filter(
        (product)=>{
            return product.id === idToSearch
        }
    )
}


export const queryProductsByName = (q: string): TProduct[]=>{
    const query = product.filter(
        (product)=>{
            return (product.name.toLowerCase().includes(q.toLowerCase()))
        }

    )
        return(query)
}

export const createPurchase = (userId:string, productId: string, quantity: number, totalPrice:number): void =>{
    const newPurchase : TPurchase={
        userId,
        productId,
        quantity,
        totalPrice

    }
    purchase.push(newPurchase)

    console.log("compra realizada com sucesso")
    console.table(purchase)
} 

export const getAllPurchasesFromUserId = (userIdToSearch:string): TPurchase[]=>{
    return purchase.filter(
        (purchase)=>{
            return (purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
    )
}

export function getCategory(categoryName: string): Category {
    if (  categoryName.toLocaleLowerCase() === 'acessórios') {
        return Category.ACCESSORIES;
    } else if (categoryName.toLocaleLowerCase() === 'roupas e calçados') {
        return Category.CLOTHES_AND_SHOES;
    } else {
      return Category.ELECTRONICS;
    }
}