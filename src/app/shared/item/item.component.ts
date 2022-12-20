import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fadeIn } from 'src/animations/itemCardAnimation';

export interface Menu {
  img: string;
  item: string;
  description: string;
  price: number;
}
export interface Name {
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ItemComponent implements OnInit {
  @Input() data: any;
  public MenuItems: Menu[] = [];
  public ItemNames: Name[] = [];
  public MenuItemsAnimate: Menu[] = [];
  public ItemNamesAnimate: Name[] = [];
  public CartItems:any = [];
  public PreviousCartItems:any = [];
  constructor(private cd:ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges) {
    this.MenuItems = this.data;
    this.data?.map((e: Menu) => {
      this.ItemNames.push({
        firstName: e.item.split(' ')[0],
        lastName: e.item.split(' ')[1],
      });
    });
  }

  ngOnInit(): void {
    this.observe()
  }
  viewDetail(item:any){
    UniversalService.itemDetailView.next(true)
    UniversalService.itemDetail.next(item)
  }
  addItem(item:any){
    console.log(this.CartItems);
    this.CartItems.push(item)
    UniversalService.CartItem.next(this.CartItems)
    UniversalService.PreviousCartItem.next(this.CartItems)
  }
  async observe() {
    // UniversalService.PreviousCartItem.subscribe((res: any) => {

    //   if(res){
    //     this.CartItems = res
    //   }
    //   this.cd.detectChanges();
    // });
  }
}
