import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit {
  @Input() email!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
