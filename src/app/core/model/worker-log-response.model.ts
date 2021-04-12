import {ContextStatusResponse} from './context-status-response.model';

export interface WorkerLogResponse {
  id: number;
  contextStatus: ContextStatusResponse;
}
