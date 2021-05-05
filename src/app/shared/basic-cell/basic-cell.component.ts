import {Component, Input, OnInit} from '@angular/core';
import {ColumnSpec, ContextMenuItemBuilder} from '../../core/preset/column-spec';
import {MatMenu} from '@angular/material/menu';
import {DatePipe} from '@angular/common';
import {ContextMenu, ContextMenuItem} from '../../core/preset/context-menu';

@Component({
  selector: 'app-basic-cell',
  templateUrl: './basic-cell.component.html',
  styleUrls: ['./basic-cell.component.css']
})
export class BasicCellComponent implements OnInit {

  @Input() spec!: ColumnSpec;
  @Input() ctxMenu!: MatMenu;
  @Input() el: any;
  link: string | undefined;
  text: string | undefined;
  ctxMenuData: ContextMenu | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.text = this.spec.hideText ? '' : this.spec.formatDate ?
      new DatePipe('en-US').transform(this.el[this.spec.property], this.spec.formatDate) :
      this.el[this.spec.property];
    if (this.spec.linkBuilder) {
      const lb = this.spec.linkBuilder;
      this.link = lb.builder(this.el[lb.idKey]);
    }
    if (this.spec.biLinkBuilder) {
      const lb = this.spec.biLinkBuilder;
      this.link = lb.builder(this.el[lb.idKey1], this.el[lb.idKey2]);
    }
    if (this.ctxMenu && this.spec.ctxMenuBuilder) {
      const builders = this.spec.ctxMenuBuilder.itemBuilders;
      this.ctxMenuData = {
        items: builders.map((builder: ContextMenuItemBuilder): ContextMenuItem => ({
          name: builder.name,
          icon: builder.icon,
          action: builder.actionBuilderStrategy(this.el)
        }))
      };
    }
  }

}
