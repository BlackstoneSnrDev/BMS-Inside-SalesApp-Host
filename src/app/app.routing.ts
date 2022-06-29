// Import angular router's module
import { ModuleWithProviders } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 

// Import components
import { HomeComponent } from './partials/home/home.component';
import { RegisterTenant } from './partials/register-tenant/register-tenant.component';

import { LoginComponent } from './partials/login/login.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';

import { AuthGuard } from "./services/auth.guard";

// URL Config
const appRoutes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'register-tenant', component: RegisterTenant, canActivate: [AuthGuard] },
    {path: '404', component: PageNotFoundComponent, canActivate: [AuthGuard] },
    {path: '**', redirectTo: '404'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);