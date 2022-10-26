import { OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export class Game {
  public id: any;
  public json = this.toJson();

  public players: Array<any> = [];
  public playingStack: string[] = [];
  public playedCards: string[] = [];
  public curentPlayer: number = 0;
  public currentCard: any = '';
  public deg: number[] = [];
  public xOffset: number[] = [];
  public yOffset: number[] = [];

  constructor() {}
  public toJson() {
    return {
      players: this.players,
      playingStack: this.playingStack,
      playedCards: this.playedCards,
      curentPlayer: this.curentPlayer,
      currentCard: this.currentCard,
      deg: this.deg,
      xOffset: this.xOffset,
      yOffset: this.yOffset,
    };
  }
}
