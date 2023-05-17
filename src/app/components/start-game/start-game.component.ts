import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Players } from 'src/app/model/classes';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  constructor(private fb: FormBuilder, private apiService: ApiService, private router:Router, private dataService: DataService) {}

  dealCards: number = 0

  playersarr!: Players[]

  player1: Players = {
    name : ""
  }
  player2: Players = {
    name : ""
  }
  player3: Players = {
    name : ""
  }

  myForm = this.fb.group({
    player1 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]],
    player2 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]],
    player3 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]]
  })

  submitInfoPlayers() {
    if(this.myForm.invalid) {
      alert("Los datos están incorrectos o faltan datos")
    } else {
      this.save(Object.values(this.myForm.value) as string[]);
    }
  }


  onItemChange(event: any) {
    if(event.value == undefined){
      console.log("ha entrado")
    } else{
      console.log(this.dealCards)
      this.dealCards = Number(event.value)
      console.log(this.dealCards)
    }

  }

  saveData(){
    console.log(this.dealCards)
    if(this.dealCards == 0){
      alert("No ha elegido la persona que reparte")
    } else {
      this.dataService.setPlayers(Object.values(this.myForm.value) as string[], this.dealCards)
      this.router.navigate(['game'])
    }
  }

  save(names: string[]) {

    console.log(names)
    this.player1.name = names[0]
    this.player2.name = names[1]
    this.player3.name = names[2]

    this.apiService.savePlayers(this.player1).subscribe()
    this.apiService.savePlayers(this.player2).subscribe()
    this.apiService.savePlayers(this.player3).subscribe()

  }

}
