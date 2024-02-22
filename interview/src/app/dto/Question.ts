import {TestOption} from "./TestOption";

export class Question {
  public constructor(public question: string, public options: TestOption[], public correctOption: TestOption,
                     public selectedOption: TestOption) {
  }
}
