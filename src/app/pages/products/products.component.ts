import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  products:Iproduct[] = [];

  ngOnInit(): void {
    this.getProductsData()
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
}


