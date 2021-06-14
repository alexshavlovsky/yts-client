import {AfterContentInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {MatTableConnectorService} from '../../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../../core/table-connector/generic-paged-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {AbstractPagedService} from '../../core/rest/abstact-paged.service';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';
import {ContextMenuAction} from '../../core/preset/context-menu';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {catchError} from 'rxjs/operators';
import {VideosService} from '../../core/rest/videos.service';
import {SnackBarService} from '../../core/snack-bar.service';
import {PagedSortedFilteringQuery} from '../../core/table-connector/paged-sorted-filtering-query';

@Component({
  selector: 'app-rich-table',
  templateUrl: './rich-table.component.html',
  styleUrls: ['./rich-table.component.css']
})
export class RichTableComponent<T> implements AfterContentInit, OnInit, OnDestroy {

  constructor(private snackBarService: SnackBarService,
              private router: Router,
              private matTableAdapterService: MatTableConnectorService<T>,
              private channelsService: ChannelsService,
              private videosService: VideosService,
              private titleService: Title,
              private changeDetectionRef: ChangeDetectorRef
  ) {
  }

  dataSource: GenericPagedDataSource<T> = new GenericPagedDataSource(null);
  isSearchOn = false;
  initialPagination: number[] = [0, 5];

  @Input() tableTitle!: string;
  @Input() columnsSpec!: ColumnSpec[];
  @Input() service!: AbstractPagedService<T>;
  @Input() standalone!: boolean;
  @Input() staticQuery!: QuerySpec;
  @Input() activatedRoute!: ActivatedRoute;

  displayedColumns!: string[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  sub = new Subscription();

  ngOnInit(): void {
    // get sort and paginator settings from query params
    if (this.activatedRoute) {
      const qp = this.activatedRoute.snapshot.queryParams;
      if (qp.pageIndex && qp.pageSize) {
        this.initialPagination = [qp.pageIndex, qp.pageSize];
      }
      if (qp.sortProperty && qp.sortDirection) {
        this.sort.sort({id: qp.sortProperty, start: qp.sortDirection, disableClear: false});
      }
    }
  }

  ngAfterContentInit(): void {
    if (!this.standalone) {
      this.titleService.setTitle(this.tableTitle);
    }
    this.displayedColumns = this.columnsSpec.map(column => column.property);
    this.dataSource = new GenericPagedDataSource<T>(this.service);
    this.sub.add(this.matTableAdapterService
      .connect(this.initialPagination, this.activatedRoute, this.router,
        this.paginator, this.sort, this.input, this.dataSource, this.staticQuery ? this.staticQuery : {})
      .subscribe(q => this.queryChanged(q)));
    this.sub.add(this.dataSource.error$.subscribe(error => this.snackBarService.showHttpError(error)));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showSearchBar(): void {
    this.isSearchOn = true;
    this.changeDetectionRef.detectChanges();
    this.input.nativeElement.focus();
  }

  hideSearchBar(): void {
    this.isSearchOn = false;
    this.input.nativeElement.value = '';
    this.input.nativeElement.dispatchEvent(new Event('input'));
  }

  ctxMenuAction(action: ContextMenuAction): void {
    switch (action.type) {
      case 'ROUTE':
        this.navigate(action.payload);
        break;
      case 'UPDATE_CHANNEL':
        this.updateChannel(action.payload);
        break;
      case 'UPDATE_VIDEO':
        this.updateVideo(action.payload);
        break;
      default:
        console.warn('Unsupported ctx-menu action', action);
    }
  }

  private updateChannel(channelId: string): void {
    this.channelsService.updateChannel({channelId}).pipe(
      catchError(err => this.snackBarService.showHttpError(err))
    ).subscribe(response => {
      this.snackBarService.showMessage(response.message);
      this.router.navigate(['/channels', response.entityId]);
    });
  }

  private updateVideo(videoId: string): void {
    this.videosService.updateVideo({videoId}).pipe(
      catchError(err => this.snackBarService.showHttpError(err))
    ).subscribe(response => {
      this.snackBarService.showMessage(response.message);
//      this.router.navigate(['/videos', response.videoId]);
    });
  }

  private navigate(url: string): void {
    if (url.startsWith('/')) {
      this.router.navigate([url]);
    } else {
      window.open(url, '_blank');
    }
  }

  queryChanged(query: PagedSortedFilteringQuery): void {
    if (!this.activatedRoute) {
      return;
    }
    const params: Params = {...query};
    if (!(params.sortProperty && params.sortDirection)) {
      delete params.sortProperty;
      delete params.sortDirection;
    }
    if (!params.filter || params.filter === '') {
      delete params.filter;
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params
      });
  }

}
