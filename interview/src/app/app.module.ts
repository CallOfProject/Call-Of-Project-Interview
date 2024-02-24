import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SortableModule} from "ngx-bootstrap/sortable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {Create_testInterviewComponent} from './create-test-interview/create_test-interview.component';
import {OptionComponent} from './option/option.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MainPageComponent} from './main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import {TestInterviewComponent} from './test-interview/test-interview.component';
import {CountdownComponent, CountdownModule} from "ngx-countdown";
import {QuestionComponent} from './question/question.component';
import {CreateCodingInterviewComponent} from './create-coding-interview/create-coding-interview.component';
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {SplitterModule} from "primeng/splitter";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";


const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent,
    OptionComponent,
    MainPageComponent,
    TestInterviewComponent,
    QuestionComponent,
    CreateCodingInterviewComponent,
    CodeEditorComponent
  ],
  imports: [
    //TooltipModule.forRoot(),
    CountdownModule,
    CountdownComponent,
    RouterModule.forRoot(routes),
    MonacoEditorModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    SortableModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule,
    TimepickerModule,
    ReactiveFormsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, MatInputModule, MatSelectModule, RouterOutlet, AppRoutingModule, Create_testInterviewComponent, SplitterModule, BsDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule, OptionComponent]
})
export class AppModule {

}
