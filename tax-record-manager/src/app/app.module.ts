import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TaxRecordListComponent } from './components/tax-record-list/tax-record-list.component';
import { TaxRecordFormComponent } from './components/tax-record-form/tax-record-form.component';

const routes: Routes = [
  { path: '', component: TaxRecordListComponent },
  { path: 'form', component: TaxRecordFormComponent },
  { path: 'form/:id', component: TaxRecordFormComponent }
];

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent, // Import standalone components here
    TaxRecordListComponent,
    TaxRecordFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }