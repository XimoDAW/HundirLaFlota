import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { GameComponent } from './Components/game/game.component';
import { InstructionsComponent } from './Components/instructions/instructions.component';

const routes: Routes = [
  {path: '', component: MenuComponent },
  {path: 'game', component: GameComponent },
  {path: 'instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
