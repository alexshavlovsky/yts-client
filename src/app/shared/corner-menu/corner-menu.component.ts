import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {
  AddChannelDialogComponent,
  ChannelDialogData,
  ChannelDialogPayload
} from './add-channel-dialog/add-channel-dialog.component';
import {catchError, filter, map} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {ChannelsService} from '../../core/rest/channels.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../core/snack-bar.service';


@Component({
  selector: 'app-corner-menu',
  templateUrl: './corner-menu.component.html',
  styleUrls: ['./corner-menu.component.css']
})
export class CornerMenuComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(private dialog: MatDialog,
              private router: Router,
              private channelsService: ChannelsService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const data: ChannelDialogData = {
      title: 'Schedule a channel',
      channelIdPlaceholder: 'Channel ID',
      channelIdCurrent: '',
      cancelButton: 'Cancel',
      confirmButton: 'Confirm',
    };
    this.dialog.open(AddChannelDialogComponent, {data, restoreFocus: false}).afterClosed().pipe(
      filter((payload: ChannelDialogPayload) => payload !== undefined),
      map(payload => ({channelId: payload.newChannelId})),
      flatMap(request => this.channelsService.addChannel(request)),
      catchError(err => this.snackBarService.showHttpError(err))
    ).subscribe(response => {
      this.snackBarService.showMessage(response.message);
      this.router.navigate(['/channels', response.entityId]);
    });
  }

}
