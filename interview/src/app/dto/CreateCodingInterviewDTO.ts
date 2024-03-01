export class CreateCodingInterviewDTO {
  public title: string
  public question: string
  public description: string
  public duration_minutes: number
  public point: number = 100
  public project_id: string
  public start_time: string // must be in format dd/MM/yyyy kk:mm:ss
  public end_time: string // must be in format dd/MM/yyyy kk:mm:ss
  public user_ids: string[]


  constructor() {
  }


}
