export interface TestInterviewDTO {
  title: string
  question_count: string
  description: string
  duration_minutes: number
  total_score: number
  project_id: string
  start_time: string
  end_time: string
  user_ids: string[]
  question_list: QuestionList[]
}

export interface QuestionList {
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  answer: string
  point: number
}
