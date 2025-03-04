import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  private readonly router = inject(Router);

  userData:any;

  sendRegisterForm(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }

  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
  }

  getUserData():void{
    this.userData = jwtDecode(localStorage.getItem('token') !);
    console.log(this.userData);
  }

  logOut():void{
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
