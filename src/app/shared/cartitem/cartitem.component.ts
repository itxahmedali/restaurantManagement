import { UniversalService } from 'src/app/services/universal.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.scss']
})
export class CartitemComponent implements OnInit {
  @Input() data: any;
  public duplicateItems: any;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.data, "hellodata");
    this.observe()

  }
  editItem(item: any) {
    console.log(item);
    this.cartshow()
    UniversalService.itemDetail.next(item)
  }
  cartshow() {
    UniversalService.cartShow.next(false);
    UniversalService.itemDetailView.next(true)
  }
  deleteItem(item: any) {
    const index = this.data.indexOf(item);
    // const Duplicateindex = this.duplicateItems.indexOf(item?.item);
    if (index > -1) {
      this.data.splice(index, 1);
      UniversalService.CartItem.next(this.data)
    }
    // if (Duplicateindex > -1) {
    //   this.data.splice(index, 1);
    //   UniversalService.CartItem.next(this.data)
    // }
  }
  async observe() {
    UniversalService.DuplicateCartItem.subscribe(res => {
      this.duplicateItems = res
      this.cd.detectChanges();
      console.log(res, 'hellores');
    })
  }
}
