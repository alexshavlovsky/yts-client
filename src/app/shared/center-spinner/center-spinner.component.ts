import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-center-spinner',
  templateUrl: './center-spinner.component.html',
  styleUrls: ['./center-spinner.component.css']
})
export class CenterSpinnerComponent implements OnInit {

  @Input() show!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
