import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  active = 1;
  modalReference: any;
  public BookingTables: any =[
     {Tableno:'Table 01', NumberOfPerson:'04 Person' ,status:'free'},
     {Tableno:'Table 02', NumberOfPerson:'03 Person' ,status:'Reserve'},
     {Tableno:'Table 03', NumberOfPerson:'04 Person' ,status:'booked'},
     {Tableno:'Table 04', NumberOfPerson:'01 Person' ,status:'free'},
     {Tableno:'Table 05', NumberOfPerson:'05 Person' ,status:'free'},
     {Tableno:'Table 06', NumberOfPerson:'02 Person' ,status:'booked'},
     {Tableno:'Table 07', NumberOfPerson:'02 Person' ,status:'free'},
     {Tableno:'Table 08', NumberOfPerson:'01 Person' ,status:'free'},
     {Tableno:'Table 09', NumberOfPerson:'03 Person' ,status:'free'},
     {Tableno:'Table 10', NumberOfPerson:'01 Person' ,status:'Reserve'},
     {Tableno:'Table 11', NumberOfPerson:'04 Person' ,status:'free'},
     {Tableno:'Table 12', NumberOfPerson:'03 Person' ,status:'Reserve'},
     {Tableno:'Table 13', NumberOfPerson:'04 Person' ,status:'booked'},
     {Tableno:'Table 14', NumberOfPerson:'03 Person' ,status:'Reserve'},
     {Tableno:'Table 15', NumberOfPerson:'04 Person' ,status:'booked'},
     {Tableno:'Table 16', NumberOfPerson:'04 Person' ,status:'free'}
  ]
  constructor(private router:Router, private cd:ChangeDetectorRef , private modalService: NgbModal) { }
  ngOnInit(): void {
    this.observe('bookings');
  }
  async observe(path: string) {
    if (path) {
      this.router.navigate([`counter/${path}`]);
    }
    UniversalService.routePath.subscribe((res: string) => {
      let path = res.toLowerCase();
      this.router.navigate([`counter/${path}`]);
      this.cd.detectChanges();
    });
  }
  open(content:any, modal:string) {
    this.modalReference = this.modalService.open(content, { centered: true, backdrop:'static', windowClass: 'checkoutModal'});
}
proceed(){
  this.modalReference.close();
}
}
