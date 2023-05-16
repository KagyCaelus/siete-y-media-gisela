import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { RecordComponent } from './components/record/record.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: "home", component:HomeComponent},
  {path: "start-game", component:StartGameComponent},
  {path: "record", component:RecordComponent},
  {path: "game", component:GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
