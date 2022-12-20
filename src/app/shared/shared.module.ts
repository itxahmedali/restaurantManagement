import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './welcome/welcome.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ItemComponent } from './item/item.component';
import { CartitemComponent } from './cartitem/cartitem.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MyorderComponent } from './myorder/myorder.component';
import { TableComponent } from './table/table.component';
import { OrderComponent } from './order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemComponent,
    CartComponent,
    CartitemComponent,
    ItemDetailComponent,
    WelcomeComponent,
    MyorderComponent,
    TableComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule
  ],
  exports:[
    ItemComponent,
    CartComponent,
    ItemDetailComponent,
    MyorderComponent,
    OrderComponent
  ]
})
export class SharedModule { }
