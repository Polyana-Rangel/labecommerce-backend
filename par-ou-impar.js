const typenum = process.argv[2]
const num = process.argv[3]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const numeroaleatorio = getRndInteger(0,10)
  const soma = Number(num) + Number(numeroaleatorio)

  if(!typenum || !num ){
    console.log("faltou digitar impar/par e o numero")
  }else {
    if (soma%2 ===0 && typenum ==="par"){
        console.log(`voce escolheu par e o computador escolehu impar , o resultado foi ${soma} vc ganhou!`)
    } else if ( soma%2 ===1 && typenum ===  "par "){
    console.log(`voce escolheu par e o computador escolehu impar , o resultado foi ${soma} vc perdeu!`)
  }else if (soma%2 ===0 && typenum ==="impar"){
    console.log(`voce escolheu par e o computador escolehu impar , o resultado foi ${soma} vc perdeu!`)
}else if ( soma%2 ===1 && typenum ===  "impar "){
    console.log(`voce escolheu par e o computador escolehu impar , o resultado foi ${soma} vc ganhou!`)

}else {
    console.log("algo deu errado")
}}