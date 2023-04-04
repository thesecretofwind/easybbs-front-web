import { Component, Input, OnInit } from '@angular/core';
import { IHeaderBoard } from 'src/app/services/http.type';

@Component({
  selector: 'app-board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss']
})
export class BoardContentComponent implements OnInit {
  @Input() tags: IHeaderBoard[] = [];
  @Input() pageNo?: number
  @Input() pBoardId ?: number;
  @Input() boardId!: number;
  @Input() orderType: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
