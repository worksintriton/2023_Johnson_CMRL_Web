import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ActivatedRoute } from "@angular/router";
import { DateFormat, MatTableAttributes } from "src/app/common/ui.constant";
import { ExportToExcelService } from "src/app/core/services/exportExcel/export-to-excel.service";
import { CookieService } from "src/app/core/services/cookie.service";
import * as XLSX from 'xlsx';
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { EditDetailsComponent } from "../edit-details/edit-details.component";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-upload-maintenance-data',
  templateUrl: './upload-maintenance-data.component.html',
  styleUrls: ['./upload-maintenance-data.component.css']
})
export class UploadMaintenanceDataComponent implements OnInit {
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
  createMonth:any;
  type:any;
  lableName: any;
  month: any;
  types: any;
  view: any;
  user: any;

  constructor(private exportToExcelService: ExportToExcelService,private authService: AuthenticationService,
    private route: ActivatedRoute, private adminModulesService: AdminModulesService, public dialog: MatDialog) { 
      this.createMonth ="";
      this.type ="";
debugger
      this.user = this.authService.currentUser();
      this.route.queryParams.subscribe(params => {
        this.month = params['month'];
        this.types = params['type'];
        this.view = params['view'];
      });
    }

  public displayedColumns: string[] = ['rno','key','location', 'escalatorId','jobNo','plannedDate','reportno'];
  public displayedLabelColumns: string[] = ['rno','key','location', 'escalator Id','job No','planned Date','reportno'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit() {
    // console.log("this.user",this.user);
  
   
    if(this.view == "true"){
      this.displayedColumns= ['rno','location', 'escalatorId','jobNo','plannedDate','completedDate','reportno','replacement_date','componentsReplaced','partsDescription','qty','actions'];
      this.displayedLabelColumns= ['rno','location', 'escalator Id','job No','planned Date','completed Date','report no','replacement_date','components Replaced','parts Description','qty','actions'];
      this.loadRecord();
    }

    if(this.user[0].user_type == 1 && this.user[0].admin == true){
      this.displayedColumns= ['rno','location', 'escalatorId','jobNo','plannedDate','completedDate','reportno','replacement_date','componentsReplaced','partsDescription','qty','actions'];
      this.displayedLabelColumns= ['rno','location', 'escalator Id','job No','planned Date','completed Date','report no','replacement_date','components Replaced','parts Description','qty','actions'];
    }else{
      this.displayedColumns= ['rno','location', 'escalatorId','jobNo','plannedDate','completedDate','reportno','replacement_date','componentsReplaced','partsDescription','qty'];
      this.displayedLabelColumns= ['rno','location', 'escalator Id','job No','planned Date','completed Date','report no','replacement_date','components Replaced','parts Description','qty'];
    }

  }

  onFileChange(ev) {debugger
    this.excelData = [];
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.lableName = ev.target.files[0].name;
    reader.onload = (event) => {
      const data = reader.result;
      // workBook = XLSX.read(data, { type: 'binary' });

      workBook = XLSX.read(data, {
        type: "binary", cellDates: true, dateNF: 'mm/dd/yyyy;@'
    });

      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      // const dataString = JSON.stringify(jsonData);
      console.log("jsonData",jsonData);
      this.excelData = jsonData;
     
    
    }
    reader.readAsBinaryString(file);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  loadRecord() {
   var obj = {
    "month":this.month,
    "type":this.types
   }
    this.adminModulesService.getlist_by_month(obj).pipe()
     .subscribe((data: any) => {
       console.log("getlist_by_month ", data);
       this.List = data.Data;

       this.dataSource = new MatTableDataSource(this.List);
       setTimeout(() => {
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       })
     });
   this.loading = false;
 }
  

  save() {debugger
    var obj ={
      "month":this.createMonth,
      "type":this.type,
      "excelData":this.excelData.Sheet1 
    }

    // console.log("this.excelData.Sheet1",this.excelData.Sheet1)
   
    this.adminModulesService.excel_upload_value(obj).pipe()
    .subscribe((data: any) => {
      console.log("excel_upload_value ", data);
      this.List = data.Data.excelData;

      this.dataSource = new MatTableDataSource(this.List);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    });
  }

  public editRecord(items) {

    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '750px',
      height: 'fit-content',
      disableClose: true,
      data: items
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.loadRecord();
      }
    });
  }

  deleteRecord(items){
    this.adminModulesService.deleteSingleRecord(items).pipe()
    .subscribe((data: any) => {
      console.log("deleteSingleRecord ", data);
     this.ngOnInit();
    });
  }


  exportData(){

    if(this.type == "LIFT" || this.types == "LIFT"){
      let new_list = this.dataSource.filteredData.map(function(obj,i) {
        return {
          "S no":i+1,
          "Location": obj.location,
          "LIFT":obj.escalatorId,
          "Job no":obj.jobNo,
          "Planned date":obj.plannedDate,
          "Completed date" : obj.completedDate,
          "Report no":obj.reportno,
          "Componenets replaced":obj.componentsReplaced,
          "Parts Description":obj.partsDescription,
          "Replacement Date":obj.replacement_date,
          "QTY":obj.qty,
          "Remarks":obj.remarks,
        }
      });
      
    this.exportToExcelService.exportAsExcelFile(new_list, "Job Details",);
    }else {
      let new_list = this.dataSource.filteredData.map(function(obj,i) {
        return {
          "S no":i+1,
          "Location": obj.location,
          "ESCALATOR":obj.escalatorId,
          "Job no":obj.jobNo,
          "Planned date":obj.plannedDate,
          "Completed date" : obj.completedDate,
          "Report no":obj.reportno,
          "Componenets replaced":obj.componentsReplaced,
          "Parts Description":obj.partsDescription,
          "Replacement Date":obj.replacement_date,
          "QTY":obj.qty,
          "Remarks":obj.remarks,
        }
      });
      
    this.exportToExcelService.exportAsExcelFile(new_list, "Job Details",);
    }
  
  }

}


