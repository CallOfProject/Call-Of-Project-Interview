import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {Create_testInterviewComponent} from "./create-test-interview/create_test-interview.component";
import {TestInterviewComponent} from "./test-interview/test-interview.component";


const routes: Routes = [
  {path: 'main-menu', component: MainPageComponent,/* canActivate: [AuthGuardService]*/},
  {path: 'create-test-interview', component: Create_testInterviewComponent, pathMatch: 'full'},
  {path: 'test-interview', component: TestInterviewComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/main-menu', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
