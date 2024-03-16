import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmitInterviewService} from "../service/submit-interview.service";
import {MessageService} from "primeng/api";
import {TestQuestion} from "../dto/Question";
import {QuestionAnswerDTO} from "../dto/TestInterviewDTOs";

const KEY = 'time';


@Component({
  selector: 'app-test-interview',
  templateUrl: './test-interview.component.html',
  styleUrls: ['./test-interview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class TestInterviewComponent implements OnInit {
  duration = 0
  questionCount: number
  solvedQuestionCount: number
  currentQuestion: TestQuestion = new TestQuestion(0, "", [], 0);
  interviewId: string;
  userId: string;
  isSelectedOptionA: boolean = false;
  isSelectedOptionB: boolean = false;
  isSelectedOptionC: boolean = false;
  isSelectedOptionD: boolean = false;
  isTimeOver: boolean = false;

  config: CountdownConfig = {
    leftTime: 10, notify: 0, prettyText: (text) => {
      return text
        .split(' : ')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  constructor(private router: Router, private submitService: SubmitInterviewService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.interviewId = params['interview_id'];
      this.userId = params['user_id'];
    });

    this.prepareInterview()
  }


  handleSubmitInterviewButtonClicked() {
    if (!this.isTimeOver && !this.isSelectedAnyOption()) {
      this.createMessage('test_interview', 'warn', 'Warning', 'Please select an option')
      return;
    }

    if (!this.isTimeOver) {
      this.submitQuestion()
    }
    this.submitService.submitTestInterview(this.interviewId, this.userId).subscribe((response: any) => {
      console.log("SUBMIT INTERVIEW: ", response)
      if (response.status_code === 2000) {

        if (response.object) {
          this.createMessage('test_interview', 'success', 'Success', 'Your interview is submitted')
          this.timeoutAndRedirect(2, '/login')
        } else {
          this.createMessage('test_interview', 'error', 'Error', 'Your interview is not submitted!!')
        }
      } else {
        this.createMessage('test_interview', 'error', 'Error', 'Your interview is not submitted')
      }
    });
  }

  private prepareInterview() {
    this.submitService.getIsSolvedBefore(this.interviewId, this.userId).subscribe((response: any) => {
      if (response.status_code === 2006) { // Not Found User
        this.createMessage('test_interview', 'error', 'Error', 'This interview not assigned to you')
        this.timeoutAndRedirect(3, 'login')
      } else { // Success
        if (response.object === true) { // Solved before
          this.createMessage('test_interview', 'error', 'Warning!', 'You have already solved this test before')
          this.timeoutAndRedirect(3, 'login')
        } else { // Not solved before
          this.fetchInterviewInformation()
        }
      }
    });

  }


  private fetchInterviewInformation() {
    this.submitService.getTestInterviewInformation(this.interviewId).subscribe((response: any) => {
      if (response.status_code === 2000) {
        this.questionCount = response.object.question_count
        this.duration = response.object.duration_time

         let value = +localStorage.getItem(KEY)!! ?? this.duration * 1000;
         if (value <= 0) value = this.duration * 60;
         this.config = {...this.config, leftTime: value};

        if (this.questionCount === 0) {
          this.createMessage('test_interview', 'error', 'Error', 'There is no question in this interview')
          this.timeoutAndRedirect(5, 'login')
        } else {
          this.solvedQuestionCount = 1
          this.fetchQuestionByIndex(0)
        }
      } else {
        this.createMessage('test_interview', 'error', 'Error', 'Interview information not found')
        this.timeoutAndRedirect(5, 'login')
      }
    });
  }


  private fetchQuestionByIndex(idx: number) {
    this.submitService.getTestQuestion(this.interviewId, idx).subscribe((response: any) => {
      if (response.status_code === 2000) {
        const options = [response.object.option1, response.object.option2, response.object.option3, response.object.option4]
        this.currentQuestion = new TestQuestion(response.object.id, response.object.question, options, response.object.point)
      }
    });

  }

  handleNextQuestionButtonClicked() {
    if (!this.isSelectedAnyOption()) {
      this.createMessage('test_interview', 'warn', 'Warning', 'Please select an option')
      return;
    }
    this.submitQuestion()
    this.resetOptions()
    this.fetchQuestionByIndex(this.solvedQuestionCount++)
  }


  private submitQuestion() {
    const answer = this.isTimeOver ? "" : this.getAnswer()
    const dto = new QuestionAnswerDTO(this.userId, this.interviewId, this.currentQuestion.question_id, answer)
    this.submitService.submitTestQuestion(dto).subscribe((response: any) => {
      if (response.status_code === 2000) {
        this.createMessage('test_interview', 'success', 'Success', 'Your answer is submitted')
      } else {
        this.createMessage('test_interview', 'error', 'Error', 'Your answer is not submitted')
      }
    });
  }

  isSelectedAnyOption() {
    return this.isSelectedOptionA || this.isSelectedOptionB || this.isSelectedOptionC || this.isSelectedOptionD;
  }

  resetOptions() {
    this.isSelectedOptionA = false;
    this.isSelectedOptionB = false;
    this.isSelectedOptionC = false;
    this.isSelectedOptionD = false;
  }


  getAnswer(): string {
    if (this.isSelectedOptionA) {
      return this.currentQuestion.options[0];
    }
    if (this.isSelectedOptionB) {
      return this.currentQuestion.options[1];
    }
    if (this.isSelectedOptionC) {
      return this.currentQuestion.options[2];
    }
    if (this.isSelectedOptionD) {
      return this.currentQuestion.options[3];
    }
  }

  handleCheckOptionA() {
    this.isSelectedOptionA = !this.isSelectedOptionA;
  }

  handleCheckOptionB() {
    this.isSelectedOptionB = !this.isSelectedOptionB;
  }

  handleCheckOptionC() {
    this.isSelectedOptionC = !this.isSelectedOptionC;
  }

  handleCheckOptionD() {
    this.isSelectedOptionD = !this.isSelectedOptionD;
  }

  createMessage(key: string, severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({key, severity, summary, detail});
  }

  timeoutAndRedirect(timeSeconds: number, to: string) {
    setTimeout(() => {
      this.router.navigate([`/${to}`]);
    }, timeSeconds * 1000);
  }

  handleEvent(ev: CountdownEvent) {

    if (ev.action === 'notify') {
      // Save current value
      //localStorage.setItem(KEY, `${ev.left / 1000}`);
    }

    if (ev.action === 'done') {
      localStorage.removeItem(KEY);
      this.isTimeOver = true;
      this.createMessage('test_interview', 'error', 'Error', 'Time is over')
      this.handleSubmitInterviewButtonClicked()
    }
  }
}
