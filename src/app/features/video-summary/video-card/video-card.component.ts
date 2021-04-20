import {Component, Input, OnInit} from '@angular/core';
import {VideoSummaryResponse} from '../../../core/model/video-response.model';
import {YT_VIDEO_LINK_BUILDER_STRATEGY} from '../../../core/table-connector/column-spec';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input() summary!: VideoSummaryResponse;
  link?: string;

  constructor() {
  }

  ngOnInit(): void {
    this.link = YT_VIDEO_LINK_BUILDER_STRATEGY(this.summary.video.videoId);
  }

}
