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
  type:any;
  user: any;
  constructor(private router :Router,private adminModulesService:AdminModulesService,
    private authService: AuthenticationService,public dialog: MatDialog,) { 
    this.user = this.authService.currentUser();
  }
  public displayedColumns: string[] = ['month','type','actions'];
  public displayedLabelColumns: string[] = ['month','type','actions'];
  
  // public displayedColumns: string[] = ['month','type', 'location','escalatorId','plannedDate','completedDate','componentsReplaced','partsDescription','qty','actions'];
  // public displayedLabelColumns: string[] = ['month','type', 'location','escalatorId','plannedDate','completedDate','componentsReplaced','partsDescription','qty','Action'];
  dataSource!: MatTableDataSource<any>;


  ngOnInit() {
    
    // this.loadRecord();
  }




  addRecord(){
    this.router.navigate(['/upload-maintenance']);
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
        // this.loadRecord();
      }
    });
  }

  submitData(){
    debugger;
    var obj ={ "type": this.type}
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
      queryParams: { month: ele.month,type:ele.type,view:"true" }
    };
    this.router.navigate(['/upload-maintenance'], navigationExtras);
  }

  deleteRecord(items){debugger
    var obj ={
      month:items.month,
      type:items.type
    }
    this.adminModulesService.delete_month_wiseRecord(obj).pipe()
    .subscribe((data: any) => {
      console.log("delete_month_wiseRecord ", data);
      location.reload();
    });
  }

}
