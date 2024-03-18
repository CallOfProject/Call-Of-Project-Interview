import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserTestAnswers} from "../test-interview-answer/test-interview-answer.component";

@Component({
  selector: 'app-test-answer',
  templateUrl: './test-answer.component.html',
  styleUrls: ['./test-answer.component.css']
})
export class TestAnswerComponent implements OnInit, OnDestroy {

  userAnswers: UserTestAnswers

  ngOnInit() {
    this.userAnswers = JSON.parse(localStorage.getItem('user_test_answers'))
  }

  ngOnDestroy() {
    localStorage.removeItem('user_test_answers')
  }
}
