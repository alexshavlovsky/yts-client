import {AfterContentInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableConnectorService} from '../../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../../core/table-connector/generic-paged-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EMPTY, Subscription} from 'rxjs';
import {AbstractPagedService} from '../../core/rest/abstact-paged.service';
import {Title} from '@angular/platform-browser';
import {QuerySpec} from '../../core/model/query-spec.model';
import {ContextMenuAction} from '../../core/preset/context-menu';
import {Router} from '@angular/router';
import {ChannelsService} from '../../core/rest/channels.service';
import {catchError} from 'rxjs/operators';
import {VideosService} from '../../core/rest/videos.service';

@Component({
  selector: 'app-rich-table',
  templateUrl: './rich-table.component.html',
  styleUrls: ['./rich-table.component.css']
})
export class RichTableComponent<T> implements AfterContentInit, OnDestroy {

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private matTableAdapterService: MatTableConnectorService<T>,
              private channelsService: ChannelsService,
              private videosService: VideosService,
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
      catchError(error => {
        this.snackBar.open(error.message, 'close');
        return EMPTY;
      })
    ).subscribe(response => {
      this.snackBar.open(`Channel ${response.channelId} scheduled for update`, 'close');
      this.router.navigate(['/channels', response.channelId]);
    });
  }

  private updateVideo(videoId: string): void {
    this.videosService.updateVideo({videoId}).pipe(
      catchError(error => {
        this.snackBar.open(error.message, 'close');
        return EMPTY;
      })
    ).subscribe(response => {
      this.snackBar.open(`Video ${response.videoId} scheduled for update`, 'close');
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

}
