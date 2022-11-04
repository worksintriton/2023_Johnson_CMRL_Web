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


@Component({
  selector: 'app-view-parts',
  templateUrl: './view-parts.component.html',
  styleUrls: ['./view-parts.component.css']
})
export class ViewPartsComponent implements OnInit {
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
  salesPersonList: any;

  constructor(private exportToExcelService: ExportToExcelService,
    private route: ActivatedRoute, private adminModulesService: AdminModulesService, public dialog: MatDialog) { 

      this.route.queryParams.subscribe(params => {
        // this.month = params['month'];
       
      });
    }

    public displayedColumns: string[] = ['part_type','part_name','part_no','createdDate',  'updatedDate',];
    public displayedLabelColumns: string[] = ['type','parts Name','parts No','created Date',  'updated Date', ];
  dataSource!: MatTableDataSource<any>;

  ngOnInit() {
   this.getAllCustomer();

  }

 


  getAllCustomer(){
    this.adminModulesService.getpartList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.salesPersonList = data['Data'];
        this.loadRecord();
      },);
  }


  loadRecord() {

    this.dynamicTableData = [];
    this.salesPersonList.forEach(element => {
      let row: any = {
        part_type: element.part_type && element.part_type == 1 ?  "LIFT" : "ESCALATORS",
        part_name: element.part_name,
        part_no: element.part_no,
        createdDate: element.createdAt,
        updatedDate: element.updatedAt,
        unique_id:element.unique_id,
        _id:element._id
      }
      this.dynamicTableData.push(row);
    })
    this.dataSource = new MatTableDataSource(this.dynamicTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}


