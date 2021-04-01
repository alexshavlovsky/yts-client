import {Component, Input, OnInit} from '@angular/core';
import {ColumnSpec} from '../column-spec';

@Component({
  selector: 'app-basic-cell',
  templateUrl: './basic-cell.component.html',
  styleUrls: ['./basic-cell.component.css']
})
export class BasicCellComponent implements OnInit {

  @Input() spec!: ColumnSpec;
  @Input() el: any;
  link: string | undefined;
  text: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.text = this.el[this.spec.property];
    if (this.spec.linkBuilder) {
      const lb = this.spec.linkBuilder;
      this.link = lb.builder(this.el[lb.idKey]);
    }
    if (this.spec.biLinkBuilder) {
      const lb = this.spec.biLinkBuilder;
      this.link = lb.builder(this.el[lb.idKey1], this.el[lb.idKey2]);
    }
  }

}
