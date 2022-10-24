import { GameComponent } from 'src/app/game/game.component';

export class Game {
  public players: any[] = [];
  public playingStack: string[] = [];
  public playedCards: string[] = [];
  public curentPlayer: number = 0;

  constructor() {}
}
