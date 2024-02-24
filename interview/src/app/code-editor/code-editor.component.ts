import {Component} from '@angular/core';

declare let monaco: any;

export function createDependencyProposals(): any {
  return [{
    label: 'cl',
    kind: monaco.languages.CompletionItemKind.Snippet,
    documentation: 'Print code',
    insertText: 'console.log(${1})',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
  }];
}

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {

  language = 'javascript';
  currentTheme = "";

  editorOptions: any = {
    theme: this.currentTheme,
    language: this.language,
    automaticLayout: true,
  };

  setEditorOptions() {
    let theme = localStorage.getItem("theme");
    this.editorOptions = {
      theme: theme,
      language: this.language,
      automaticLayout: true,
    };

    this.currentTheme = theme;


  }

  constructor() {
    localStorage.setItem("theme", "vs-dark");
    this.currentTheme = "vs-dark";
    this.setEditorOptions();
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
}
