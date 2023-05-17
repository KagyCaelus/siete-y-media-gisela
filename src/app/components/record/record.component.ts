import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{

  constructor (private apiService: ApiService) {}

  dataSourcePlayer!: any
  dataSourceGames!: any

  ngOnInit(): void {
    this.apiService.getPlayers().pipe(tap((data) => {
      this.dataSourcePlayer = data
    })).subscribe();

    this.apiService.getCardGames().pipe(tap((data) => {
      this.dataSourceGames = data
    })).subscribe();
  }

  displayedColumnsPlayer: string[] = ['idPlayer', 'name'];
  displayedColumnsGame: string[] = ['idGame', 'winner', 'points'];

}
