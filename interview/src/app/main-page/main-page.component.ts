import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {format} from 'date-fns';
import {MessageService} from "primeng/api";

interface Project {
  name: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MessageService]
})
export class MainPageComponent implements OnInit {

  participants: any[] = [{name: "Participant 1", id: "1"}, {name: "Participant 2", id: "2"}, {
    name: "Participant 3",
    id: "3"
  }];
  projects: any[] = [{name: "Project 1", code: "1"}, {name: "Project 2", code: "2"}, {name: "Project 3", code: "3"}];
  selectedProject: string;
  selectedParticipants: any[] = [];
  startDate: string;
  endDate: string;
  totalTime: number = 45;
  interviewName: string = "";

  constructor(private router: Router, private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {

  }

  handleCreateTestInterviewButtonClicked() {
    this.router.navigate(['/create-test-interview'])
  }

  getFormattedDate(dateStr: string) {
    const date = new Date(dateStr);

    return format(date, 'dd/MM/yyyy kk:mm:ss');
  }

  checkAllOptionsFilled(): boolean {
    if (!this.selectedProject) {
      return false;
    }
    if (this.selectedParticipants.length === 0) {
      return false;
    }
    if (!this.startDate) {
      return false;
    }
    if (!this.endDate) {
      return false;
    }
    if (!this.interviewName) {
      return false;
    }
    return true;
  }

  handleCreateCodingInterviewButtonClicked() {

    const result = this.checkAllOptionsFilled();
    if (!result) {
      this.messageService.clear();
      this.messageService.add({
        key: 'fill_all_blanks',
        severity: 'error',
        summary: 'Please fill all blanks!',
        detail: 'Please fill all blanks!'
      });
      return;
    }

    const codingInterview = new CreateCodingInterviewDTO()
    codingInterview.user_ids = this.selectedParticipants.map(participant => participant.id)
    codingInterview.title = this.interviewName
    codingInterview.project_id = this.selectedProject
    codingInterview.duration_minutes = this.totalTime
    codingInterview.start_time = this.getFormattedDate(this.startDate)
    codingInterview.end_time = this.getFormattedDate(this.endDate)

    sessionStorage.setItem("coding_interview_prepare", JSON.stringify(codingInterview))

    this.router.navigate(['/create-coding-interview'])
  }
}
