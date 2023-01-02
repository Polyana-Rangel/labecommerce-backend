//recebera um nome de pais pelo terminal 
import { countries } from "./countries.js";
// console.table(countries)

const value = process.argv[2]
console.log(value)

if (!value){
    console.log("digite o argumento")
}else{
    const result = countries.filter((pais)=>{
        return pais.name.toLowerCase().includes(value.toLowerCase())
    })
    console.log(result)
}