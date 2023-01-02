import { countries } from "./countries.js";

const name = process.argv[2]
const code = process.argv[3]

if(!name || !code){

    console.log("digite o nome e o cogigo do pais")
}else {
    const newCountry ={
        name, code
    }
    countries.unshift(newCountry)
    console.log(countries[0])
}