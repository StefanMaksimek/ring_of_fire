import { GameComponent } from 'src/app/game/game.component';

export class Game {
  public players: any[] = [
    {
      name: 'Bockwuerst',
      icon: 'angel.png',
    },
    {
      name: 'TortenToni',
      icon: 'thumbs_up.png',
    },
    {
      name: 'GürtelGustav',
      icon: 'kiss.png',
    },
    {
      name: 'KantholzToni',
      icon: 'sleep.png',
    },
    {
      name: 'AstraRakete',
      icon: 'sweat_heart.png',
    },
  ];
  public playingStack: string[] = [];
  public playedCards: string[] = [];
  public curentPlayer: number = 0;

  constructor() {}
}
