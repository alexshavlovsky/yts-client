import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent, merge, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {CommentsDataSource} from '../core/datasources/comments-data-source';
import {CommentsService} from '../core/rest/comments.service';
import {PageableRequest} from '../core/model/pageable-request';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements AfterViewInit {

  dataSource: CommentsDataSource;

  columnsSpec = [
    {title: 'Author', property: 'authorText', class: 'a-left flex2'},
    {title: 'Comment', property: 'text', class: 'a-left flex8'},
    {title: 'Likes', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1'},
  ];

  displayedColumns = this.columnsSpec.map(column => column.property);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  constructor(private commentService: CommentsService,
              private snackBar: MatSnackBar) {
    this.dataSource = new CommentsDataSource(this.commentService);
  }

  ngAfterViewInit(): void {
    merge(
      of(true), // this value triggers initial data request
      this.paginator.page.pipe(map(_ => false)),
      this.sort.sortChange.pipe(map(_ => true)),
      fromEvent(this.input.nativeElement, 'change').pipe(map(_ => true)),
      fromEvent(this.input.nativeElement, 'keyup').pipe(map(_ => true)),
    ).pipe(
      debounceTime(500),
      map(resetPaginator => this.buildQuery(resetPaginator)),
      distinctUntilChanged((a, b) =>
        a.pageIndex === b.pageIndex &&
        a.pageSize === b.pageSize &&
        a.sortProperty === b.sortProperty &&
        a.sortDirection === b.sortDirection &&
        a.filter === b.filter
      ),
      tap(query => this.loadData(query))
    ).subscribe();
    this.dataSource.error$.subscribe(message => this.snackBar.open(message, 'close'));
  }

  buildQuery(resetPaginator: boolean): PagedSortedFilteredQuery {
    const filter: string = this.input.nativeElement.value;
    const doFilter: boolean = filter.length > 0;
    const sortDirection: string = this.sort.direction;
    const doSort: boolean = (sortDirection !== '') && doFilter;
    return {
      pageIndex: resetPaginator ? 0 : this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      sortProperty: doSort ? this.sort.active : undefined,
      sortDirection: doSort ? sortDirection : undefined,
      filter
    };
  }

  loadData(query: PagedSortedFilteredQuery): void {
    this.dataSource.load(
      new PageableRequest(query.pageIndex, query.pageSize, query.sortProperty, query.sortDirection), {text: query.filter}
    );
  }

}

interface PagedSortedFilteredQuery {
  pageIndex: number;
  pageSize: number;
  sortProperty: string | undefined;
  sortDirection: string | undefined;
  filter: string;
}
