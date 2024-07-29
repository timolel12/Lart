import { Routes } from '@angular/router';
import { HomeComponent } from './sites/home/home.component';
import { AboutUsComponent } from './sites/about-us/about-us.component';
import { ContactComponent } from './sites/contact/contact.component';
import { PrivacyPolicyComponent } from './sites/privacy-policy/privacy-policy.component';
import { ImpressumComponent } from './sites/impressum/impressum.component';
import { StartComponent } from './sites/start/start.component';

export const routes: Routes = [
    { path: '', component: StartComponent},
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'datenschutz', component: PrivacyPolicyComponent },
    { path: 'impressum', component: ImpressumComponent },
];
