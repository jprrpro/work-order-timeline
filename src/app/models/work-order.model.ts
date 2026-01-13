import { TimelineBaseDocument, WorkOrderStatus } from './timeline';

export interface WorkOrder extends TimelineBaseDocument {
  data: WorkOrderDetails;
}

export interface WorkOrderDetails {
  name: string;
  workCenterId: string;
  status: WorkOrderStatus;
  startDate: string;
  endDate: string;
}
