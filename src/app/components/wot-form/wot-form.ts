import { Component, inject, OnInit, signal } from '@angular/core';
import { NgbDateAdapter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbLuxonAdapter } from '../../services/luxon-adapter';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorage } from '../../services/local-storage';
import { SidePanelService } from '../../services/side-panel';
import { NgClass } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { WorkOrder } from '../../models/work-order.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'wot-form',
  imports: [NgbDatepickerModule, ReactiveFormsModule, NgClass, NgSelectModule],
  providers: [{ provide: NgbDateAdapter, useClass: NgbLuxonAdapter }],
  templateUrl: './wot-form.html',
  styleUrl: './wot-form.scss',
})
export class WotForm implements OnInit{
  fb = inject(FormBuilder);
  localStorage = inject(LocalStorage);
  sidePanelService = inject(SidePanelService);
  isPanelOpen = signal(false);


  createEditForm: FormGroup;

  orderStatus = [
    { value: 'open', label: 'Open' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'blocked', label: 'Blocked' },
  ];

  constructor() {
    this.createEditForm = this.fb.group({
      name: this.fb.control({ value: null, disabled: false }),
      status: this.fb.control({ value: null, disabled: false }),
      endDate: this.fb.control({ value: null, disabled: false }),
      startDate: this.fb.control({ value: null, disabled: false }),
    });
  }
  ngOnInit(): void {
    this.isPanelOpen = this.sidePanelService.isOpen;
  }

  closeSidePanel() {
    this.sidePanelService.close();
  }

  createOrder() {
    const formValues = this.createEditForm.value;
    const workCenterId = this.sidePanelService.activeData()?.workCenterId;
    const newOrder: WorkOrder = {
      docId: uuidv4(),
      docType: 'workOrder',
      data: {
        ...formValues,
        workCenterId
      }
    };
    console.log(newOrder);
    const workOrders: WorkOrder[] = this.localStorage.getItem('workOrders') ?? [];
    workOrders.push(newOrder);
    this.localStorage.setItem('workOrders', workOrders);    
  }
}
