import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { MatTableAttributes, DateFormat } from "../../common/ui.constant";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/auth.models";
import { AdminModulesService } from "src/app/core/services/admin/admin-modules.service";
import { AddPartsMasterComponent } from './add-parts-master/add-parts-master.component';
import { EditPartsMasterComponent } from './edit-parts-master/edit-parts-master.component';

export class Product {
  part_type: string;
  part_name: string;
  part_no: string;
  createdDate: string;
  updatedDate: string;
  unique_id:string;
  _id:string
}


@Component({
  selector: 'app-parts-master',
  templateUrl: './parts-master.component.html',
  styleUrls: ['./parts-master.component.css']
})
export class PartsMasterComponent implements OnInit {
  
  @ViewChild('test1', { static: false }) content: ElementRef;
  testAttributesMap = new Map();

  PAGE_SIZE = MatTableAttributes.PAGE_SIZE;
  PAGINATION_RANGE = MatTableAttributes.PAGINATION_RANGE;
  DATE_FORMAT = DateFormat.DATE_FORMAT;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  error = '';
  salesPersonList:any;
  dynamicTableData: any[];
  user: User;
  

  constructor(private adminService:AdminModulesService, public dialog: MatDialog) 
  { }

  public displayedColumns: string[] = ['part_type','part_name','part_no','createdDate',  'updatedDate','actions'];
  public displayedLabelColumns: string[] = ['type','parts Name','parts No','created Date',  'updated Date', 'Edit'];
  dataSource: MatTableDataSource<Product>;

 
  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.adminService.getpartList().pipe()
    .subscribe( data => {
        console.log("data ",data);
        this.salesPersonList = data['Data'];
        this.loadRecord();
      },error => {
        this.error = error;
      });
  }


  loadRecord() {

    this.dynamicTableData = [];
    this.salesPersonList.forEach(element => {
      let row: Product = {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  public addRecord() {
    const dialogRef = this.dialog.open(AddPartsMasterComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllCustomer();
      }
    });
  }

  public editRecord(items) {
    const dialogRef = this.dialog.open(EditPartsMasterComponent, {
      width: '550px',
      height: 'fit-content',
      disableClose: true,
      data: {
        part_type:items.part_type,
        part_name:items.part_name,
        part_no:items.part_no,
        _id:items._id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Success') {
        this.getAllCustomer();
      }
    });

  }


  

}
