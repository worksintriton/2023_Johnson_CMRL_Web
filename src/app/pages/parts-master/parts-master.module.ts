import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from 'src/app/material.module';
import { PartsMasterComponent } from './parts-master.component';
import { AddEditPartsMasterDetailsComponent } from './add-edit-parts-master-details/add-edit-parts-master-details.component';
import { AddPartsMasterComponent } from './add-parts-master/add-parts-master.component';
import { EditPartsMasterComponent } from './edit-parts-master/edit-parts-master.component';




@NgModule({
    declarations: [
        PartsMasterComponent,
        AddEditPartsMasterDetailsComponent,
        AddPartsMasterComponent,
        EditPartsMasterComponent
    ],
    exports: [PartsMasterComponent],
    imports: [
        CommonModule,
        AppMaterialModules, 
        FormsModule,
        ReactiveFormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [  
        AddEditPartsMasterDetailsComponent,
        AddPartsMasterComponent,
        EditPartsMasterComponent
    ]

})




export class PartsMasterModule { }