import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableConnectorService} from '../core/table-connector/mat-table-connector.service';
import {GenericPagedDataSource} from '../core/datasources/generic-paged-data-source';
import {Subscription} from 'rxjs';
import {ColumnSpec, DEF_CHANNEL_LINK_BUILDER} from '../core/table-connector/column-spec';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChannelsService} from '../core/rest/channels.service';
import {ChannelResponse} from '../core/model/channel-response.model';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements AfterViewInit, OnDestroy {

  constructor(private channelsService: ChannelsService,
              private snackBar: MatSnackBar,
              private matTableAdapterService: MatTableConnectorService<ChannelResponse>) {
    this.dataSource = new GenericPagedDataSource<ChannelResponse>(this.channelsService);
  }

  dataSource: GenericPagedDataSource<ChannelResponse>;
  isSearchOn = false;

  columnsSpec: ColumnSpec[] = [
    {title: 'Vanity name', property: 'channelVanityName', class: 'a-left flex4', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Title', property: 'title', class: 'a-left flex4', linkBuilder: DEF_CHANNEL_LINK_BUILDER},
    {title: 'Video count', property: 'videoCount', class: 'a-left flex1'},
    {title: 'Subscribers', property: 'subscriberCount', class: 'a-left flex1'},
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
