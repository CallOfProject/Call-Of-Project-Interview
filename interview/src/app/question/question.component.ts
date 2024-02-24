import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../dto/Question";
import {TestOption} from "../dto/TestOption";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() questions!: Question[];
  questionCounter: number = 0;
  questionCount: number;
  currentQuestion: Question;
  currentPoint: number = 0;
  isSelectedOptionA: boolean = false;
  isSelectedOptionB: boolean = false;
  isSelectedOptionC: boolean = false;
  isSelectedOptionD: boolean = false;

  getAnswer(): TestOption {
    if (this.isSelectedOptionA) {
      return this.currentQuestion.options[0];
    }
    if (this.isSelectedOptionB) {
      return this.currentQuestion.options[1];
    }
    if (this.isSelectedOptionC) {
      return this.currentQuestion.options[2];
    }
    if (this.isSelectedOptionD) {
      return this.currentQuestion.options[3];
    }
  }

  handleNextQuestionButtonClicked() {

    if (!this.isSelectedAnyOption()) {
      alert("Please select an option");
      return;
    } else {

      if (this.questions.length === 0) {
        alert("You have reached the end of the test. Result is: " + this.currentPoint + " points.")
        return;
      } else {
        this.questionCounter++;
        this.currentQuestion = this.questions.pop();
      }

      if (this.getAnswer().optionText === this.currentQuestion.correctOption.optionText)
        this.currentPoint += 10;

      this.resetOptions();
    }
  }

  isSelectedAnyOption() {
    return this.isSelectedOptionA || this.isSelectedOptionB || this.isSelectedOptionC || this.isSelectedOptionD;
  }

  resetOptions() {
    this.isSelectedOptionA = false;
    this.isSelectedOptionB = false;
    this.isSelectedOptionC = false;
    this.isSelectedOptionD = false;
  }

  ngOnInit(): void {
    this.questionCount = this.questions.length;
    this.currentQuestion = this.questions.pop();
    this.questionCounter = 1;
  }

  handleCheckOptionA() {
    this.isSelectedOptionA = !this.isSelectedOptionA;
  }

  handleCheckOptionB() {
    this.isSelectedOptionB = !this.isSelectedOptionB;
  }

  handleCheckOptionC() {
    this.isSelectedOptionC = !this.isSelectedOptionC;
  }

  handleCheckOptionD() {
    this.isSelectedOptionD = !this.isSelectedOptionD;
  }
}
