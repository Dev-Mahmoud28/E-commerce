import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedInGuard } from './core/guards/loggedIn/logged-in.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'', loadComponent:()=> import('./layouts/auth/auth.component').then((c)=>c.AuthComponent), children: [
        {path: 'login', loadComponent: ()=> import('./pages/login/login.component').then((c)=>c.LoginComponent), title: 'Login'},
        {path: 'register', loadComponent: ()=> import('./pages/register/register.component').then((c)=>c.RegisterComponent), title: 'Register'}
    ], canActivate:[loggedInGuard]},
    {path: '', loadComponent: ()=> import('./layouts/main/main.component').then((c)=>c.MainComponent), children: [
        {path: 'home', loadComponent: ()=> import('./pages/home/home.component').then((c)=>c.HomeComponent), title: 'Home', canActivate:[authGuard]},
        {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then((c)=>c.CartComponent), title: 'Cart'},
        {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then((c)=>c.ProductsComponent), title: 'Products'},
        {path: 'categories',loadComponent: ()=> import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title: 'Categories'},
        {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then((c)=>c.BrandsComponent), title: 'Brands'},
        {path: 'wishlist', loadComponent: ()=> import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent), title: 'Wishlist'},
        {path: 'allorders', loadComponent: ()=> import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent), title: 'Allorders'},
        {path: 'checkout/:id', loadComponent: ()=> import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title: 'Checkout'},
        {path: 'details/:id', loadComponent: ()=> import('./pages/details/details.component').then((c)=>c.DetailsComponent), title: 'Details'},
        {path: '**', loadComponent: ()=> import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent), title: 'Not Found'}
    ]}
];
