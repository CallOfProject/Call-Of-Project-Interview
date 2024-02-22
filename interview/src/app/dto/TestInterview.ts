import {Question} from "./Question";

export class TestInterview {
  private readonly questionList: Question[] = [];

  public constructor(interviewName: string, projectId: string) {
  }

  public addQuestion(question: Question) {
    this.questionList.push(question);
  }

}
