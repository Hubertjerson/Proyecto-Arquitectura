import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentPayRoutingModule } from './appointment-pay-routing.module';
import { AppointmentPayComponent } from './appointment-pay.component';
import { ListAppointmentPayComponent } from './list-appointment-pay/list-appointment-pay.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppointmentPayComponent,
    ListAppointmentPayComponent
  ],
  imports: [
    CommonModule,
    AppointmentPayRoutingModule,
    SharedModule,
    // 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class AppointmentPayModule { }
