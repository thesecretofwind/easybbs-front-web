import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.scss']
})
export class UserCenterComponent implements OnInit {
  selectedIndex = 0;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedIndex = 2;
    }, 5000)
  }

}
