import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkOrderStatus } from '../../models/timeline';

@Component({
  selector: 'wot-badge',
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  @Input() status: WorkOrderStatus = 'in-progress';
}
