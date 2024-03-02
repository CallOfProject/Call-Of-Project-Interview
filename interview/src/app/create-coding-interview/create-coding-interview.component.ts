import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {SubmitInterviewService} from "../service/submit-interview.service";

@Component({
  selector: 'app-create-coding-interview',
  templateUrl: './create-coding-interview.component.html',
  styleUrls: ['./create-coding-interview.component.css'],
  providers: [MessageService]
})
export class CreateCodingInterviewComponent implements OnInit, OnDestroy {


  constructor(private router: Router, private messageService: MessageService,
              private submitInterviewService: SubmitInterviewService) {
  }

  ngOnInit(): void {

  }


  // make sure to destory the editor
  question: string = "";
  checked: boolean = false;
  codeReviewChecked: boolean = true;

  ngOnDestroy(): void {
    sessionStorage.clear()

  }

  handleCreateInterviewClicked() {
    const result = this.checkAllFields()
    if (!result) {
      this.messageService.clear();
      this.messageService.add({
        key: 'fill_all_blanks_coding',
        severity: 'error',
        summary: 'Please fill all blanks!',
        detail: 'Please fill all blanks!'
      });
      return
    }
    const storage: CreateCodingInterviewDTO = JSON.parse(sessionStorage.getItem("coding_interview_prepare"))
    storage.question = this.question;
    storage.description = "";
    storage.point = 100;

    sessionStorage.setItem("coding_interview_prepare", JSON.stringify(storage))
    this.submitInterviewService.createCodingInterview(storage).subscribe((response: any) => {
      if (response.status_code === 1999) {
        this.messageService.clear();
        this.messageService.add({
          key: 'create_coding_interview',
          severity: 'success',
          summary: 'Success',
          detail: 'Coding interview created successfully!'
        });
        setTimeout(() => {
          this.router.navigate(['main-menu'])
        }, 2000);
      }
    })
  }

  private checkAllFields(): boolean {
    return this.question !== "";
  }
}
