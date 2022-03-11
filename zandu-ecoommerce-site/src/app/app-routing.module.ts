import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ReactiveFormComponent} from './pages/reactive-form/reactive-form.component';
import {ReactiveXComponent} from './pages/reactive-x/reactive-x.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'reactive-forms', component: ReactiveFormComponent},
  {path: 'reactive-x', component: ReactiveXComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
