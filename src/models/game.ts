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

  loadImages() {
    this.playingStack.forEach((card) => {
      let img = new Image();
      img.src = `assets/img/cards/${card}.png`;
    });
  }
}
