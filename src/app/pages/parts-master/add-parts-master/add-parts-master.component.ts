import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { User } from 'src/app/core/models/auth.models';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { AddEditPartsMasterDetailsComponent } from '../add-edit-parts-master-details/add-edit-parts-master-details.component';


@Component({
  selector: 'app-add-parts-master',
  templateUrl: './add-parts-master.component.html',
  styleUrls: ['./add-parts-master.component.css']
})
export class AddPartsMasterComponent implements OnInit {

  isShowErrors: boolean = false;
  @ViewChild(AddEditPartsMasterDetailsComponent,{ static: false })
  public addForm: AddEditPartsMasterDetailsComponent;
  user: User;
  constructor(public dialogRef: MatDialogRef<AddPartsMasterComponent>, private authService: AuthenticationService,
    private adminService:AdminModulesService,) { this.user = this.authService.currentUser();  }

  ngOnInit() {
  }
  
  public save() {
    this.isShowErrors = true;
    if (this.addForm.addEditForm.valid) {
      const enteredData = this.addForm.addEditForm.value;
        this.adminService.createpart(enteredData).subscribe(
          response => {
            this.success(response['Status']);
            this.dialogRef.close('Success');
          },
          (err: HttpErrorResponse) => {
            console.log("err",err)
            this.handleError(err);
          }
        )
      
    }
    else {
     
    }
  }

  private success(message) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'success', });
    this.dialogRef.close('Success'); 
   // this.alertService.success('Saved successfully');
  }

  private handleError(error) {
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: error, icon: 'error', });
    this.dialogRef.close('Success');
  //  this.alertService.success(error);
  }

  reset() {
    this.addForm.addEditForm.reset();
  }

}
