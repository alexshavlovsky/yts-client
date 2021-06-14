import {Component} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {VideosService} from '../../core/rest/videos.service';
import {VIDEO_TABLE_PRESET} from '../../core/preset/rich-table.presets';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {

  constructor(private videosService: VideosService, private route: ActivatedRoute) {
  }

  activatedRoute = this.route;

  tableTitle = 'Videos';

  service = this.videosService;

  columnsSpec: ColumnSpec[] = VIDEO_TABLE_PRESET;

}
