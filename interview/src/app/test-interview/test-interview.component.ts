import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {Question} from "../dto/Question";
import {TestOption} from "../dto/TestOption";

const KEY = 'time';
const DEFAULT = 60;

@Component({
  selector: 'app-test-interview',
  templateUrl: './test-interview.component.html',
  styleUrls: ['./test-interview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  styles: [
    `
      :host ::ng-deep {
        .item {
          font-size: 25px;

          &:nth-child(1) {
            color: white !important;
          }

          &:nth-child(2) {
            color: white;
          }

          &:nth-child(3) {
            color: white;
          }
        }
      }
    `,
  ]
})
export class TestInterviewComponent implements OnInit {
  config: CountdownConfig = {
    leftTime: DEFAULT, notify: 0, prettyText: (text) => {
      return text
        .split(' : ')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };
  interviewName: any;
  correctQ1 = new TestOption("Delhi", true)
  correctQ2 = new TestOption("London", true)
  correctQ3 = new TestOption("Paris", true)
  correctQ4 = new TestOption("Berlin", true)
  correctQ5 = new TestOption("Rome", true)
  correctQ6 = new TestOption("Madrid", true)
  correctQ7 = new TestOption("Tokyo", true)
  correctQ8 = new TestOption("Beijing", true)
  correctQ9 = new TestOption("Moscow", true)
  correctQ10 = new TestOption("Canberra", true)

  questions = [
    new Question("What is the capital of India?", [new TestOption("Mumbai", false), this.correctQ1, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ1),
    new Question("What is the capital of England?", [new TestOption("Mumbai", false), this.correctQ2, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ2),
    new Question("What is the capital of France?", [new TestOption("Mumbai", false), this.correctQ3, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ3),
    new Question("What is the capital of Germany?", [new TestOption("Mumbai", false), this.correctQ4, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ4),
    new Question("What is the capital of Italy?", [new TestOption("Mumbai", false), this.correctQ5, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ5),
    new Question("What is the capital of Spain?", [new TestOption("Mumbai", false), this.correctQ6, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ6),
    new Question("What is the capital of Japan?", [new TestOption("Mumbai", false), this.correctQ7, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ7),
    new Question("What is the capital of China?", [new TestOption("Mumbai", false), this.correctQ8, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ8),
    new Question("What is the capital of Russia?", [new TestOption("Mumbai", false), this.correctQ9, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ9),
    new Question("What is the capital of Australia?", [new TestOption("Mumbai", false), this.correctQ10, new TestOption("Kolkata", false), new TestOption("Chennai", false)], this.correctQ10),
  ];

  handleSubmitInterviewButtonClicked() {

  }

  ngOnInit(): void {
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = {...this.config, leftTime: value};
  }

  handleEvent(ev: CountdownEvent) {

    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }

    /* if (ev.action === 'done') {
       // Clear local storage
       localStorage.removeItem(KEY);
       alert("Time is up!")
     }*/

  }
}
