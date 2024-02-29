import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {CodeRunService} from "../service/code-run.service";
import {CODE_COMPILE_TIME_SECOND, JAVA_PRE_CODE_DEFAULT, supportedLanguages} from "../../util/constants";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {document} from "ngx-bootstrap/utils";


const KEY = 'time';
const DEFAULT = 100000;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CodeEditorComponent implements OnInit, OnDestroy {

  code = JAVA_PRE_CODE_DEFAULT
  result = ""
  language = "";
  currentTheme = "";
  isFullScreen: boolean = false;
  intervalId: any;

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


  constructor(private CodeRunService: CodeRunService, private el: ElementRef) {
    this.toggleFullscreen()
    this.intervalId = setInterval(() => {
      this.checkFullScreen();
    }, 30000); // Her 30 saniyede bir kontrol et
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
      //...
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
    this.isCompiling = true;
    const language = JSON.parse(localStorage.getItem("lang")!!);

    this.CodeRunService.runCode(this.code, language.code).subscribe((resultRunCode) => {
      //console.log("RUN: ", resultRunCode);
      const status = resultRunCode.request_status.code;
      if (status != "REQUEST_FAILED") {
        // wait 10 second
        setTimeout(() => {
          this.CodeRunService.getCodeResult(resultRunCode.status_update_url).subscribe((res) => {
            //console.log("STATUS: ", res);
            const output_file_url = res.result.run_status.output;
            //console.log("OUTPUT: ", output_file_url);
            this.CodeRunService.getOutput(output_file_url).subscribe((res) => {
              //console.log("RESULT: ", resultRunCode);
              this.isCompiling = false;
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

  protected readonly supportedLanguages = supportedLanguages;
  isCompiling: boolean = false;

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
}
