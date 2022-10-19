import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() icon!: string;
  @Input() name!: string;
  @Input() color!: string;
  constructor() {}

  ngOnInit(): void {}
}
