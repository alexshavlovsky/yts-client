import {AfterContentInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableConnectorService} from '../../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../../core/table-connector/generic-paged-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {AbstractPagedService} from '../../core/rest/abstact-paged.service';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';

@Component({
  selector: 'app-rich-table',
  templateUrl: './rich-table.component.html',
  styleUrls: ['./rich-table.component.css']
})
export class RichTableComponent<T> implements AfterContentInit, OnDestroy {

  constructor(private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService<T>,
              private titleService: Title) {
  }

  dataSource: GenericPagedDataSource<T> = new GenericPagedDataSource(null);
  isSearchOn = false;

  @Input() tableTitle!: string;
  @Input() columnsSpec!: ColumnSpec[];
  @Input() service!: AbstractPagedService<T>;
  @Input() standalone!: boolean;
  @Input() staticQuery!: QuerySpec;

  displayedColumns!: string[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  sub = new Subscription();

  ngAfterContentInit(): void {
    if (!this.standalone) {
      this.titleService.setTitle(this.tableTitle);
    }
    this.displayedColumns = this.columnsSpec.map(column => column.property);
    this.dataSource = new GenericPagedDataSource<T>(this.service);
    this.sub.add(this.matTableAdapterService
      .connect(this.paginator, this.sort, this.input, this.dataSource, this.staticQuery ? this.staticQuery : {}).subscribe());
    this.sub.add(this.dataSource.error$.subscribe(message => this.snackBar.open(message, 'close')));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  hideSearchBar(): void {
    this.isSearchOn = false;
    this.input.nativeElement.value = '';
    this.input.nativeElement.dispatchEvent(new Event('input'));
  }

}
