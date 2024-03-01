import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SortableModule} from "ngx-bootstrap/sortable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {Create_testInterviewComponent} from './create-test-interview/create_test-interview.component';
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
import {CascadeSelectModule} from "primeng/cascadeselect";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SidebarModule} from "primeng/sidebar";
import {InputSwitchModule} from "primeng/inputswitch";
import {CalendarModule} from "primeng/calendar";
import {ImageModule} from "primeng/image";
import {RadioButtonModule} from "primeng/radiobutton";
import {HttpClientModule} from "@angular/common/http";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {MultiSelectModule} from "primeng/multiselect";
import {InputNumberModule} from "primeng/inputnumber";
const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TestInterviewComponent,
    QuestionComponent,
    CreateCodingInterviewComponent,
    CodeEditorComponent,
  ],
  imports: [
    CountdownModule,
    HttpClientModule,
    BrowserModule,
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule,
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
    RouterLink, RouterOutlet, AppRoutingModule, Create_testInterviewComponent, SplitterModule, BsDropdownModule, CascadeSelectModule, DropdownModule, ButtonModule, DividerModule, InputTextModule, InputTextareaModule, SidebarModule, InputSwitchModule, CalendarModule, ImageModule, RadioButtonModule, ProgressSpinnerModule, ToastModule, RippleModule, MultiSelectModule, InputNumberModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {

}
