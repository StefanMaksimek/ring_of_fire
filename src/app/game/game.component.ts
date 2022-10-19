import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public cards = {
    colors: ['clubs', 'spades', 'diamonds', 'hearts'],
    numbers: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'],
  };
  public game!: Game;

  playingCards: any = [];

  pickCardAnimation: boolean = false;
  currentCard: any = '';

  constructor() {}

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
  }

  renderCardStack() {
    this.cards.colors.forEach((color: any) => {
      this.setColor(color);
    });
  }

  setColor(color: any) {
    this.cards.numbers.forEach((number) => {
      this.game.playingStack.push(color + '_' + number);
    });
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.playingStack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    }
    console.log(this.game);
  }
}
