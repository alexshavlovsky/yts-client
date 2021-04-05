import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CommentsService} from '../core/rest/comments.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ColumnSpec, DEF_CHANNEL_LINK_BUILDER, DEF_COMMENT_BI_LINK_BUILDER} from '../core/table-connector/column-spec';
import {MatTableConnectorService} from '../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../core/datasources/generic-paged-data-source';
import {Subscription} from 'rxjs';
import {CommentResponse} from '../core/model/comment-response.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements AfterViewInit, OnDestroy {

  constructor(private commentService: CommentsService,
              private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService<CommentResponse>) {
    this.dataSource = new GenericPagedDataSource<CommentResponse>(this.commentService);
  }

  dataSource: GenericPagedDataSource<CommentResponse>;
  isSearchOn = false;

  columnsSpec: ColumnSpec[] = [
    {title: 'Author', property: 'authorText', class: 'a-left flex2', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Comment', property: 'text', class: 'a-left flex8', biLinkBuilder: DEF_COMMENT_BI_LINK_BUILDER},
    {title: 'Likes', property: 'likeCount', class: 'a-left flex1'},
    {title: 'Published', property: 'publishedTimeText', class: 'a-left flex1'},
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

  hideSearchBar(): void {
    this.isSearchOn = false;
    this.input.nativeElement.value = '';
    this.input.nativeElement.dispatchEvent(new Event('input'));
  }

}
