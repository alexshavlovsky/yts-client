import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VideoSummaryResponse} from '../../../core/model/video-response.model';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {

  @Input() summary!: VideoSummaryResponse;
  @Output() event: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

}
