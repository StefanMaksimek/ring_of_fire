import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

export interface DialogData {
  selectedIcon: string;
  name: string;
}

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

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
