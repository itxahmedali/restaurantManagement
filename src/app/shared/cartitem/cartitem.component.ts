import { UniversalService } from 'src/app/services/universal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.scss']
})
export class CartitemComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data,"hellodata");
    
  }
  editItem(item:any){
    console.log(item);
    this.cartshow()
    UniversalService.itemDetail.next(item)
  }
  cartshow() {
    UniversalService.cartShow.next(false);
    UniversalService.itemDetailView.next(true)
}

}
