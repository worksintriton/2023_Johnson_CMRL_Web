import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { User } from 'src/app/core/models/auth.models';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  isShowErrors: boolean = false;

  public addEditForm: FormGroup;
  user: User;
  constructor(public dialogRef: MatDialogRef<EditDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthenticationService,
    private fb: FormBuilder,
    private adminService: AdminModulesService,) { this.user = this.authService.currentUser(); }

  ngOnInit() {debugger
    var datas = this.data;
    this.addEditForm = this.fb.group({
      "_id":this.data._id,
      "month": [''],
      "type": [''],
      "location": [''],
      "escalatorId": [''],
      "jobNo": [''],
      "plannedDate": [''],
      "completedDate": [''],
      "componentsReplaced": [''],
      "partsDescription": [''],
      "qty": [''],
      "remarks": [''],
      "date_of_update": [''],
      "reportno":[''],
      "replacement_date":['']
    });
    this.fillForm(datas);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addEditForm.controls;
  }

  public save() {
    debugger
    this.isShowErrors = true;
    if (this.addEditForm.valid) {
      const enteredData = this.addEditForm.value;
      this.adminService.preventive_dataEdit(enteredData).subscribe(
        response => {
          this.success(response['Status']);
          this.dialogRef.close('Success');
        },
        (err: HttpErrorResponse) => {
          console.log("err", err)
          this.handleError(err);
        }
      )

    }
    else {

    }
  }

  private success(message) {
    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'success', });
    this.dialogRef.close('Success');
    // this.alertService.success('Saved successfully');
  }

  private handleError(error) {
    Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: error, icon: 'error', });
    this.dialogRef.close('Success');
    //  this.alertService.success(error);
  }

  private fillForm(parsedData) {
    debugger;
    var tempplanneddate = parsedData.plannedDate.slice(0, 10);
    console.log("tempplanneddate",tempplanneddate);
    this.addEditForm.patchValue({
      
    
      "month": parsedData.month,
      "type": parsedData.type,
      "location": parsedData.location,
      "escalatorId": parsedData.escalatorId,
      "jobNo": parsedData.jobNo,
      "plannedDate": tempplanneddate,
      "completedDate": parsedData.completedDate,
      "componentsReplaced": parsedData.componentsReplaced,
      "partsDescription": parsedData.partsDescription,
      "qty": parsedData.qty,
      "remarks": parsedData.remarks,
      "date_of_update": parsedData.date_of_update,
      "reportno":parsedData.reportno,
      "replacement_date":parsedData.replacement_date
      
    });
  }

}

