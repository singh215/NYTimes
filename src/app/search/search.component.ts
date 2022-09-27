import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NyTimesService } from '../services/ny-times.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

export interface SearchTable {
  title: string;
  publish_date: string;
  section_name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe]
})
export class SearchComponent implements AfterViewInit {

  beginDate:any;
  endDate:any;
  today = new Date();
  minDate = new Date();
  displayedColumns: string[] = ['title', 'publish_date', 'section_name'];
  dataSource:any;
  searchTable: SearchTable[] = [];
  dataExists = false;
  //dataSource = new MatTableDataSource<SearchTable>(this.searchTable);

  constructor(private nyTimesService: NyTimesService,
    public datepipe: DatePipe) { }
    @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;

  ngOnInit() {
  }
  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.searchTable);
    //this.dataSource.paginator = this.paginator;
  }
  

  onBeginDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.minDate = new Date(event.value);
    this.beginDate = this.datepipe.transform(new Date(event.value), 'yyyy-MM-dd').replace(/-/g, '');
  }

  onEndDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = this.datepipe.transform(new Date(event.value), 'yyyy-MM-dd').replace(/-/g, '');
  }

  search() {
    if(this.beginDate && this.endDate) {
      this.nyTimesService.searchArticle(this.beginDate.toString(), this.endDate.toString())
      .subscribe((response) => {
        if(response.response && response.response.docs && response.response.docs.length>0){
          this.dataExists = true;
          response.response.docs.forEach(element => {            
           this.searchTable.push({
              title: element.headline.main,
              publish_date: element.pub_date,
              section_name: element.section_name
            })
          });
          this.dataSource = new MatTableDataSource(this.searchTable);
          this.dataSource.paginator = this.paginator;
        }
      })
    }
  }

}
