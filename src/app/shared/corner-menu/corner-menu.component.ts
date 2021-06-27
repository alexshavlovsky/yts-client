import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import {AddChannelDialogComponent, ChannelDialogPayload} from './add-channel-dialog/add-channel-dialog.component';
import {catchError, filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {ChannelsService} from '../../core/rest/channels.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../core/snack-bar.service';
import {Validators} from '@angular/forms';


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
    const data: ChannelDialogPayload = {
      channelIdInput: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      numberOfThreads: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      executorTimeoutValue: [1, [Validators.required, Validators.min(1), Validators.max(10000)]],
      executorTimeoutUnit: 'hour',
      commentOrder: 'newest',
      videoLimit: ['Unrestricted', [Validators.required, Validators.pattern('^Unrestricted$|(^[0-9]+$)')]],
      commentLimit: ['Unrestricted', [Validators.required, Validators.pattern('^Unrestricted$|(^[0-9]+$)')]],
      replyLimit: ['Unrestricted', [Validators.required, Validators.pattern('^Unrestricted$|(^[0-9]+$)')]]
    };
    this.dialog.open(AddChannelDialogComponent, {data, restoreFocus: false}).afterClosed().pipe(
      filter((payload: ChannelDialogPayload) => payload !== undefined),
      flatMap(request => this.channelsService.addChannel(request)),
      catchError(err => this.snackBarService.showHttpError(err))
    ).subscribe(response => {
      this.snackBarService.showMessage(response.message);
      this.router.navigate(['/channels', response.entityId]);
    });
  }

}
