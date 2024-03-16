import {Component, OnInit} from '@angular/core';
import {ProjectDTO} from "../my-interviews/my-interviews.component";
import {User} from "../coding-interview-answer/coding-interview-answer.component";
import {ProjectInterviewService} from "../service/project-interview.service";
import {Router} from "@angular/router";

export class MyQuestionDTO {
  public question: string
  public option1: string
  public option2: string
  public option3: string
  public option4: string
  public point: number
  public id: string
}

export class MyTestInterviewDTO {
  public description: string
  public duration_minutes: number
  public end_time: string
  public interview_id: string
  public project_dto: ProjectDTO
  public question_count: number
  public questions: MyQuestionDTO[]
  public start_time: string
  public interview_result: string
  public interview_status: string
  public title: string
  public total_score: number
}

export class UserTestAnswers {
  public id: string
  public interview_result: string
  public interview_status: string
  public project: ProjectDTO
  public score: number
  public test_interview: MyTestInterviewDTO
  public user: User
  public user_answers: UserQuestionAnswersDTO[]
}

export class UserQuestionAnswersDTO {
  public correct_answer: string
  public option1: string
  public option2: string
  public option3: string
  public option4: string
  public answer: string
  public interview_id: string
  public question: string
  public question_id: number
  public user_id: string
}

@Component({
  selector: 'app-test-interview-answer',
  templateUrl: './test-interview-answer.component.html',
  styleUrls: ['./test-interview-answer.component.css']
})
export class TestInterviewAnswerComponent implements OnInit {
  userAnswers: UserTestAnswers[] = []
  totalScore: number

  constructor(private interviewService: ProjectInterviewService, private router: Router) {

  }

  ngOnInit() {
    this.fetchData();

  }

  fetchData() {
    const interviewId = localStorage.getItem("test_interview_id")
    this.interviewService.findTestInterviewOwner(interviewId).subscribe((response: any) => {
      this.userAnswers = response
      console.log(response)
      const testScore = response[0].test_interview.total_score
      this.totalScore = testScore ? testScore : 0

    });

  }

  handleAcceptOrReject(uti: UserTestAnswers, status: boolean) {
    this.interviewService.acceptTestInterview(uti.test_interview.interview_id, status).subscribe((response: any) => {
      uti.interview_result = status ? "PASSED" : "FAILED"
      //this.fetchData()
    })
  }

  handleShowAnswers(uti: UserTestAnswers) {
    localStorage.setItem('user_test_answers', JSON.stringify(uti))
    this.router.navigate([`/test-answer`])
  }
}
