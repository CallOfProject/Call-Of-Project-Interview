import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {CodeRunService} from "../service/code-run.service";
import {CODE_COMPILE_TIME_SECOND, JAVA_PRE_CODE_DEFAULT, supportedLanguages} from "../../util/constants";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {document} from "ngx-bootstrap/utils";
import {SubmitInterviewService} from "../service/submit-interview.service";


const KEY = 'time';
const DEFAULT = 100000;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CodeEditorComponent implements OnInit, OnDestroy {

  counter = 0;
  code = JAVA_PRE_CODE_DEFAULT
  result = ""
  language = "";
  currentTheme = "";
  isFullScreen: boolean = false;
  intervalId: any;
  isCompileSuccess: boolean = true;
  question = "Write a Java program to check if a given number is an Armstrong number or not. " +
    "An Armstrong number (also known as narcissistic number) is a number that is equal to the sum of its own digits raised to the power of the number of digits. " +
    "Your program should:\n" +
    "\n" +
    "Prompt the user to enter a number.\n" +
    "Determine whether the entered number is an Armstrong number or not.\n" +
    "Print an appropriate message indicating whether the number is an Armstrong number or not.\n" +
    "Write a function named isArmstrong that takes an integer parameter and returns true if the number is an Armstrong number," +
    " otherwise returns false. Use this function to determine whether the entered number is an Armstrong number or not." +
    "Enter a number: 153\n" +
    "153 is an Armstrong number.\n" +
    "\n" +
    "Enter a number: 123\n" +
    "123 is not an Armstrong number.\n";
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


  constructor(private CodeRunService: CodeRunService, private el: ElementRef, private submitInterviewService: SubmitInterviewService) {
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
    console.log("RUNNING CODE: ", this.code);
    this.isCompiling = true;
    const language = JSON.parse(localStorage.getItem("lang")!!);

    this.CodeRunService.runCode(this.code, language.code).subscribe((resultRunCode) => {
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


  }

  protected readonly localStorage = localStorage;

  handleSubmitButtonClicked() {
    const lang: ProgrammingLanguageDTO = JSON.parse(localStorage.getItem("lang")!!);
    this.submitInterviewService.submitCode(this.code, lang).subscribe((res) => {
      console.log("SUBMIT INTERVIEW: ", res);
    });

  }
}
