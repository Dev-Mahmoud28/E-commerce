import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  products: Iproduct[] = [];
  categories: Icategories[] = [];

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }


  getProductsData():void {
    
    this.productsService.getAllProducts().subscribe({
      next: (res) =>{
        this.products = res.data;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  getCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.categories = res.data
      },
      error: (err)=>{
        console.log(err);
      }
    })
  };

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next: (res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.cartService.cartNumber.next(res.numOfCartItems)
          console.log(res.numOfCartItems)
          this.toastrService.success(res.message, 'Success');
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  addToWish(id:string){
    this.wishlistService.addToWishlist(id).subscribe({
      next: (res)=>{
        console.log(res)
        this.toastrService.success(res.message, 'Success');
      }
    })
  }
}
