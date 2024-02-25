import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CountdownConfig, CountdownEvent} from "ngx-countdown";
import {document} from "ngx-bootstrap/utils";

const KEY = 'time';
const DEFAULT = 60;
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {


  },
  styles: [
    `
      :host ::ng-deep {
        .item {
          font-size: 23px;

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
export class CodeEditorComponent implements OnInit{
  config: CountdownConfig = {
    leftTime: DEFAULT, notify: 0, prettyText: (text) => {
      return text
        .split(' : ')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  language = 'javascript';
  currentTheme = "";

  languages = [{label: "JavaScript", value: "javascript"}, {label: "Python", value: "python"}, {label: "Java", value: "java"}]
  editorOptions: any = {
    theme: this.currentTheme,
    language: this.language,
    automaticLayout: true,
  };


  onCodeChange(code: string) {
    this.code = code; // Kodu günceller
  }

  setEditorOptions() {
    let theme = localStorage.getItem("theme");
    this.editorOptions = {
      theme: theme,
      language: this.language,
      automaticLayout: true,
    };

    this.currentTheme = theme;


  }

  inlineStyles = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(30,30,30)'
  };

  constructor() {
    localStorage.setItem("theme", "vs-dark");
    this.currentTheme = "vs-dark";
    this.setEditorOptions();
  }

  saveToFile() {
    const filename = 'example.js'; // Kaydedilecek dosya adı

    // Kodu bir Blob nesnesine dönüştür
    const blob = new Blob([this.code], {type: 'text/plain'});

    // Dosyayı indirmek için bir <a> etiketi oluştur
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // <a> etiketini simüle ederek dosyayı indir
    document.body.appendChild(link);
    link.click();

    // Geçici <a> etiketini kaldır
    document.body.removeChild(link);

  }

  code = 'var findMedianSortedArrays = function(nums1, nums2) {\n' +
    '    var nums = nums1.concat(nums2);\n' +
    '    \n' +
    '    function quickSort(arr){\n' +
    '        if(arr.length<=1){return arr;}\n' +
    '        var pivotIndex=Math.floor(arr.length/2);\n' +
    '\n' +
    '        var pivot=arr.splice(pivotIndex,1)[0];\n' +
    '\n' +
    '        var left=[];\n' +
    '        var right=[];\n' +
    '\n' +
    '        for(var i=0;i<arr.length;i++){\n' +
    '            if(arr[i]<=pivot){\n' +
    '                left.push(arr[i]);\n' +
    '            }else{\n' +
    '                right.push(arr[i]);\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '        return quickSort(left).concat([pivot],quickSort(right));\n' +
    '    }\n' +
    '    nums = quickSort(nums);\n' +
    '    \n' +
    '    var numLength = nums.length;\n' +
    '    \n' +
    '    if(numLength % 2 == 0){\n' +
    '        let len = numLength/2;\n' +
    '        return (nums[len-1]+nums[len])/2;\n' +
    '    }else{\n' +
    '        let len1 = (numLength/2)-0.5;\n' +
    '        return nums[len1];\n' +
    '    }\n' +
    '    \n' +
    '};'

  protected readonly localStorage = localStorage;

  handleRunButtonClicked() {
    console.log(this.code)
    this.saveToFile()
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

  ngOnInit(): void {
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = {...this.config, leftTime: value};
  }
}
