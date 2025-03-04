import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../shared/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  private readonly wishlistService = inject(WishlistService);

  wishData:Iwish[] = []

  ngOnInit(): void {
  this.getWishData()  
  }
  
  getWishData():void{
    this.wishlistService.getwishlistData().subscribe({
      next: (res)=>{
        this.wishData = res.data
        console.log(this.wishData)
      }
    })
  }

  removeWish(id:string):void{
    this.wishlistService.removeWishlistItem(id).subscribe({
      next: (res)=>{
        console.log(res);
        this.getWishData();
      }
    })
  }

}
