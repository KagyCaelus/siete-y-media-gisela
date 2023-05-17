import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { player, card, CardGames } from 'src/app/model/classes';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playersName!: string[]

  jumbledCards: card[] = []
  sortedCards: card[] = []
  dealOfCards: card[] = [];
  actualGettedCards: card[] = [];
  gettedCard?: card;
  hover: boolean = false;
  points: number = 0; //Suma de las cartas que hay sobre la mesa en el turno de un player
  roundnumber: number = 1;

  constructor(private dataService: DataService, private apiService: ApiService, private router: Router) {}

  players: player[] = [
    {
      name: "",
      points: 0,
      finishedTurn: false,
      banca: false,
    },
    {
      name: "",
      points: 0,
      finishedTurn: false,
      banca: false,
    },
    {
      name: "",
      points: 0,
      finishedTurn: false,
      banca: true,
    }
  ]

  ngOnInit(): void {
    this.playersName = this.dataService.getPlayers()
    for(var i = 0; i<this.playersName.length; i++){
      this.players[i].name = this.playersName[i]
    }
    this.dealOfCards = this.makeDealCards()
  }

  getCard(): void {
    this.gettedCard = this.dealOfCards.pop();
    if (this.gettedCard) this.actualGettedCards.push(this.gettedCard);
    if (this.actualGettedCards.length == 1) this.actualGettedCards[0].faceUp = false;
    this.points += this.actualGettedCards[this.actualGettedCards.length-1].value;
    console.log(this.gettedCard);
    console.log(this.actualGettedCards);
    console.log(this.points);
  }

  makeDealCards(): card[]{
    let newSuit: string = "";
    for (var i = 0; i < 4; i++){
      switch (i){
        case 0:
          newSuit = "oro";
          break;
        case 1:
          newSuit = "copa";
          break;
        case 2:
          newSuit = "espada";
          break;
        case 3:
          newSuit = "basto";
          break;
      }
      for (var j = 1; j <= 12; j++){
        if (j == 8) j = 10;
        let newCard: card = {
          value: j <= 7 ? j : 0.5,
          number: j,
          suit: newSuit,
          img: "../../../assets/AllCards/" + newSuit + j.toString() +".png",
          faceUp: true
        }
        this.jumbledCards.push(newCard);
      }
    }
    while (this.jumbledCards.length != 0){
      let indiceAleatorio: number = Math.floor(Math.random() * this.jumbledCards.length)
      this.sortedCards.push(this.jumbledCards[indiceAleatorio]);
      this.jumbledCards.splice(indiceAleatorio, 1);
    }
    return this.sortedCards;
  }

  SiguienteTurno(): void{
    for (var i = 0; i < this.players.length; i++){
     if (!this.players[i].finishedTurn){
      this.players[i].points = this.points;
      this.players[i].finishedTurn = true;
      console.log(this.players[i]);
      i = this.players.length;
     }
    this.actualGettedCards = [];
    this.points = 0;
    }
  }

  results() {
    let maxpoint = 0

    let cardGame: CardGames = {
      winner: "",
      points: 0
    }

    for (const player of this.players) {
      if (player.points > 7.5 || (player.points < this.players[2].points && this.players[2].points <= 7.5) || player.points === this.players[2].points) {
        cardGame.winner = this.players[2].name
        cardGame.points = this.players[2].points
      } else if ((player.points <= 7.5 && this.players[2].points > 7.5) || player.points > this.players[2].points) {
        if (player.points === 7.5) {
          cardGame.winner = player.name
          cardGame.points = player.points
        } else {
          cardGame.winner = player.name
          cardGame.points = player.points
        }
      } else {
        cardGame.winner = "Empate"
        cardGame.points = player.points
      }
    }

    this.apiService.saveCardGames(cardGame);

    this.router.navigate(['record'])

  }
}

