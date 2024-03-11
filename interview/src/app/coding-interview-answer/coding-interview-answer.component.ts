import {Component, OnInit} from '@angular/core';
import {ProjectInterviewService} from "../service/project-interview.service";
import {Router} from "@angular/router";
import {MyCodingInterviewDTO, ProjectDTO} from "../my-interviews/my-interviews.component";

export class User {
  public user_id: string
  public first_name: string
  public middle_name: string
  public last_name: string
  public username: string
  public full_name: string
}

export class UserCodingAnswers {
  public answer_file_link: string
  public id: string
  public interview_result: string
  public interview_status: string
  public coding_interview: MyCodingInterviewDTO
  public project: ProjectDTO
  public user: User
}

@Component({
  selector: 'app-coding-interview-answer',
  templateUrl: './coding-interview-answer.component.html',
  styleUrls: ['./coding-interview-answer.component.css']
})
export class CodingInterviewAnswerComponent implements OnInit {
  userAnswers: UserCodingAnswers[] = []

  constructor(private interviewService: ProjectInterviewService, private router: Router) {

  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const interviewId = localStorage.getItem("coding_interview_id")
    this.interviewService.findCodingInterviewOwner(interviewId).subscribe((response: any) => {
      this.userAnswers = response
    });

  }

  handleAcceptOrReject(uci: UserCodingAnswers, status: boolean) {
    this.interviewService.acceptCodingInterview(uci.id, status).subscribe((response: any) => {
      uci.interview_result = status ? "PASSED" : "FAILED"
      //this.fetchData()
    })
  }
}
