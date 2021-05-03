import {Component} from '@angular/core';
import {ColumnSpec} from '../../core/preset/column-spec';
import {VideosService} from '../../core/rest/videos.service';
import {VIDEO_TABLE_PRESET} from '../../core/preset/rich-table.presets';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {

  constructor(private videosService: VideosService) {
  }

  tableTitle = 'Videos';

  service = this.videosService;

  columnsSpec: ColumnSpec[] = VIDEO_TABLE_PRESET;

}
