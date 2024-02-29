export class ProgrammingLanguageDTO {
  name: string;
  code: string;
  monacoCode: string;
  previewCode: string;

  constructor(name: string, code: string, monacoCode: string, previewCode: string) {
    this.name = name;
    this.code = code;
    this.monacoCode = monacoCode;
    this.previewCode = previewCode;
  }
}
