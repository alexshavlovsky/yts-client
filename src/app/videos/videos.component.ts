import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableConnectorService} from '../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../core/datasources/generic-paged-data-source';
import {ColumnSpec, DEF_CHANNEL_LINK_BUILDER, DEF_VIDEO_LINK_BUILDER} from '../core/table-connector/column-spec';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {VideosService} from '../core/rest/videos.service';
import {VideoResponse} from '../core/model/video-response.model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements AfterViewInit, OnDestroy {

  constructor(private channelsService: VideosService,
              private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService<VideoResponse>) {
    this.dataSource = new GenericPagedDataSource<VideoResponse>(this.channelsService);
  }

  dataSource: GenericPagedDataSource<VideoResponse>;
  isSearchOn = false;

  columnsSpec: ColumnSpec[] = [
    {title: 'Channel', property: 'channelId', class: 'a-left flex2', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Title', property: 'title', class: 'a-left flex4', linkBuilder: DEF_VIDEO_LINK_BUILDER},
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1'},
    {title: 'View count', property: 'viewCountText', class: 'a-left flex1'},
    {title: 'Comment count', property: 'totalCommentCount', class: 'a-left flex1'},
  ];

  displayedColumns = this.columnsSpec.map(column => column.property);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  sub = new Subscription();

  ngAfterViewInit(): void {
    this.sub.add(this.matTableAdapterService.connect(this.paginator, this.sort, this.input, this.dataSource).subscribe());
    this.sub.add(this.dataSource.error$.subscribe(message => this.snackBar.open(message, 'close')));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
