import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent implements OnInit {

  readonly userId = this.route.snapshot.paramMap.get('userId');

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

}
