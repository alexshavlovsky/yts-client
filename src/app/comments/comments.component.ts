import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CommentsDataSource} from '../core/datasources/comments-data-source';
import {CommentsService} from '../core/rest/comments.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ColumnSpec, YT_CHANNEL_LINK_BUILDER, YT_COMMENT_LINK_BUILDER} from '../core/table-connector/column-spec';
import {MatTableConnectorService} from '../core/table-connector/mat-table-connector.service';
import {AbstractDataSource} from '../core/datasources/abstract-data-source';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements AfterViewInit, OnDestroy {

  constructor(private commentService: CommentsService,
              private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService) {
    this.dataSource = new CommentsDataSource(this.commentService);
  }

  dataSource: AbstractDataSource<any>;
  isSearchOn = false;
  matConnectorSubscription!: Subscription;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Author', property: 'authorText', class: 'a-left flex2',
      linkBuilder: {idKey: 'channelId', builder: YT_CHANNEL_LINK_BUILDER}
    },
    {
      title: 'Comment', property: 'text', class: 'a-left flex8',
      biLinkBuilder: {idKey1: 'videoId', idKey2: 'commentId', builder: YT_COMMENT_LINK_BUILDER}
    },
    {title: 'Likes', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1'},
  ];

  displayedColumns = this.columnsSpec.map(column => column.property);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('input', {static: true}) input!: ElementRef;

  ngAfterViewInit(): void {
    this.matConnectorSubscription = this.matTableAdapterService
      .connect(this.paginator, this.sort, this.input, this.dataSource).subscribe();
    this.dataSource.error$.subscribe(message => this.snackBar.open(message, 'close'));
  }

  ngOnDestroy(): void {
    this.matConnectorSubscription.unsubscribe();
  }

}
