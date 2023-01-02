const typehand = process.argv[2]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const numeroaleatorio = getRndInteger (1,3)

  const tesoura = 1
  const pepel = 2
  const pedra = 3

  if (typehand === "tesoura" && numeroaleatorio === 1 ){
    console.log("empatou")
  }else if (typehand === "tesoura" && numeroaleatorio === 2){
    console.log("voce ganhou")
  }
  else if (typehand === "tesoura" && numeroaleatorio === 3){
    console.log("voce perdeu")
  }

  if (typehand === "papel" && numeroaleatorio === 1 ){
    console.log("empatou")
  }else if (typehand === "papel" && numeroaleatorio === 2){
    console.log("voce ganhou")
  }
  else if (typehand === "papel" && numeroaleatorio === 3){
    console.log("voce perdeu")

  }
  if (typehand === "pedra" && numeroaleatorio === 1 ){
    console.log("empatou")
  }else if (typehand === "pedra" && numeroaleatorio === 2){
    console.log("voce ganhou")
  }
  else if (typehand === "pedra" && numeroaleatorio === 3){
    console.log("voce perdeu")
  }

  