import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() pageNo?: number
  @Input() pBoardId ?: number;
  @Input() boardId!: number;
  @Input() orderType: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
