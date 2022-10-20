import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public cards = {
    colors: ['clubs', 'spades', 'diamonds', 'hearts'],
    numbers: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
    ],
  };
  public game!: Game;

  playingCards: any = [];

  pickCardAnimation: boolean = false;
  currentCard: any = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.renderPlayingStack();
    shuffleStack(this.game.playingStack);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(([name, selectedIcon]: any[]): void => {
      if (name && name.length > 0) {
        let player = { name: name, icon: selectedIcon };
        this.game.players.push(player);
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  renderPlayingStack() {
    this.renderCardStack();
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
      this.nextPlayer();
      console.log(this.game.players.length);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  nextPlayer() {
    this.game.players.push(this.game.players.shift());
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arrey
 * @returns same arrey mixed
 */
function shuffleStack(arrey: string[]): Array<any> {
  arrey.forEach((card: string, i: number) => {
    const j = Math.floor(Math.random() * (i + 1));
    [arrey[i], arrey[j]] = [arrey[j], arrey[i]];
  });
  return arrey;
}
