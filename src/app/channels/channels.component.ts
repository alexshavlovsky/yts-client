import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableConnectorService} from '../core/table-connector/mat-table-connector.service';
import {AbstractDataSource} from '../core/datasources/abstract-data-source';
import {Subscription} from 'rxjs';
import {ColumnSpec, YT_CHANNEL_LINK_BUILDER} from '../core/table-connector/column-spec';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChannelsService} from '../core/rest/channels.service';
import {ChannelsDataSource} from '../core/datasources/channels-data-source';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements AfterViewInit, OnDestroy {

  constructor(private channelsService: ChannelsService,
              private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService) {
    this.dataSource = new ChannelsDataSource(this.channelsService);
  }

  dataSource: AbstractDataSource<any>;
  isSearchOn = false;
  matConnectorSubscription!: Subscription;

  columnsSpec: ColumnSpec[] = [
    {
      title: 'Vanity name', property: 'channelVanityName', class: 'a-left flex4',
      linkBuilder: {idKey: 'channelId', builder: YT_CHANNEL_LINK_BUILDER}
    },
    {
      title: 'Title', property: 'title', class: 'a-left flex4',
      linkBuilder: {idKey: 'channelId', builder: YT_CHANNEL_LINK_BUILDER}
    },
    {title: 'Video count', property: 'videoCount', class: 'a-left flex1'},
    {title: 'Subscribers', property: 'subscriberCount', class: 'a-left flex1'},
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
