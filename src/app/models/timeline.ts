export type DocType = 'workCenter' | 'workOrder';
export type WorkOrderStatus = 'open' | 'in-progress' | 'completed' | 'blocked';
export type ZoomLevel = 'day' | 'week' | 'month';
export interface TimelineBaseDocument {
  docId: string;
  docType: DocType;
  data: { [key: string]: any };
}
