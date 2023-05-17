import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedPlayers!: string[];
  banca!: number
  bancaPlayer!: string

  constructor() { }

  setPlayers(selectedPlayers: string[], banca: number): void {
    this.selectedPlayers = selectedPlayers;
    this.banca = banca
    console.log(this.selectedPlayers, this.banca);
  }

  getPlayers(): string[]{
    if (this.selectedPlayers) {
      this.bancaPlayer = this.selectedPlayers.splice(this.banca-1, 1)[0]
      this.selectedPlayers.push(this.bancaPlayer)
      return this.selectedPlayers;
    }
    else return [];
  }
}
