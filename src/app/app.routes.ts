import { Routes } from '@angular/router';
import { ProductsComponent } from './sites/products/products.component';
import { AboutUsComponent } from './sites/about-us/about-us.component';
import { ContactComponent } from './sites/contact/contact.component';
import { PrivacyPolicyComponent } from './sites/privacy-policy/privacy-policy.component';
import { ImpressumComponent } from './sites/impressum/impressum.component';
import { StartComponent } from './sites/start/start.component';
import { RequestsComponent } from './sites/requests/requests.component';
import { WhereToFindUsComponent } from './sites/where-to-find-us/where-to-find.us.component';
import { ProductDiashowComponent } from './sites/product-diashow/product-diashow.component';
import { OnlineShopComponent } from './sites/online-shop/online-shop.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'home', component: StartComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'datenschutz', component: PrivacyPolicyComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'online-shop', component: OnlineShopComponent },
  { path: 'online-shop/:category', component: OnlineShopComponent },
  {
    path: 'online-shop/:category/:subcategory',
    component: OnlineShopComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDiashowComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'where-to-find-us', component: WhereToFindUsComponent },
];
