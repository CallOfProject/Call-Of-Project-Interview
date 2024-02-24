import {Question} from "./Question";

export class TestInterview {
  private readonly _questionList: Question[] = [];

  public constructor(interviewName: string, projectId: string) {
  }

  public addQuestion(question: Question) {
    this._questionList.push(question);
  }

  get questionList(): Question[] {
    return this._questionList;
  }
}
