import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Question} from "../dto/Question";

@Component({
  selector: 'app-create-test-interview',
  templateUrl: './create_test-interview.component.html',
  styleUrls: ['./create_test-interview.component.css'],
  imports: [MatSidenavModule, MatInputModule, FormsModule, MatFormFieldModule, MatInputModule, NgForOf],
  standalone: true
})
export class Create_testInterviewComponent {

  public questions: Question[] = []
  interviewName: string = "";
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
}
