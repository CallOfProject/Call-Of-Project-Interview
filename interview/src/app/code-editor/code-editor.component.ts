import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {CodeRunService} from "../service/code-run.service";
import {CODE_COMPILE_TIME_SECOND, JAVA_PRE_CODE_DEFAULT, supportedLanguages} from "../../util/constants";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {document} from "ngx-bootstrap/utils";
import {SubmitInterviewService} from "../service/submit-interview.service";
import {MessageService} from 'primeng/api';
import {ProjectInterviewService} from "../service/project-interview.service";
import {CodingInterviewDTO} from "../dto/CodingInterviewDTO";
import {ActivatedRoute, Router} from "@angular/router";
import {toInt} from "ngx-bootstrap/chronos/utils/type-checks";

const KEY = 'time';
const DEFAULT = 999;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [MessageService]
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  protected readonly supportedLanguages = supportedLanguages;
  inlineStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(30,30,30)'
  };
  interviewId: string;
  userId: string;
  inputs = "";
  code = JAVA_PRE_CODE_DEFAULT
  result = ""
  language = "";
  currentTheme = "";
  intervalId: any;
  isCompileSuccess: boolean = true;
  question = ""
  isCompiling: boolean = false;
  compileStatusCode: string;
  usedMemory: string;
  usedTime: string;
  editorOptions: any = {
    theme: this.currentTheme,
    language: this.language,
    automaticLayout: true,
  };

  config: CountdownConfig = {leftTime: DEFAULT, notify: 0};


  constructor(private CodeRunService: CodeRunService,
              private el: ElementRef,
              private messageService: MessageService,
              private submitInterviewService: SubmitInterviewService,
              private projectService: ProjectInterviewService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private activeRoute: ActivatedRoute) {
    localStorage.setItem("refresh", "false");
    localStorage.setItem("theme", "vs-dark");
    localStorage.setItem("lang", JSON.stringify(supportedLanguages[0]));
    this.currentTheme = "vs-dark";
    this.setEditorOptions();
  }


  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.interviewId = params['interview_id'];
      this.userId = params['user_id'];
    });
    const interview_id = localStorage.getItem("interview_id");
    if (interview_id !== this.interviewId) {
      localStorage.clear()
    }
    localStorage.setItem("interview_id", this.interviewId);
    this.prepareInterview()
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = {...this.config, leftTime: value};
    this.code = localStorage.getItem('code') || this.code;
  }

  //http://localhost:4201/coding-interview?interview_id=6f19af33-5403-4b2a-961d-472ec399c216&user_id=0cb9844a-a538-4802-9665-fd4cd2a6536f
  //http://localhost:4201/coding-interview?interview_id=581b73a5-5cba-4607-815d-00d34bcbee8a&user_id=6cc3cdb5-0953-4728-bc17-0d87eae14e7e
  //http://localhost:4201/coding-interview?interview_id=b52d17d0-9226-4d3f-9021-e5da7849c924&user_id=0cb9844a-a538-4802-9665-fd4cd2a6536f
  /*  @HostListener('window:unload', ['$event'])
    beforeUnloadHandler(event: BeforeUnloadEvent) {
      localStorage.removeItem(KEY);
    }*/

  setEditorOptions() {
    let theme = localStorage.getItem("theme");
    let lang = JSON.parse(localStorage.getItem("lang")!!);
    this.editorOptions = {
      theme: theme,
      language: lang.monacoCode,
      automaticLayout: true,
    };

    this.code = localStorage.getItem('code') || lang.previewCode;
    this.currentTheme = theme;
    this.language = lang.monacoCode;
  }


  handleRunTestsButtonClicked() {
    this.createMessage('test_case', 'info', 'Not Supported', 'Test is not supported now!');
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
    localStorage.setItem('code', this.code);
  }

  async handleRunButtonClicked() {
    this.isCompiling = true;
    const language = JSON.parse(localStorage.getItem("lang")!!);

    this.CodeRunService.runCode(this.code, language.code, this.inputs).subscribe((resultRunCode) => {
      if (resultRunCode === -1) {
        this.showError()
        return
      }
      const status = resultRunCode.request_status.code;
      if (status != "REQUEST_FAILED") {
        // wait X second for code to compile
        setTimeout(() => {
          this.CodeRunService.getCodeResult(resultRunCode.status_update_url).subscribe(async (res) => {
            if (res === -1) {
              this.showError()
              return
            }
            this.compileStatusCode = res.request_status.code
            this.createMessage('test_case', 'info', 'Status', res.request_status.message);
            //console.log("MSG: ", res.request_status.message)
            //console.log("STATUS: ", res);
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
            this.usedMemory = res.result.run_status.memory_used
            this.usedTime = res.result.run_status.time_used
            //console.log("MEMORY: ", res.result.run_status.memory_used)
            //console.log("TIME:", res.result.run_status.time_used)
            //console.log("OUTPUT: ", output_file_url);
            // Wait for the Observable to complete and get its result
            this.CodeRunService.getOutput(output_file_url).subscribe(async (res) => {
              this.isCompiling = false;
              this.isCompileSuccess = true;
              this.result = res;
              this.changeDetectorRef.detectChanges();
            });
          })
        }, CODE_COMPILE_TIME_SECOND * 1000);
      }
    });
  }

  async handleEvent(ev: CountdownEvent) {
    switch (ev.action) {
      case 'notify':
        if (ev.left / 1000 === 300) {
          this.createMessage('test_case', 'info', 'Last 5 minutes', 'Last 5 minutes');
        }
        localStorage.setItem(KEY, `${ev.left / 1000}`);
        break;
      case 'start':
        this.createMessage('test_case', 'info', 'Interview Started', 'Interview has started!');
        break;
      case 'done':
        this.createMessage('test_case', 'success', 'Time is over', 'Interview time is over! Your answers will be submitted automatically. In 5 seconds, you will be redirected to the login page.');
        this.handleSubmitButtonClicked()
        this.timeoutAndRedirect(5, "login");
        break;
    }
  }


  handleSubmitButtonClicked() {
    const lang: ProgrammingLanguageDTO = JSON.parse(localStorage.getItem("lang")!!);
    this.submitInterviewService.submitCode(this.code, lang, this.userId, this.interviewId).subscribe((res: any) => {
      if (res.status_code === 2000) {
        this.createMessage('solved_before', 'success', 'Success', 'Your code submitted successfully! In 5 seconds, you will be redirected to the login page.');
        localStorage.removeItem(KEY);
        this.timeoutAndRedirect(3, "login");
      } else {
        this.createMessage('solved_before', 'error', 'Error', 'Error occurred while submitting your code! Please save the code and send report');
      }
    });
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

  handleQuitButtonClicked() {
    this.handleSubmitButtonClicked()
  }

  ngOnDestroy(): void {
    /*Object.keys(localStorage).forEach(key => {
      if (key !== KEY && key !== 'code') {
        localStorage.removeItem(key);
      }
    });*/
    localStorage.removeItem(KEY);
    clearInterval(this.intervalId);
  }

  private prepareInterview() {
    this.submitInterviewService.checkUserSolvedBefore(this.interviewId, this.userId).subscribe((res) => {
      if (!res.status) {
        if (res.status_code === 2006) { // not found
          this.createMessage('solved_before', 'warn', 'Not Found', 'This interview not assigned to you!');
          this.timeoutAndRedirect(5, "login");
        } else if (res.status_code === 2002) { // Not Found Interview
          this.createMessage('solved_before', 'error', 'Error', res.message)
          this.timeoutAndRedirect(3, 'login')
        } else { // if found then fetch the interview
          this.findInterview()
        }
      } else {
        this.createMessage('solved_before', 'info', 'Solved Before', 'You have solved this question before! In 5 seconds, you will be redirected to the login page.');
        this.timeoutAndRedirect(5, "login");
      }
    });
  }

  private findInterview() {
    this.projectService.findInterview(this.interviewId).subscribe((response: CodingInterviewDTO) => {
      if (response === null) { // if not found
        this.createMessage('solved_before', 'warn', 'Not Found', 'Interview information not found!');
        this.timeoutAndRedirect(5, "login");
        return;
      } else {

        if (localStorage.getItem(KEY) === DEFAULT.toString()) {
          localStorage.setItem(KEY, `${response.duration_minutes * 60}`);
          this.config = {...this.config, leftTime: response.duration_minutes * 60};
        }

        this.question = response.question;
      }
    });
  }

  onCodeChange(code: string) {
    this.code = code;
  }

  showError() {
    this.isCompiling = false;
    this.isCompileSuccess = false;
    this.result = "Error occurred while running the code!";
  }

  protected readonly localStorage = localStorage;
}
