import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ChipsModule} from "primeng/chips";
import {Router} from "@angular/router";
import {Question} from "../dto/Question";
import {SelectButtonModule} from "primeng/selectbutton";
import {RadioButtonModule} from "primeng/radiobutton";
import {IndexedDbService} from "../service/indexed-db.service";
import {RippleModule} from "primeng/ripple";
import {SubmitInterviewService} from "../service/submit-interview.service";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import * as uuid from 'uuid';
import {CreateTestInterviewDTO, QuestionDTO} from "../dto/TestInterviewDTOs";

@Component({
  selector: 'app-create-test-interview',
  templateUrl: './create_test-interview.component.html',
  styleUrls: ['./create_test-interview.component.css'],
  imports: [FormsModule, NgForOf, SidebarModule, ButtonModule, InputTextareaModule, ChipsModule, SelectButtonModule, RadioButtonModule, RippleModule, ToastModule],
  providers: [MessageService],
  standalone: true
})
export class Create_testInterviewComponent implements OnInit, OnDestroy {

  visibleSideBar: boolean = false;
  questions: Question[] = [];
  question: string;
  optionAStr: string;
  optionBStr: string;
  optionCStr: string;
  optionDStr: string;
  correctOption: string = 'off';

  constructor(private router: Router, private indexedDbService: IndexedDbService,
              private submitService: SubmitInterviewService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      const existingQuestions = this.indexedDbService.getAllData();
      existingQuestions.onsuccess = () => {
        this.questions = existingQuestions.result;
      }
    }, 2000)
  }


  ngOnDestroy(): void {
    const existingQuestions = this.indexedDbService.getAllData();
    existingQuestions.onsuccess = () => {
      this.questions = existingQuestions.result;
    }
  }


  createMessage(key: string, severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({key, severity, summary, detail});
  }


  handleSaveQuestionButton() {
    let checkResult: boolean = this.checkAllOptionsFilled();
    if (!checkResult) {
      this.createMessage("tst", "error", "Error", "Please fill all options and select a correct option")
      return;
    }
    let existingQuestion = this.questions.find(question => question.question === this.question);
    if (existingQuestion) {
      this.updateQuestion(existingQuestion)
    } else {
      const correctOption = this.getCorrectOption()
      const question = new Question(uuid.v4(), this.question, [this.optionAStr, this.optionBStr, this.optionCStr, this.optionDStr], correctOption)
      this.questions.push(question);
      this.indexedDbService.addData(question);
      this.clearOptions();
      this.createMessage("tst", "success", "Success", "Question is added")
    }
  }

  private updateQuestion(existingQuestion: Question) {
    existingQuestion.question = this.question;
    existingQuestion.options = [this.optionAStr, this.optionBStr, this.optionCStr, this.optionDStr];
    existingQuestion.answer = this.getCorrectOption();

    this.indexedDbService.clearAllData();
    this.questions.forEach(question => {
      this.indexedDbService.addData(question);
    })
    this.createMessage("tst", "success", "Success", "Question is updated")
  }

  private getCorrectOption(): string {
    if (this.correctOption == "A") {
      return this.optionAStr;
    } else if (this.correctOption == "B") {
      return this.optionBStr;
    } else if (this.correctOption == "C") {
      return this.optionCStr;
    } else if (this.correctOption == "D") {
      return this.optionDStr;
    }
  }

  private checkAllOptionsFilled(): boolean {
    const result = (this.optionAStr != null && this.optionBStr != null && this.optionCStr != null && this.optionDStr != null && this.correctOption != null && this.correctOption != "off")
      &&
      (this.optionAStr != "" && this.optionBStr != "" && this.optionCStr != "" && this.optionDStr != "" && this.correctOption != "");

    return this.isAllOptionsDifferent() && result;
  }

  handleGetQuestion(number: number) {
    const wantedQuestion = this.questions[number];

    this.question = wantedQuestion.question;
    this.optionAStr = wantedQuestion.options[0]
    this.optionBStr = wantedQuestion.options[1]
    this.optionCStr = wantedQuestion.options[2]
    this.optionDStr = wantedQuestion.options[3]
    this.correctOption = this.getCorrectRadioButton(wantedQuestion.answer);
  }

  private getCorrectRadioButton(correctOption: string) {
    if (this.optionAStr == correctOption) {
      return "A";
    } else if (this.optionBStr == correctOption) {
      return "B";
    } else if (this.optionCStr == correctOption) {
      return "C";
    } else if (this.optionDStr == correctOption) {
      return "D";
    }
  }

  handleAddNewQuestionButton() {
    this.clearOptions();
  }

  clearOptions() {
    this.question = "";
    this.optionAStr = "";
    this.optionBStr = "";
    this.optionCStr = "";
    this.optionDStr = "";
    this.correctOption = "off";
  }

  private isAllOptionsDifferent() {
    return this.optionAStr != this.optionBStr && this.optionAStr != this.optionCStr && this.optionAStr != this.optionDStr
      && this.optionBStr != this.optionCStr && this.optionBStr != this.optionDStr
      && this.optionCStr != this.optionDStr;
  }

  handleRemoveAllQuestions() {
    this.questions = [];
    this.indexedDbService.clearAllData();

    // clear options
    this.clearOptions()

    this.createMessage("tst", "success", "Success", "All questions are removed")
  }


  handleCreateInterviewButton() {
    const testInterviewPojo: CreateTestInterviewDTO = JSON.parse(sessionStorage.getItem("test_interview_prepare"));
    testInterviewPojo.question_count = this.questions.length
    testInterviewPojo.total_score = this.questions.length * 10;
    testInterviewPojo.question_list = this.questions.map(q => {
      return new QuestionDTO(q.question, q.options[0], q.options[1], q.options[2], q.options[3], q.answer, 10);
    });

    this.submitService.createTestInterview(testInterviewPojo).subscribe((res: any) => {
      if (res.status_code === 1999) {
        this.messageService.clear();
        this.createMessage("tst", "success", "Success", res.message)
        this.clearTestInterviewInformation();
        setTimeout(() => {
          this.router.navigate(['main-menu'])
        }, 2000);
      } else {
        this.createMessage("tst", "error", "Error", res.message)
      }
    })
  }


  private clearTestInterviewInformation() {
    this.questions = [];
    this.indexedDbService.clearAllData();
    this.clearOptions()
    sessionStorage.removeItem("test_interview_prepare");
  }

  handleRemoveQuestion(questionNumber: number) {
    this.questions.splice(questionNumber, 1);
    this.indexedDbService.clearAllData();
    this.questions.forEach(question => {
      this.indexedDbService.addData(question);
    })
    this.createMessage("tst", "success", "Success", "Question is removed")
  }
}
