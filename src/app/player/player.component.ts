import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() icon!: string;
  @Input() name!: string;
  @Input() playerActive: boolean = false;
  @Input() index!: number;
  @Input() players!: number;
  constructor() {}

  ngOnInit(): void {}
}
