import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ChannelDialogData {
  title: string;
  channelIdPlaceholder: string;
  channelIdCurrent: string;
  cancelButton: string;
  confirmButton: string;
}

export interface ChannelDialogPayload {
  newChannelId: string;
}

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.css']
})
export class AddChannelDialogComponent implements OnInit {

  form!: FormGroup;
  data: ChannelDialogData;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      channelIdInput: [this.data.channelIdCurrent, []],
    });
  }

  confirm(): void {
    const payload: ChannelDialogPayload = {
      newChannelId: this.form.value.channelIdInput
    };
    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }

}
