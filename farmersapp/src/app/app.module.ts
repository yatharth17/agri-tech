import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CropfeedComponent } from './cropfeed/cropfeed.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CropProductComponent } from './crop-product/crop-product.component';
import { PaymentComponent } from './payment/payment.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { FiltersComponent } from './cropfeed/filters/filters.component';
import { ProductsComponent } from './cropfeed/products/products.component';
import { RelatedProductsComponent } from './crop-product/related-products/related-products.component';
import { BiddingComponent } from './crop-product/bidding/bidding.component';
import { AuthGuard } from './auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LogoutComponent } from './navbar/logout/logout.component';
import { AddcropComponent } from './addcrop/addcrop.component';
import { OtpComponent } from './login/otp/otp.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CropfeedComponent,
    FooterComponent,
    NavbarComponent,
    CropProductComponent,
    PaymentComponent,
    ShoppingcartComponent,
    FiltersComponent,
    ProductsComponent,
    RelatedProductsComponent,
    BiddingComponent,
    LogoutComponent,
    AddcropComponent,
    OtpComponent,
    OrdersComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
