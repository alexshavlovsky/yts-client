import {AfterContentInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {MatTableConnectorService} from '../../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../../core/table-connector/generic-paged-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EMPTY, merge, Observable, of, Subscription} from 'rxjs';
import {AbstractPagedService} from '../../core/rest/abstact-paged.service';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';
import {ContextMenuAction} from '../../core/preset/context-menu';
import {ActivatedRoute, NavigationStart, Params, Router} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {catchError, tap} from 'rxjs/operators';
import {VideosService} from '../../core/rest/videos.service';
import {SnackBarService} from '../../core/snack-bar.service';
import {flatMap} from 'rxjs/internal/operators';
import {PagedSortedQuery} from '../../core/table-connector/paged-sorted-filtering-query';

@Component({
  selector: 'app-rich-table',
  templateUrl: './rich-table.component.html',
  styleUrls: ['./rich-table.component.css']
})
export class RichTableComponent<T> implements AfterContentInit, OnDestroy {

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
  defaultPageSize = 5;
  defaultPagination = [0, this.defaultPageSize];

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

  ngAfterContentInit(): void {
    if (!this.standalone) {
      this.titleService.setTitle(this.tableTitle);
    }
    this.displayedColumns = this.columnsSpec.map(column => column.property);
    this.dataSource = new GenericPagedDataSource<T>(this.service);

    // parse the initial and popstate query params, update the matSort and trigger the datasource update
    // only if the activatedRoute input property is present
    const paginationEvents: Observable<number[]> = this.activatedRoute ?
      merge(
        of(this.parseQueryParamsAndUpdateSort(this.activatedRoute.snapshot.queryParams)),
        this.router.events.pipe(
          flatMap(e => e instanceof NavigationStart && e.navigationTrigger === 'popstate' ?
            of(this.parseQueryParamsAndUpdateSort(this.router.parseUrl(e.url).queryParams)) : EMPTY
          )
        ))
      :
      of(this.defaultPagination);

    this.sub.add(
      this.matTableAdapterService
        .connect(paginationEvents, this.paginator, this.sort, this.input).pipe(
        tap(query => this.dataSource.load(query, this.staticQuery ? this.staticQuery : {})),
        tap(query => query.updateRouter(this.activatedRoute, this.router, this.defaultPagination))
      ).subscribe()
    );
    this.sub.add(
      this.dataSource.error$.subscribe(error => this.snackBarService.showHttpError(error))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showSearchBar(text: string): void {
    this.isSearchOn = true;
    if (this.input.nativeElement.value !== text) {
      this.input.nativeElement.value = text;
      this.input.nativeElement.dispatchEvent(new Event('input'));
    }
    this.changeDetectionRef.detectChanges();
    this.input.nativeElement.focus();
  }

  hideSearchBar(): void {
    if (!this.isSearchOn) {
      return;
    }
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

  parseQueryParamsAndUpdateSort(qp: Params): number[] {
    // TODO parse and update search panel state
    const current = PagedSortedQuery.getSortFromMatSort(this.sort);
    const next = PagedSortedQuery.getSortFromParams(qp);
    if (current.active !== next.active || current.direction !== next.direction) {
      if (next.active !== '' && next.direction !== '') {
        this.sort.sort({id: next.active, start: next.direction, disableClear: false});
      } else {
        this.sort.sort({id: '', start: 'asc', disableClear: false});
      }
    }
    if (qp.text && qp.text !== '') {
      this.showSearchBar(qp.text);
    } else {
      this.hideSearchBar();
    }
    return qp.pageIndex && qp.pageSize ? [Number(qp.pageIndex), Number(qp.pageSize)] : this.defaultPagination;
  }

}
