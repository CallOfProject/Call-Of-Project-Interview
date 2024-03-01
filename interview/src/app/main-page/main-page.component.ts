import {Component} from '@angular/core';
import {Router} from "@angular/router";

interface Project {
  name: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

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

  constructor(private router: Router) {

  }

  handleCreateTestInterviewButtonClicked() {

    this.router.navigate(['/create-test-interview'])

  }

  handleCreateCodingInterviewButtonClicked() {
    this.router.navigate(['/create-coding-interview'])

  }


}
