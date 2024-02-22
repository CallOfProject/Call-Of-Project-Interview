import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
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

  constructor(private router: Router) {

  }

  public projectControl = new FormControl<Project | null>(null, Validators.required);
  public animals: Project[] = [
    {name: 'Call Of Project'},
    {name: 'AccountX'},
    {name: 'Unit Test Framework'},
  ];

  handleCreateTestInterviewButtonClicked() {

    this.router.navigate(['/create-test-interview'])

  }

  handleCreateCodingInterviewButtonClicked() {


  }
}
