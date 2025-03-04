import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly cartService = inject(CartService);

cartData:ICart = {} as ICart;

ngOnInit(): void {
  this.getCartData();
}

getCartData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next: (res)=>{
      this.cartData = res.data
      console.log(this.cartData);
    },
    error: (err)=>{
      console.log(err);
    }
  })
}

removeCartItem(id:string):void{
  this.cartService.removeSpecificCartItem(id).subscribe({
    next: (res)=>{
      console.log(res);
      this.cartData = res.data;
      this.cartService.cartNumber.next(res.numOfCartItems)
    },
    error: (err)=>{
      console.log(err);
    }
  })
}

updateQuantity(id:string, count:number):void{
  this.cartService.updateCartItemQuantity(id, count).subscribe({
    next: (res)=>{
      console.log(res);
      this.cartData = res.data;
    },
    error: (err)=>{
      console.log(err);
    }
  })
}

clearCart():void{
    this.cartService.clearCart().subscribe({
      next: (res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.getCartData();
          this.cartService.cartNumber.next(0)
        }
      },
      error: (err)=>{
        console.log(err);
     }
    })
  }
}
