import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {CommentsDataSource} from '../core/datasources/comments-data-source';
import {CommentsService} from '../core/rest/comments.service';
import {PageableRequest} from '../core/model/pageable-request';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  dataSource: CommentsDataSource;

  displayedColumns = ['seqNo', 'description', 'duration'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @ViewChild('input', {static: true}) input!: ElementRef;

  constructor(private commentService: CommentsService) {
    this.dataSource = new CommentsDataSource(this.commentService);
  }

  ngOnInit(): void {
    this.dataSource.load(new PageableRequest(0, 10, 'text'));
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.pipe(
      tap(s => console.log(s))
    ).subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadLessonsPage();
      })
    ).subscribe();

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.loadLessonsPage())
    ).subscribe();
  }

  loadLessonsPage(): void {
    this.dataSource.load(
      new PageableRequest(this.paginator.pageIndex, this.paginator.pageSize, 'text', this.sort.direction),
      {text: this.input.nativeElement.value}
    );
  }

}
