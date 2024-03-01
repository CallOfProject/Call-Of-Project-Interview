import {Component} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChipsModule} from "primeng/chips";
import {style} from "@angular/animations";
import {Router} from "@angular/router";
import {Question} from "../dto/Question";
import {TestOption} from "../dto/TestOption";

@Component({
  selector: 'app-create-test-interview',
  templateUrl: './create_test-interview.component.html',
  styleUrls: ['./create_test-interview.component.css'],
  imports: [FormsModule, NgForOf, SidebarModule, ButtonModule, InputTextareaModule, ChipsModule],
  standalone: true
})
export class Create_testInterviewComponent {

  constructor(private router: Router) {
  }

  visibleSideBar: boolean = false;

  questions = [];
  question: string;

  optionAStr: string;
  optionBStr: string;
  optionCStr: string;
  optionDStr: string;

  handleSaveQuestionButtonClicked() {
    /*var q = new Question(this.question, [this.optionAStr, this.optionBStr, this.optionCStr, this.optionDStr], this.optionAStr)
    this.questions.push(q)*/
  }

  handleSubmitInterviewButtonClicked() {

  }

  protected readonly style = style;

  handleTestInterviewClicked() {

    this.router.navigate(['/test-interview'])
  }

  handleAddQuestionButton() {
    let checkResult: boolean = this.checkAllOptionsFilled();
    if (!checkResult) {
      alert("Please fill all options")
      return;
    }

    const q = new Question(this.question, [new TestOption(this.optionAStr, false), new TestOption(this.optionBStr, false), new TestOption(this.optionCStr, false), new TestOption(this.optionDStr, false)], new TestOption(this.optionAStr, true))
  }

  private checkAllOptionsFilled(): boolean {
    return (this.optionAStr != null && this.optionBStr != null && this.optionCStr != null && this.optionDStr != null) &&
      (this.optionAStr != "" && this.optionBStr != "" && this.optionCStr != "" && this.optionDStr != "");
  }
}
