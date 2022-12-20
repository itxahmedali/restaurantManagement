import { AuthGuardService } from './../../services/auth-guard.service';
import { HelperService } from './../../services/helper.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { headerAnimation } from './../../../animations/headerAnimation';
import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimation],
})
export class HeaderComponent implements OnInit {
  public heading: any = localStorage.getItem('lastVisitheadingPage') ? localStorage.getItem('lastVisitheadingPage') : "Starters";
  public href: string = 'null';
  public cartButton: boolean = false;
  public cartButtonShow: boolean = true;
  public headingShow: boolean = true;
  public waiter: any = false;
  public modalReference: any;
  public CartItems: any;
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef, private router: Router, private helper: HelperService,
    private location: Location, private AuthGuarDService: AuthGuardService) { }
  text: any = localStorage.getItem('lastVisitheadingPage') ? localStorage.getItem('lastVisitheadingPage') : "Starters";
  ngOnInit(): void {
    this.text = localStorage.getItem('lastVisitheadingPage') ? localStorage.getItem('lastVisitheadingPage') : "Starters";
    this.heading = localStorage.getItem('lastVisitheadingPage') ? localStorage.getItem('lastVisitheadingPage') : "Starters";
    this.checkUrl()
    this.observe();
    if(localStorage.getItem('role') == 'counter'){
      this.cartButtonShow = false
    }
  }
  async observe() {
    UniversalService.headerHeading.subscribe((res: string) => {
      this.changeText();
      this.heading = res;
      this.cd.detectChanges();
    });
    UniversalService.cartShow.subscribe((res: boolean) => {
      if (res) {
        this.headingShow = false;
        this.cartButton = true;
        localStorage.setItem('cart', 'true');
      } else {
        this.headingShow = true;
        this.cartButton = false;
        localStorage.setItem('cart', 'false');
      }
      this.cd.detectChanges();
    });
    UniversalService.modules.subscribe((res: boolean) => {
      if (res) {
        this.checkUrl()
      }
      this.cd.detectChanges();
    });
    UniversalService.CartItem.subscribe((res: string) => {
      if(res){
        this.CartItems = res
      }
      this.cd.detectChanges();
    });
  }

  currentState = 'hidden';

  changeText() {
    this.currentState = 'hidden';
  }
  animationFinished(event: AnimationEvent) {
    if (event.fromState === 'void' && event.toState === 'hidden') {
      this.text = this.heading;
      this.currentState = 'visible';
    } else if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.text = this.heading;
      this.currentState = 'visible';
    }
  }
  cartShow() {
    this.cartButton = !this.cartButton;
    if (this.cartButton) {
      UniversalService.cartShow.next(true);
      UniversalService.CartItemToCart.next(this.CartItems)
    } else {
      UniversalService.cartShow.next(false);
      UniversalService.CartItem.next(this.CartItems)
    }
  }
  logout() {
    localStorage.clear()
    AuthService.signin.next(false)
    UniversalService.cartShow.next(false);
    this.router.navigate(['welcome-customers'])
  }
  checkUrl() {
    this.href = this.location.path()
    this.waiter = this.helper.urlCheck(this.href, 'waiters', 'waiters')
  }
  myOrders() {
    UniversalService.cartShow.next(false);
    UniversalService.Orders.next(true)
  }
  open(content: any, modal: any) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: 'md'
    });
  }
  proceed() {
    this.modalReference.close();
  }
}
