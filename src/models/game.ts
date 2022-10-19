import { GameComponent } from 'src/app/game/game.component';

export class Game {
  public players: any[] = [
    {
      name: 'Bockwuerst',
      icon: 'angel.png',
      color: 'red',
    },
    {
      name: 'TortenToni',
      icon: 'thumbs_up.png',
      color: 'hsl(345, 100%, 38%)',
    },
    {
      name: 'GürtelGustav',
      icon: 'kiss.png',
      color: 'hsl(42, 100%, 71%)',
    },
    {
      name: 'KantholzToni',
      icon: 'sleep.png',
      color: 'yellow',
    },
    {
      name: 'AstraRakete',
      icon: 'sweat_heart.png',
      color: 'green',
    },
  ];
  public playingStack: string[] = [];
  public playedCards: string[] = [];
  public curentPlayer: number = 0;

  gameC: GameComponent = new GameComponent();
  constructor() {
    this.renderCardStack();
    shuffleStack(this.playingStack);
  }

  renderCardStack() {
    this.gameC.cards.colors.forEach((color: any) => {
      this.setColor(color);
    });
  }

  setColor(color: any) {
    this.gameC.cards.numbers.forEach((number) => {
      this.playingStack.push(color + '_' + number);
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
