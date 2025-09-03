import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRecordListComponent } from './components/tax-record-list/tax-record-list.component';
import { TaxRecordFormComponent } from './components/tax-record-form/tax-record-form.component';

const routes: Routes = [
  { path: '', component: TaxRecordListComponent },
  { path: 'form', component: TaxRecordFormComponent },
  { path: 'form/:id', component: TaxRecordFormComponent },
  { path: '**', redirectTo: '' }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
