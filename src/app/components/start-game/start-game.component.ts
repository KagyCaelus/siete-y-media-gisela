import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  constructor(private fb: FormBuilder) {}

  dealCards: number = 0

  myForm = this.fb.group({
    player1 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]],
    player2 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]],
    player3 : ['', [Validators.pattern('[a-zA-Z ]+$'), Validators.required]]
  })

  submitInfoPlayers() {
    if(this.myForm.invalid) {
      alert("Los datos están incorrectos o faltan datos")
    } else if (this.dealCards == undefined){
      alert("No se ha designado la persona que reparte")
    } else {
      console.log(this.myForm.value, this.dealCards)
    }
  }


  onItemChange(event: any) {
    this.dealCards = event.value
  }

}
