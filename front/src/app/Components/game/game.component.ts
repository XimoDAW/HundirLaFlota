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

  BOATS: number = 5;
  boatsPlayer: number = this.BOATS;
  boatsBot: number = this.BOATS;
  turnPlayer: boolean = true;
  startGame: boolean = false;

  botPositions!: string[];

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.buildMap(this.playerMap, 5);
    this.buildMap(this.botMap, 5);

  }

  buildMap(map: GameMap, length: number) {
    let i: number = 0;

    for (i; i < length; i++) {
      map.x[i] = i;
      map.y[i] = i;
    }
  }

  //EL JUGADOR DISPARA UN CUADRADO DEL BOT
  fireBoat(letter: string, x: number, y: number) {
    let a = document.getElementById(letter + x.toString() + y.toString());

    if (!this.startGame) {
      alert("Primero selecciona donde quieres colocar tus barcos")
    } else {
      if (a && this.turnPlayer) {
        if (this.botPositions.indexOf(a.id) != -1) {
          a.textContent = "O";
          a.className = "c-map__button c-map__button--green";
          this.turnPlayer = false;
          this.botThinkBoat();
        } else {
          a.textContent = "X";
          a.className = "c-map__button c-map__button--red";
          this.turnPlayer = false;
          this.botThinkBoat();
        }

      }
    }
  }

  botThinkBoat() {
    setTimeout(() => {
      this.botFiredBoats();
    }, 3000);

  }

  botFiredBoats() {
    this.turnPlayer = true;
  }

  selectBotBoats(boat: number) {
    let x!: number;
    let y!: number;
    let finish: number = boat;
    let position!: string;

    this.botPositions = ["a"]

    while (finish > 0) {
      x = Math.floor(Math.random() * (boat));
      y = Math.floor(Math.random() * (boat));
      position = "a" + x.toString() + y.toString();

      if (this.botPositions.indexOf(position) == -1) {
        this.botPositions.push(position);
        finish--;
      }

    }
    this.botPositions.splice(0, 1);
    console.log(this.botPositions)
  }

  //SELECCIONAR BARCOS POR EL JUGADOR EN OTRA PANTALLA
  selectPlayerBoats(letter: string, x: number, y: number) {

    if (this.boatsPlayer > 0) {
      let a = document.getElementById(letter + x.toString() + y.toString())
      if (a && a.className != "c-map__button c-map__button--yellow") {
        a.textContent = "B";
        a.className = "c-map__button c-map__button--yellow";
        this.boatsPlayer--;
      }
    }

    if (this.boatsPlayer == 0) {
      this.selectBotBoats(this.BOATS);
      this.startGame = true;
    }
  }

  back() {
    this.router.navigate([""])
  }
}
