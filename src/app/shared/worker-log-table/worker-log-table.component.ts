import {Component, Input, OnInit} from '@angular/core';
import {WorkerLogResponse} from '../../core/model/worker-log-response.model';

@Component({
  selector: 'app-worker-log-table',
  templateUrl: './worker-log-table.component.html',
  styleUrls: ['./worker-log-table.component.css']
})
export class WorkerLogTableComponent implements OnInit {

  @Input() log!: WorkerLogResponse[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
