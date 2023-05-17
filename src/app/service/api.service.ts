import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CardGames, Players} from 'src/app/model/classes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  url = 'https://localhost:7102/api'

  getCardGames(){
    return this.http.get(`${this.url}/CardGames`)
  }

  saveCardGames(cardGame: CardGames){
    return this.http.post(`${this.url}/CardGames`, cardGame)
  }

  savePlayers(player: Players){
    return this.http.post(`${this.url}/Players`, player)
  }

  getPlayers(){
    return this.http.get(`${this.url}/Players`)
  }
}
