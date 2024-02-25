import {Component} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Question} from "../dto/Question";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {TestOption} from "../dto/TestOption";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChipsModule} from "primeng/chips";
import {style} from "@angular/animations";
import {Router} from "@angular/router";

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
  correctQ1 = new TestOption("Delhi", true)
  correctQ2 = new TestOption("London", true)
  correctQ3 = new TestOption("Paris", true)
  correctQ4 = new TestOption("Berlin", true)
  correctQ5 = new TestOption("Rome", true)
  correctQ6 = new TestOption("Madrid", true)
  correctQ7 = new TestOption("Tokyo", true)
  correctQ8 = new TestOption("Beijing", true)
  correctQ9 = new TestOption("Moscow", true)
  correctQ10 = new TestOption("Canberra", true)

  questions = [
    new Question("What is the capital of India?", [new TestOption("Mumbai", false), this.correctQ1, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ1, null),
    new Question("What is the capital of England?", [new TestOption("Mumbai", false), this.correctQ2, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ2, null),
    new Question("What is the capital of France?", [new TestOption("Mumbai", false), this.correctQ3, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ3, null),
    new Question("What is the capital of Germany?", [new TestOption("Mumbai", false), this.correctQ4, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ4, null),
    new Question("What is the capital of Italy?", [new TestOption("Mumbai", false), this.correctQ5, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ5, null),
    new Question("What is the capital of Spain?", [new TestOption("Mumbai", false), this.correctQ6, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ6, null),
    new Question("What is the capital of Japan?", [new TestOption("Mumbai", false), this.correctQ7, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ7, null),
    new Question("What is the capital of China?", [new TestOption("Mumbai", false), this.correctQ8, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ8, null),
    new Question("What is the capital of Russia?", [new TestOption("Mumbai", false), this.correctQ9, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ9, null),
    new Question("What is the capital of Australia?", [new TestOption("Mumbai", false), this.correctQ10, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ10, null),
  ];
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

  protected readonly style = style;

  handleTestInterviewClicked() {

    this.router.navigate(['/test-interview'])
  }
}
