import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {format} from 'date-fns';
import {MessageService} from "primeng/api";
import {ProjectInterviewService} from "../service/project-interview.service";
import {Root} from "../dto/UserProjectInterviewDTO";
import {CreateTestInterviewDTO} from "../dto/TestInterviewDTOs";

interface Project {
  name: string;
  code: string;
  id: string;
}

interface ProjectParticipant {
  name: string;
  id: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MessageService]
})
export class MainPageComponent implements OnInit {
  root: Root
  participants: ProjectParticipant[] = [];
  projects: Project[] = []
  selectedProject: Project;
  selectedParticipants: any[] = [];
  startDate: string;
  endDate: string;
  totalTime: number = 10;
  interviewName: string = "";
  private projectsObjects: any[];

  constructor(private router: Router, private messageService: MessageService, private projectService: ProjectInterviewService) {

  }


  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.projectService.findUserProjectsInfo().subscribe((response: Root) => {
      this.root = response;
      this.root.object.ownerProjects.forEach(project => {
        const p: Project = {name: project.projectName, code: project.projectId, id: project.projectId}
        this.projects.push(p)
        /*project.participants.participants.forEach(p => {
          const participant: ProjectParticipant = {name: p.user.username, id: p.user.user_id}
          this.participants.push(participant)
        })*/
      })
    });
  }

  handleCreateTestInterviewButtonClicked() {
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

    const startDateTime = this.getFormattedDate(this.startDate)
    const endDateTime = this.getFormattedDate(this.endDate)

    if (this.compareDates(startDateTime, endDateTime) === 1) {
      this.messageService.clear();
      this.messageService.add({
        key: 'fill_all_blanks',
        severity: 'error',
        summary: 'Date Error!',
        detail: 'start date cannot be greater than end date!'
      });
      return;
    }

     const testInterview = new CreateTestInterviewDTO()
     testInterview.title = this.interviewName
     testInterview.project_id = this.selectedProject.id
     testInterview.duration_minutes = this.totalTime
     testInterview.start_time = this.getFormattedDate(this.startDate)
     testInterview.end_time = this.getFormattedDate(this.endDate)
     testInterview.user_ids = this.selectedParticipants.map(participant => participant.id)

     sessionStorage.setItem("test_interview_prepare", JSON.stringify(testInterview))

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

  stringToDate(dateString: string): Date {
    const [day, month, year, hour, minute, second] = dateString.split(/[\s/:]+/).map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
      return null; // Geçersiz tarih
    }

    return new Date(year, month - 1, day, hour, minute, second);
  }

  compareDates = (dateString1: string, dateString2: string): number => {
    const start = this.stringToDate(dateString1);
    const end = this.stringToDate(dateString2);

    return start < end ? -1 : start > end ? 1 : 0;
  };

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

    const startDateTime = this.getFormattedDate(this.startDate)
    const endDateTime = this.getFormattedDate(this.endDate)

    if (this.compareDates(startDateTime, endDateTime) === 1) {
      this.messageService.clear();
      this.messageService.add({
        key: 'fill_all_blanks',
        severity: 'error',
        summary: 'Date Error!',
        detail: 'start date cannot be greater than end date!'
      });
      return;
    }

    const codingInterview = new CreateCodingInterviewDTO()
    codingInterview.user_ids = this.selectedParticipants.map(participant => participant.id)
    codingInterview.title = this.interviewName
    codingInterview.project_id = this.selectedProject.id
    codingInterview.duration_minutes = this.totalTime
    codingInterview.start_time = startDateTime
    codingInterview.end_time = endDateTime

    sessionStorage.setItem("coding_interview_prepare", JSON.stringify(codingInterview))

    this.router.navigate(['/create-coding-interview'])
  }

  handleSelectedProject() {
    const project = this.root.object.ownerProjects.filter((p) => p.projectId === this.selectedProject.id)[0]
    project.participants.participants.forEach(p => {
      const participant: ProjectParticipant = {name: p.user.username, id: p.user.user_id}
      this.participants.push(participant)
    })
  }
}
