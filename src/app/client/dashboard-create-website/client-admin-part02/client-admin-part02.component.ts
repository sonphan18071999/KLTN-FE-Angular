import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { SelectionModel} from '@angular/cdk/collections';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientAdminPart02PopupComponent} from '../client-admin-part02-popup/client-admin-part02-popup.component';
import { DatabaseTableConfigService } from '../../../api/Client/database-table-config.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  detail:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Students', weight: 'Students management', symbol: '6',detail:''},
  {position: 2, name: 'Grades', weight: 'Grades management', symbol: '10',detail:''},
  {position: 3, name: 'Teachers', weight: 'Teacher management', symbol: '12',detail:''},
  {position: 4, name: 'Courses', weight: 'Courses management', symbol: '15',detail:''},
  {position: 5, name: 'Exam', weight: 'Exam management', symbol: '5',detail:''},

];
export interface DialogData {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  detail:string;
}
@Component({
  selector: 'app-client-admin-part02',
  templateUrl: './client-admin-part02.component.html',
  styleUrls: ['./client-admin-part02.component.scss']
})
export class ClientAdminPart02Component implements OnInit {
  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol','detail'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @Output() isActive = new EventEmitter<Number>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,
            private databaseTableConfigService : DatabaseTableConfigService  ) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.getAllTableConfigure();
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  popupEntities(item:any){
    this.dialog.open(ClientAdminPart02PopupComponent,{
      width: 'auto',
      data:{ name:item.name,position:item.position }})
  }
  scrollToTop(){
    document.getElementsByClassName('dashboard-h3')[0].scrollTo(0, 0);
  }
  SubmitEntities(){
    this.isActive.emit(3)
  }
  getAllTableConfigure(){
    // this.databaseTableConfigService.getTableConfig().subscribe((ok)=>{
    //   alert(ok)
    // })
  }
}
