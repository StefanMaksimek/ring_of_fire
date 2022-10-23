import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
  deg: number[] = [];
  xOffset: number[] = [];
  yOffset: number[] = [];

  pickCardAnimation: boolean = false;
  currentCard: any = '';

  name: string = '';
  selectedIcon: string = 'angel.png';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    this.renderPlayingStack();
    shuffleStack(this.game.playingStack);
    this.randomDegOffset();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name, selectedIcon: this.selectedIcon },
    });

    dialogRef.afterClosed().subscribe((data): void => {
      if (data.name && data.name.length > 0) {
        let player = { name: data.name, icon: data.selectedIcon };
        this.game.players.push(player);
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  restart() {
    this.game.playingStack = [];
    this.game.playedCards = [];
    this.renderPlayingStack();
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
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  nextPlayer() {
    this.game.players.push(this.game.players.shift());
  }

  randomDegOffset() {
    this.game.playingStack.forEach((e) => {
      this.deg.push(getRandomArbitrary(360, 720));
      this.xOffset.push(getRandomArbitrary(20, 80));
      this.yOffset.push(getRandomArbitrary(20, 80));
    });
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

/**
 * generate random number; for example use 0.1 to 3
 * but you can use 0 to infinite ( however, that makes no sense)
 * @param {Number} min
 * @param {Number} max
 * @returns random number between min and max
 */
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
