import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
} from '@firebase/firestore';
import { Game } from 'src/models/game';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  public gameCollection: CollectionReference<DocumentData>;

  constructor(private router: Router, private firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {}

  newGame() {
    let game = new Game();
    addDoc(this.gameCollection, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
