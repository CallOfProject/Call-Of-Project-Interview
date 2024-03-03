export class Question {
  public constructor(public id: string, public question: string, public options: string[], public answer: string) {
  }
}

export class TestQuestion {
  public constructor(public question_id: number, public question: string, public options: string[], public point: number) {
  }
}
