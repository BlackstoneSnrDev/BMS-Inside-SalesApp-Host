import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';

///// My components 
// HTML
import { NavbarComponent } from './components/navbar/navbar.component';

///// Partials
import { LoginComponent } from './partials/login/login.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';
import { HomeComponent } from './partials/home/home.component';
import { RegisterTenant } from './partials/register-tenant/register-tenant.component';


///// My directives
import { TextareaAutoresizeDirective } from './directives/resize.directive';
import { AuthGuard } from "./services/auth.guard";

///// My pipes
import { FormatBoolean } from './pipes/formatBoolean.pipe';
import { ChangeView } from './pipes/changeView.pipe';
///// Libraries
// Angular material
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

// Firebase 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Ng2 Charts
import { NgChartsModule } from 'ng2-charts';

// PrimeNG
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import {AccordionModule} from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import { ScrollTopModule } from 'primeng/scrolltop';


@NgModule({

  declarations: [
    AppComponent,
    ///// My components 
    // HTML
    NavbarComponent,
    // Partials
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterTenant,
    ///// My directives
    TextareaAutoresizeDirective,
///// My pipes
    FormatBoolean,
    ChangeView,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ///// Libraries
    // Angular material
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    // Ng2 Charts
    NgChartsModule,
    // PrimeNG
    TableModule,
    PaginatorModule,
    CheckboxModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    KnobModule,
    FieldsetModule,
    AccordionModule,
    CardModule,
    FileUploadModule,
    ScrollTopModule,
  ],

  providers: [
    appRoutingProviders,
    // PrimeNG
    ConfirmationService,
    MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
