import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-share-game',
  templateUrl: './share-game.component.html',
  styleUrls: ['./share-game.component.scss'],
})
export class ShareGameComponent implements OnInit {
  public path: string = window.location.href;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
