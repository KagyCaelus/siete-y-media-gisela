export class CardGames {
  constructor() {}
  winner!: string
  points!: number
}

export class Players {
  constructor() {}
  name!: string
}

export class player {
  name!: string
  points!: number
  finishedTurn !: boolean
  banca !: boolean
}

export class card {
  value!: number
  number!: number
  suit!: string
  img!: string
  faceUp!: boolean
}


