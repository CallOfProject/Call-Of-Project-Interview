import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Create_testInterviewComponent} from "./create-test-interview/create_test-interview.component";
import {TestInterviewComponent} from "./test-interview/test-interview.component";
import {CreateCodingInterviewComponent} from "./create-coding-interview/create-coding-interview.component";
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthGuardService} from "./service/auth-guard.service";


const routes: Routes = [
  {path: 'login', component: LoginPageComponent, pathMatch: 'full'},
  {path: 'main-menu', component: MainPageComponent, canActivate: [AuthGuardService]},
  {path: 'create-test-interview', component: Create_testInterviewComponent, pathMatch: 'full'},
  {path: 'coding-interview', component: CodeEditorComponent, pathMatch: 'full'},
  {path: 'create-coding-interview', component: CreateCodingInterviewComponent, pathMatch: 'full'},
  {path: 'test-interview', component: TestInterviewComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
