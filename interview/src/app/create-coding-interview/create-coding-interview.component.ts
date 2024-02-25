import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-coding-interview',
  templateUrl: './create-coding-interview.component.html',
  styleUrls: ['./create-coding-interview.component.css']
})
export class CreateCodingInterviewComponent implements OnInit, OnDestroy {


  constructor(private router: Router) {
  }
  ngOnInit(): void {

  }
  pairs: any[] = [];

  addPair() {
    this.pairs.push({});
  }
  // make sure to destory the editor
  question: string = "";
  checked: boolean = false;
  codeReviewChecked: boolean = true;
  ngOnDestroy(): void {

  }

  handleCreateInterviewClicked() {
    this.router.navigate(['/coding-interview'])

  }
}
