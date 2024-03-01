import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {CodeRunService} from "../service/code-run.service";
import {CODE_COMPILE_TIME_SECOND, JAVA_PRE_CODE_DEFAULT, supportedLanguages} from "../../util/constants";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {document} from "ngx-bootstrap/utils";
import {SubmitInterviewService} from "../service/submit-interview.service";
import { MessageService } from 'primeng/api';

const KEY = 'time';
const DEFAULT = 100000;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]

})
export class CodeEditorComponent implements OnInit, OnDestroy {

  counter = 0;
  inputs = "";
  code = JAVA_PRE_CODE_DEFAULT
  result = ""
  language = "";
  currentTheme = "";
  isFullScreen: boolean = false;
  intervalId: any;
  isCompileSuccess: boolean = true;
  question = 'Programming Question:\n' +
    'Problem Description:\n' +
    '\n' +
    'A Java program is expected to be developed for a producer-consumer scenario. In this scenario, a producer continuously adds values to a queue while a consumer retrieves these values from the queue and processes them. The addition of values by the producer to the queue and the retrieval of these values by the consumer should occur asynchronously. The goal of the program is to work efficiently with collaboration between the producer and consumer.\n' +
    '\n' +
    'Tasks:\n' +
    '\n' +
    'Create a class named Producer. This class will generate random integers at certain intervals and add them to a queue.\n' +
    'Create a class named Consumer. This class will retrieve integers from the queue and print them to the console.\n' +
    'Implement the necessary structure to run the producer and consumer in separate threads.\n' +
    'Take necessary steps to ensure the correctness of the program.\n' +
    'Requirements:\n' +
    '\n' +
    'The size of the queue should be fixed and kept in a variable named QUEUE_SIZE. (For example, final int QUEUE_SIZE = 10;)\n' +
    'The producer should continue adding values to the queue, while the consumer should retrieve values from the queue until the total produced value reaches 100.\n' +
    'Synchronization between the producer and consumer should be ensured using semaphores or other synchronization mechanisms.\n' +
    'Hint:\n' +
    '\n' +
    'You can use Semaphore or other synchronization mechanisms for synchronization between the producer and consumer.\n' +
    'Use ExecutorService or Thread classes to manage threads.\n' +
    'Question:\n' +
    '\n' +
    'Develop a Java program according to the above requirements. Organize your code with explanatory comments and appropriate variable names.';
  protected readonly supportedLanguages = supportedLanguages;
  isCompiling: boolean = false;
  editorOptions: any = {
    theme: this.currentTheme,
    language: this.language,
    automaticLayout: true,
  };

  config: CountdownConfig = {
    leftTime: DEFAULT, notify: 0, prettyText: (text) => {
      return text
        .split(' : ')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  inlineStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(30,30,30)'
  };


  constructor(private CodeRunService: CodeRunService, private el: ElementRef, private submitInterviewService: SubmitInterviewService,
              private messageService: MessageService) {
    /* this.toggleFullscreen()
     this.intervalId = setInterval(() => {
       this.checkFullScreen();
     }, 10000);*/
    localStorage.setItem("theme", "vs-dark");
    localStorage.setItem("lang", JSON.stringify(supportedLanguages[0]));
    this.currentTheme = "vs-dark";
    this.setEditorOptions();
  }


  onCodeChange(code: string) {
    this.code = code;
  }

  checkFullScreen() {
    this.isFullScreen = (document.fullscreenElement !== null);

    if (!this.isFullScreen) {
      this.toggleFullscreen();
      if (this.counter >= 5) {
        alert("Your exam canceled because you closed the full screen mode 5 times.")
        return
      }

      this.counter++;
      console.log(this.counter);
    }
  }


  toggleFullscreen() {
    const elem = this.el.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  setEditorOptions() {
    let theme = localStorage.getItem("theme");
    let lang = JSON.parse(localStorage.getItem("lang")!!);
    this.editorOptions = {
      theme: theme,
      language: lang.monacoCode,
      automaticLayout: true,
    };
    this.code = lang.previewCode;
    this.currentTheme = theme;
    this.language = lang.monacoCode;


  }


  handleRunButtonClicked() {
    console.log("INPUTS: ", this.inputs)
    //console.log("RUNNING CODE: ", this.code);
    this.isCompiling = true;
    const language = JSON.parse(localStorage.getItem("lang")!!);

    this.CodeRunService.runCode(this.code, language.code, this.inputs).subscribe((resultRunCode) => {
      console.log("RUN: ", resultRunCode);
      const status = resultRunCode.request_status.code;
      if (status != "REQUEST_FAILED") {
        // wait 10 second
        setTimeout(() => {
          this.CodeRunService.getCodeResult(resultRunCode.status_update_url).subscribe((res) => {
            console.log("STATUS: ", res);
            const output_file_url = res.result.run_status.output;
            if (res.result.run_status.status === "RE" || res.result.run_status.status === "TLE" || res.result.run_status.status === "MLE") {
              this.isCompiling = false;
              this.isCompileSuccess = false;
              this.result = res.result.run_status.stderr
              return;
            } else if (output_file_url === null) {
              this.isCompiling = false;
              this.isCompileSuccess = false;
              this.result = res.result.compile_status;
              return
            }
            console.log("OUTPUT: ", output_file_url);
            this.CodeRunService.getOutput(output_file_url).subscribe((res) => {
              console.log("RESULT: ", res);
              this.isCompiling = false;
              this.isCompileSuccess = true;
              this.result = res;
            })
          });
        }, CODE_COMPILE_TIME_SECOND * 1000);
      }
    });
  }

  handleEvent(ev: CountdownEvent) {

    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }

    if (ev.action === 'done') {
      // Clear local storage
      localStorage.removeItem(KEY);
      alert("Time is up!")
    }

  }

  ngOnInit(): void {
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = {...this.config, leftTime: value};
  }


  handleChangeLanguage(lang: ProgrammingLanguageDTO) {
    this.language = lang.monacoCode;
    this.editorOptions = {
      theme: this.currentTheme,
      language: this.language,
      automaticLayout: true,
    };
    localStorage.setItem("lang", JSON.stringify(lang));
    this.code = lang.previewCode;

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  handleRunTestsButtonClicked() {
    this.messageService.clear();
    this.messageService.add({key: 'test_case', severity: 'info', summary: 'Not Supported Now', detail: 'Test is not supported now!'});
  }

  protected readonly localStorage = localStorage;

  handleSubmitButtonClicked() {
    const lang: ProgrammingLanguageDTO = JSON.parse(localStorage.getItem("lang")!!);
    this.submitInterviewService.submitCode(this.code, lang).subscribe((res) => {
      console.log("SUBMIT INTERVIEW: ", res);
    });

  }
}
