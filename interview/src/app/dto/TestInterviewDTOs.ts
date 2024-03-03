export class CreateTestInterviewDTO {
  public title: string
  public question_count: number
  public description: string
  public duration_minutes: number
  public total_score: number
  public project_id: string
  public start_time: string
  public end_time: string
  public user_ids: string[]
  public question_list: QuestionDTO[]

  constructor() {
    this.description = "No Content"
  }
}

export class QuestionDTO {
  public question: string
  public option1: string
  public option2: string
  public option3: string
  public option4: string
  public answer: string
  public point: number


  constructor(question: string, option1: string, option2: string, option3: string, option4: string, answer: string, point: number) {
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.answer = answer;
    this.point = point;
  }
}

export class QuestionAnswerDTO {
  public question_id: number
  public user_id: string
  public interview_id: string
  public answer: string

  constructor(user_id: string, interview_id: string, question_id: number, answer: string) {
    this.user_id = user_id;
    this.question_id = question_id;
    this.answer = answer;
    this.interview_id = interview_id;
  }
}
