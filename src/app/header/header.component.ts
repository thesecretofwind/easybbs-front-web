import { Component, OnInit } from '@angular/core';
import { Title } from './header.type';

const titleList: Title[] = [
  {
    letter: 'E',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'a',
    color: 'rgb(251, 54, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
  {
    letter: 'y',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'b',
    color: 'rgb(37, 178, 78)'
  },
  {
    letter: 'b',
    color: 'rgb(253, 50, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoInfo = titleList
  constructor() { }

  ngOnInit(): void {
  }

}
