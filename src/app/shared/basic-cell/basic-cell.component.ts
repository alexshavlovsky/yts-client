import {Component, Input, OnInit} from '@angular/core';
import {ColumnSpec} from '../../core/table-connector/column-spec';
import {MatMenu} from '@angular/material/menu';
import {ContextMenuData, ContextMenuItem, ContextMenuItemBuilder} from '../rich-table/context-menu.data';

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
  ctxMenuData: ContextMenuData | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.text = this.spec.hideText ? '' : this.el[this.spec.property];
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
          link: builder.linkBuilder.builder(this.el[builder.linkBuilder.idKey])
        }))
      };
    }
  }

}
