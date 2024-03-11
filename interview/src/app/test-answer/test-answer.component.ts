import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserTestAnswers} from "../test-interview-answer/test-interview-answer.component";
import {ProjectInterviewService} from "../service/project-interview.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-answer',
  templateUrl: './test-answer.component.html',
  styleUrls: ['./test-answer.component.css']
})
export class TestAnswerComponent implements OnInit, OnDestroy {

  userAnswers: UserTestAnswers

  constructor(private interviewService: ProjectInterviewService, private router: Router) {

  }

  ngOnInit() {
    this.userAnswers = JSON.parse(localStorage.getItem('user_test_answers'))
  }

  ngOnDestroy() {
    localStorage.removeItem('user_test_answers')
  }
}
