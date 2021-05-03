import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VideoSummaryResponse} from '../../../core/model/video-response.model';
import {YT_VIDEO_LINK_BUILDER_STRATEGY} from '../../../core/preset/link-builder.presets';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input() summary!: VideoSummaryResponse;
  link?: string;
  @Output() event: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.link = YT_VIDEO_LINK_BUILDER_STRATEGY(this.summary.video.videoId);
  }

}
