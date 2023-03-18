import { Component, OnInit } from '@angular/core';
import { titleList } from '../header/header.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  logoInfo = titleList
  constructor() { }

  ngOnInit(): void {
  }

}
