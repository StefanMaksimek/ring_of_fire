import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  name: string = '';
  selectedIcon: string = 'angel.png';

  icons: string[] = [
    'angel.png',
    'thumbs_up.png',
    'kiss.png',
    'sleep.png',
    'kiss2.png',
    'sweat_heart.png',
  ];

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }
}
