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

  projects: any[] = [{name: "Project 1", id: "1"}, {name: "Project 2", id: "2"}, {name: "Project 3", id: "3"}];
  selectedProject: string;

  constructor(private router: Router) {

  }

  handleCreateTestInterviewButtonClicked() {

    this.router.navigate(['/create-test-interview'])

  }

  handleCreateCodingInterviewButtonClicked() {
    this.router.navigate(['/create-coding-interview'])

  }

  startDate: string;
  endDate: string;
}
