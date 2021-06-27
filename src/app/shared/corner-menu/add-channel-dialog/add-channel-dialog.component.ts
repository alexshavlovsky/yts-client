import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ChannelDialogPayload {
  channelIdInput: any;
  numberOfThreads: any;
  executorTimeoutValue: any;
  executorTimeoutUnit: any;
  commentOrder: any;
  videoLimit: any;
  commentLimit: any;
  replyLimit: any;
}

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.css']
})
export class AddChannelDialogComponent implements OnInit {

  flexDef = '0 1 calc(33.3% - 16px)';
  flexLtMd = '0 1 calc(50% - 16px)';
  flexLtSm = '100%';

  form!: FormGroup;
  data: ChannelDialogPayload;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: ChannelDialogPayload) {
    this.data = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group(this.data);
  }

  confirm(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.getRawValue() as ChannelDialogPayload;
    this.dialogRef.close(data);
  }

  close(): void {
    this.dialogRef.close();
  }

  default(): void {
    const res: any = {};
    for (const [k, v] of Object.entries(this.data)) {
      res[k] = v instanceof Array ? v[0] : v;
    }
    this.form.patchValue(res);
  }

}
