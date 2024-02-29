export class ProgrammingLanguageDTO {
  name: string;
  code: string;
  monacoCode: string;
  previewCode: string;
  extension: string;

  constructor(name: string, code: string, monacoCode: string, previewCode: string, extension: string) {
    this.name = name;
    this.code = code;
    this.monacoCode = monacoCode;
    this.previewCode = previewCode;
    this.extension = extension;
  }
}
