import { Component, Input } from '@angular/core';
import { Badge } from '../badge/badge';
import { JsonPipe, NgClass } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'wot-order-strip',
  imports: [Badge, NgClass, CdkMenuModule],
  templateUrl: './order-strip.html',
  styleUrl: './order-strip.scss',
})
export class OrderStrip {
  @Input() order: any;

  onEdit(order: any) {
    console.log('Edit clicked', order);
  }
  onDelete(order: any) {
    console.log('Delete clicked', order);
  }
  updateStatus(order: any, status: any) {
    console.log({ order, status });
  }
}
