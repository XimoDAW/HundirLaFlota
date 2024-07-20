import { ParseSpan } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameMap } from 'src/app/Models/game-map';
import { Player } from 'src/app/Models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {

  botMap: GameMap = {
    x: [],
    y: [],
    positions: [],
    letter: "a"
  }

  playerMap: GameMap = {
    x: [],
    y: [],
    positions: [],
    letter: "b"
  }

  player: Player = {
    boats: 5,
    turn: false
  }

  bot: Player = {
    boats: 5,
    turn: false
  }

  boatsPlayer: number = this.player.boats;
  boatsBot: number = this.bot.boats;
  playerWin: number = this.bot.boats;
  botWin: number = this.player.boats;
  startGame: boolean = false;
  botBoats: boolean = true;

  botPositions!: string[];

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.buildMap(this.playerMap, 5);
    this.buildMap(this.botMap, 5);
    this.mapPositions(this.playerMap.positions, 5, this.playerMap.letter);
    this.mapPositions(this.botMap.positions, 5, this.botMap.letter);
    this.player.turn = true;

  }

  buildMap(map: GameMap, length: number) {

    for (let i: number = 0; i < length; i++) {
      map.x[i] = i;
      map.y[i] = i;
    }
  }

  mapPositions(pos: string[], length: number, letter: string) {
    for (let i: number = 0; i < length; i++) {
      for (let j: number = 0; j < length; j++) {
        pos.push(letter + i.toString() + j.toString());
      }
    }
  }

  //EL JUGADOR DISPARA UN CUADRADO DEL BOT
  fireBoat(letter: string, x: number, y: number) {
    let a = document.getElementById(letter + x.toString() + y.toString());
    //BOORRAAAAR
    console.log(this.botMap.positions);

    if (!this.startGame) {
      alert("Primero selecciona donde quieres colocar tus barcos")
    } else {
      if (a && this.player.turn) {
        let position: number = this.botMap.positions.indexOf(a.id);
        if (position != -1) {
          this.botMap.positions = this.botMap.positions.filter(pos => pos != a?.id)
          if (this.botPositions.indexOf(a.id) != -1) {
            a.textContent = "O";
            a.className = "c-map__button c-map__button--green";
            this.playerWin--;
            if (this.playerWin == 0) {
              this.playerWins();
            } else {
              this.player.turn = false;
              this.botThinkBoat();
            }

          } else {
            a.textContent = "X";
            a.className = "c-map__button c-map__button--red";
            this.player.turn = false;
            this.botThinkBoat();
          }

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
    let fire: boolean = true;

    //BOORRAAAAR
    console.log(this.playerMap.positions);

    while (fire) {
      let x: number = Math.floor(Math.random() * (this.bot.boats));
      let y: number = Math.floor(Math.random() * (this.bot.boats));
      let position: string = this.playerMap.letter + x.toString() + y.toString();
      let findPosition: number = this.playerMap.positions.indexOf(position);

      if (findPosition != - 1) {
        let button = document.getElementById(position);

        if (button) {
          if (button.className == "c-map__button c-map__button--yellow") {
            button.textContent = "O";
            button.className = "c-map__button c-map__button--green";

            this.botWin--;
            if (this.botWin == 0) {
              this.botWins();
            }
          } else {
            button.textContent = "X";
            button.className = "c-map__button c-map__button--red";
          }
        }

        this.playerMap.positions = this.playerMap.positions.filter(pos => pos != position);
        fire = false;
      }
    }

    this.player.turn = true;
  }

  selectBotBoats(boat: number) {
    if (this.botBoats) {
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
      this.botBoats = false;

      //BOORRAR
      console.log(this.botPositions)
    }
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
      this.selectBotBoats(this.bot.boats);
      this.startGame = true;
    }
  }

  playerWins() {
    alert("Has ganado");
    this.back();
  }

  botWins() {
    alert("El bot ha ganado");
    this.back();
  }

  back() {
    this.router.navigate([""]);
  }
}
