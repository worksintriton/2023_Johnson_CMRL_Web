import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { DateFormat, MatTableAttributes } from "src/app/common/ui.constant";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";
import { CookieService } from "src/app/core/services/cookie.service";
import * as XLSX from 'xlsx';
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { EditDetailsComponent } from "./edit-details/edit-details.component";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-preventive-maintenance',
  templateUrl: './preventive-maintenance.component.html',
  styleUrls: ['./preventive-maintenance.component.css']
})
export class PreventiveMaintenanceComponent implements OnInit {
  loading: boolean = false;
  willDownload = false;
  @ViewChild('test1', { static: false }) content!: ElementRef;
  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  dynamicTableData: any[];
  List: any;
  excelData: any;
  type: any;
  user: any;
  istype:any;
  fetch_job_no_by_type: any;

  "job_no": any;
  "start_date":any;
  "end_date":any;

  constructor(private router: Router, private adminModulesService: AdminModulesService, private exportToExcelService: ExportToExcelService,
    private authService: AuthenticationService, public dialog: MatDialog,) {
    this.user = this.authService.currentUser();
  }
  public displayedColumns: string[] = ['month', 'type', 'actions'];
  public displayedLabelColumns: string[] = ['month', 'type', 'actions'];

  // public displayedColumns: string[] = ['month','type', 'location','escalatorId','plannedDate','completedDate','componentsReplaced','partsDescription','qty','actions'];
  // public displayedLabelColumns: string[] = ['month','type', 'location','escalatorId','plannedDate','completedDate','componentsReplaced','partsDescription','qty','Action'];
  dataSource!: MatTableDataSource<any>;


  ngOnInit() {

    // this.loadRecord();
  }




  addRecord() {
    this.router.navigate(['/upload-maintenance']);
  }

  public editRecord(items) {

    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '750px',
      height: '300px',
      disableClose: true,
      data: items
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        // this.loadRecord();
      }
    });
  }

  submitData() {
    debugger;
    var obj = { "type": this.type }
    this.adminModulesService.getlist_by_typefilter(obj).pipe()
      .subscribe((data: any) => {
        console.log("getlist_by_typefilter ", data);
        this.List = data.Data;

        this.dataSource = new MatTableDataSource(this.List);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      });
    this.loading = false;
  }


  viewRecord(ele) {
    debugger
    let navigationExtras: NavigationExtras = {
      queryParams: { month: ele.month, type: ele.type, view: "true" }
    };
    this.router.navigate(['/upload-maintenance'], navigationExtras);
  }

  deleteRecord(items) {
    debugger
    var obj = {
      month: items.month,
      type: items.type
    }
    this.adminModulesService.delete_month_wiseRecord(obj).pipe()
      .subscribe((data: any) => {
        console.log("delete_month_wiseRecord ", data);
        location.reload();
      });
  }

  onOptionsSelected() {debugger
    // console.log("the selected value is " , this.istype);
  var obj ={
    "type": this.istype
 }
    this.adminModulesService.fetch_job_no_by_type(obj).pipe()
    .subscribe((data: any) => {
      this.fetch_job_no_by_type = data.Data;
      console.log("fetch_job_no_by_type ", data);
    });
  }

  exportData(){
    var obj ={
      "job_no": this.job_no,
      "type": this.istype,
      "start_date":this.start_date,
      "end_date":this.end_date
    }

    this.adminModulesService.excel_export_data(obj).pipe()
      .subscribe((data: any) => {
        console.log("excel_export_data ", data);
        if (data && data.Data && data.Data.length > 0) {


        //   {
        //     "_id": "636399753c0b6761146a8206",
        //     "month": "2022-11",
        //     "type": "LIFT",
        //     "location": "Koyambedu",
        //     "escalatorId": "SKO- L-02",
        //     "jobNo": "L-E3320",
        //     "reportno": "L-2022-11-002",
        //     "plannedDate": "2022-11-18",
        //     "date_of_create": "Thu Nov 03 2022 16:05:33 GMT+0530 (India Standard Time)",
        //     "date_of_update": "",
        //     "delete_status": false,
        //     "updatedAt": "2022-12-03T07:42:18.601Z",
        //     "createdAt": "2022-11-03T10:35:33.525Z",
        //     "__v": 0,
        //     "completedDate": "2022-11-11",
        //     "replacement_date": "2022-11-12",
        //     "componentsReplaced": "Yes",
        //     "partsDescription": "Center bearing",
        //     "qty": "1no",
        //     "remarks": "Replaced"
        // }
   if(this.istype == "LIFT"){
    let new_list = data.Data.map(function(obj,i) {
      return {
        "S no":i+1,
        "Location": obj.location,
        "LIFT":obj.escalatorId,
        "Job no":obj.jobNo,
        "Planned date":obj.plannedDate,
        "Completed date" : obj.completedDate,
        "Report no":obj.reportno,
        "Replacement Date":obj.replacement_date,
        "Componenets replaced":obj.componentsReplaced,
        "Parts Description":obj.partsDescription,
        "QTY":obj.qty,
        "Remarks":obj.remarks,
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "Job Details",);
   }else{
    let new_list = data.Data.map(function(obj,i) {
      return {
        "S no":i+1,
        "Location": obj.location,
        "ESCALATOR":obj.escalatorId,
        "Job no":obj.jobNo,
        "Planned date":obj.plannedDate,
        "Completed date" : obj.completedDate,
        "Report no":obj.reportno,
        "Replacement Date":obj.replacement_date,
        "Componenets replaced":obj.componentsReplaced,
        "Parts Description":obj.partsDescription,
        "QTY":obj.qty,
        "Remarks":obj.remarks,
      }
    });
    this.exportToExcelService.exportAsExcelFile(new_list, "Job Details",);
   }
        
        } else {
         alert("No Record found!!!")
        }

      });
  }

  // exportAsXLSX(): void {
  //   let new_list = this.dataSource.filteredData.map(function(obj) {
  //     return {
  //       "Ticket No": obj.ticket_no,
  //       "CMRL Comments":obj.break_down_observed,
  //       "Restored Time":obj.restored_time,
  //       "Duration":obj.duration,
  //       "Penalty Amount" : obj.ram,
  //       "Status":obj.status,
  //       "Fault Type":obj.fault_type,
  //       "Created Date":new Date(obj.createdDate),
  //       "Updated Date":new Date(obj.updatedDate),
  //     }
  //   });
  //   this.exportToExcelService.exportAsExcelFile(new_list, "Ticket Details",);
  // }

}
