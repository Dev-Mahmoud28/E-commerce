import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, inject, input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  count:number = 0;
  isLogin = input<boolean>(true);

  ngOnInit(): void {

      this.cartService.getLoggedUserCart().subscribe({
        next: (res)=>{
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      })

    this.cartService.cartNumber.subscribe({
      next: (num)=>{
        this.count = num;
      }
    })
  }

  logOut():void{
    this.authService.logOut();
  }  

}
