import { ParseSpan } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameMap } from 'src/app/Models/game-map';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  botMap: GameMap = {
    x: [],
    y: [],
    letter: "a"
  }

  playerMap: GameMap = {
    x: [],
    y: [],
    letter: "b"
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.buildMap(this.playerMap, 5);
    this.buildMap(this.botMap, 5);

  }

  buildMap(map: GameMap, length: number) {
    let i: number = 0;

    for (i; i < length; i++) {
      map.x [i]= i;
      map.y [i]= i;
    }
  }

  fireBoat(letter:string, x:number, y:number) {
    let a = document.getElementById(letter + x.toString() + y.toString())
    if (a) {
      a.textContent = "X";
    }
    console.log(a)
  }

}
