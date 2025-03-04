import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  checkoutForm!:FormGroup;
  cartId:string = '';

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]]
    })
    this.getCartId();
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.cartId = res.get('id')!;
      }
    })
  }

  submitForm(): void {
    console.log(this.checkoutForm.value);
    this.ordersService.checkoutPayment(this.cartId, this.checkoutForm.value).subscribe({
      next: (res)=>{
        console.log(res);
        if(res.status === 'success'){
          open(res.session.url, '_self');
        }
      },
      error: (err)=>{
        console.log(err);
      } 
    })
  }
  
}
