import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StationDetailsModule } from './station-details/station-details.module';
import { JobNoDetailsModule } from './job-no-details/job-no-details.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { FaultTypeDetailsModule } from './fault-type-details/fault-type-details.module';
import { TicketDetailsModule } from './ticket-details/ticket-details.module';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { NotificationDetailsModule } from './notification-details/notification-details.module';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';
import { ViewTicketDetailsModule } from './view-ticket-details/view-ticket-details.module';
import { PartsMasterModule } from './parts-master/parts-master.module';



// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { ExceluploadComponent } from './excelupload/excelupload.component';
import { DeleteticketComponent } from './deleteticket/deleteticket.component';
import { AutocalculationComponent } from './autocalculation/autocalculation.component';
import { AutocalculationEscComponent } from './autocalculation-esc/autocalculation-esc.component';
import { CmrlautocalliftComponent } from './cmrlautocallift/cmrlautocallift.component';
import { CmrlautocalescComponent } from './cmrlautocalesc/cmrlautocalesc.component';
// import { PartsMasterComponent } from './parts-master/parts-master.component';
import { PreventiveMaintenanceComponent } from './preventive-maintenance/preventive-maintenance.component';
import { UploadMaintenanceDataComponent } from './preventive-maintenance/upload-maintenance-data/upload-maintenance-data.component';
import { EditDetailsComponent } from './preventive-maintenance/edit-details/edit-details.component';
// import { AddEditPartsMasterDetailsComponent } from './parts-master/add-edit-parts-master-details/add-edit-parts-master-details.component';
// import { AddPartsMasterComponent } from './parts-master/add-parts-master/add-parts-master.component';
// import { EditPartsMasterComponent } from './parts-master/edit-parts-master/edit-parts-master.component';
// import { AddEditTicketDetailsFormComponent } from './add-edit-ticket-details-form/add-edit-ticket-details-form.component';
// import { TicketDetailsComponent } from './ticket-details.component';
// import { AddTicketDetailsComponent } from './add-ticket-details/add-ticket-details.component';
// import { EditTicketDetailsComponent } from './edit-ticket-details/edit-ticket-details.component';




@NgModule({
  declarations: [DashboardComponent, ExceluploadComponent, DeleteticketComponent, AutocalculationComponent, AutocalculationEscComponent, CmrlautocalliftComponent, CmrlautocalescComponent,PreventiveMaintenanceComponent, UploadMaintenanceDataComponent, EditDetailsComponent ],
  imports: [
    StationDetailsModule,
    JobNoDetailsModule,
    UserDetailsModule,
    FaultTypeDetailsModule,
    PartsMasterModule,
    TicketDetailsModule,
    NotificationDetailsModule,
    ViewTicketDetailsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    NgbDropdownModule,
    UIModule,
    PagesRoutingModule,
    AppMaterialModules,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  entryComponents: [ EditDetailsComponent ]
})
export class PagesModule { }
