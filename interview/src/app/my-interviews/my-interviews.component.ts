import {Component, OnInit} from '@angular/core';
import {ProjectInterviewService} from "../service/project-interview.service";
import {CURRENT_USER} from "../../util/constants";
import {Router} from "@angular/router";

export interface Product {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
}

export class CodingAndTestInterviewDTO {
  public codingInterviewDTO: MyCodingInterviewDTO[]
  public testInterviewDTO: TestInterviewDTO[]
}

export class ProjectDTO {
  public projectId: string
  public projectName: string
  public projectStatus: string
}

export class TestInterviewDTO {
  public startDateObj: Date
  public endDateObj: Date
  public interviewType: string = "Test Interview"
  public interview_id: string
  public title: string
  public start_time: string
  public projectDTO: ProjectDTO
  public total_score: number
  public end_time: string
  public duration_minutes: number
  public question_count: number
  public description: string
  status: boolean
  public questions: QuestionDTO[]
}

export class QuestionDTO {
  public question: string
  public option1: string
  public option2: string
  public option3: string
  public option4: string
  //answer: string
  public point: number
  public id: string
}

export class MyCodingInterviewDTO {
  status: boolean
  public startDateObj: Date
  public endDateObj: Date
  public interviewType: string = "Coding Interview"
  public description: string
  public duration_minutes: number
  public end_time: string
  public interview_id: string
  public project_dto: ProjectDTO
  public start_time: string
  public title: string
  public interview_status: string
  public question: string
  public point: number
}

@Component({
  selector: 'app-my-interviews',
  templateUrl: './my-interviews.component.html',
  styleUrls: ['./my-interviews.component.css']
})
export class MyInterviewsComponent implements OnInit {

  testAndCodingInterviews: any[] = []


  constructor(private interviewService: ProjectInterviewService, private router: Router) {
  }


  handleShowQuestionAndAnswersBtn(interview: any, interviewType: string) {
    if (interviewType === 'Coding Interview') {
      this.router.navigate([`/coding-interview-answer`]).then(() => {
        localStorage.setItem('coding_interview_id', interview.interview_id)
      })
    } else {
      this.router.navigate([`/test-interview-answer/${interview.interview_id}`])
    }
  }

  handleEditBtn(interview: any, interviewType: string) {


  }

  handleRemoveBtn(interview: any, interviewType: string) {
    if (interviewType === 'Coding Interview') {
      this.interviewService.removeCodingInterview(interview.interview_id).subscribe((response: any) => {
        this.fetchData()
      })
    } else {
      this.interviewService.removeTestInterview(interview.interview_id).subscribe((response: any) => {
        this.fetchData()
      })
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    this.interviewService.findAllInterviewsByUserId(user.user_id).subscribe((response: CodingAndTestInterviewDTO) => {
      response.codingInterviewDTO.forEach((ci) => {
        this.testAndCodingInterviews.push(ci)
      })
      response.testInterviewDTO.forEach((ti) => {
        this.testAndCodingInterviews.push(ti)
      })
    });

  }

  getStatusVal(startDateObj: Date, endDateObj: Date): string {
    const now = new Date();
    if (now < startDateObj) {
      return "Not Started"
    } else if (now >= startDateObj && now <= endDateObj) {
      return "In Progress"
    } else {
      return "Finished"
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Not Started':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Finished':
        return 'danger';
    }
  }
}
