import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  collection,
  CollectionReference,
  DocumentData,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ShareGameComponent } from '../share-game/share-game.component';

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

  pickCardAnimation: boolean = false;

  name: string = '';
  selectedIcon: string = 'angel.png';

  public gameCollection: CollectionReference<DocumentData>;

  constructor(
    public dialog: MatDialog,
    public firestore: Firestore,
    private route: ActivatedRoute
  ) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.newGame();
    this.setGameId();
    this.updateGame();
    this.getGame();
  }

  getGame() {
    const gameRef = collection(this.firestore, 'games');
    docData(doc(gameRef, this.game.id)).subscribe((game: any) => {
      this.game.players = game.players;
      this.game.playingStack = game.playingStack;
      this.game.playedCards = game.playedCards;
      this.game.curentPlayer = game.curentPlayer;
      this.game.currentCard = game.currentCard;
      this.game.deg = game.deg;
      this.game.xOffset = game.xOffset;
      this.game.yOffset = game.yOffset;
    });
  }

  updateGame() {
    const gameRef = collection(this.firestore, 'games');
    setDoc(doc(gameRef, this.game.id), this.game.toJson());
  }

  setGameId() {
    this.route.params.subscribe((params: any) => {
      this.game.id = params.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name, selectedIcon: this.selectedIcon },
    });

    dialogRef.afterClosed().subscribe((data): void => {
      if (data && data.name.length > 0) {
        let player = { name: data.name, icon: data.selectedIcon };
        this.game.players.push(player);
        this.updateGame();
      }
    });
  }

  newGame() {
    this.game = new Game();
    this.renderPlayingStack();
    this.randomDegOffset();
    this.game.loadImages();
  }

  restart() {
    this.game.playingStack = [];
    this.game.playedCards = [];
    this.renderPlayingStack();
    this.updateGame();
  }

  shareGame() {
    const dialogRef = this.dialog.open(ShareGameComponent, {
      data: { gameID: this.game.id, url: 'url' },
    });
  }

  renderPlayingStack() {
    this.renderCardStack();
    shuffleStack(this.game.playingStack);
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
    if (this.game.players.length > 1) {
      if (!this.pickCardAnimation) {
        this.game.currentCard = this.game.playingStack.pop();
        this.pickCardAnimation = true;
        this.game.playedCards.push(this.game.currentCard);
        this.nextPlayer();
        this.updateGame();
        setTimeout(() => {
          this.pickCardAnimation = false;
          this.updateGame();
        }, 1000);
      }
    } else {
      this.openDialog();
    }
  }

  nextPlayer() {
    this.game.players.push(this.game.players.shift());
  }

  randomDegOffset() {
    this.game.playingStack.forEach((e) => {
      this.game.deg.push(getRandomArbitrary(360, 720));
      this.game.xOffset.push(getRandomArbitrary(20, 80));
      this.game.yOffset.push(getRandomArbitrary(20, 80));
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

/**
 *
 * @param length Integer for lenght of create Id
 * @returns a random "Id" with the lenght of @param lenght
 */
function createID(length: number) {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-;:_+*#%&$§';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); // adding one random character of characters to result
  }
  return result;
}
