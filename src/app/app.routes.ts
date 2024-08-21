import { Routes } from '@angular/router';
import { ProductsComponent } from './sites/products/products.component';
import { AboutUsComponent } from './sites/about-us/about-us.component';
import { ContactComponent } from './sites/contact/contact.component';
import { PrivacyPolicyComponent } from './sites/privacy-policy/privacy-policy.component';
import { ImpressumComponent } from './sites/impressum/impressum.component';
import { StartComponent } from './sites/start/start.component';
import { RequestsComponent } from './sites/requests/requests.component';

export const routes: Routes = [
    { path: '', component: StartComponent},
    { path: 'home', component: StartComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'datenschutz', component: PrivacyPolicyComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'requests', component: RequestsComponent },
];
