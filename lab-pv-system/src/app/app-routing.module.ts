import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/desktop/main/main.component';


const routes: Routes = [
  {path: '', redirectTo: 'pc-frontend', pathMatch: 'full'},
  {path: 'pc-frontend', component: MainComponent},
  {path: 'pc-frontend/:lat/:lon/:zoom', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
