import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {CURRENT_USER} from "../../util/constants";
import {Root} from "../dto/UserProjectInterviewDTO";
import {
  acceptOrRejectCodingInterviewRequest,
  acceptOrRejectTestInterviewRequest,
  findAllOwnerInterviewsByUserId,
  findCodingInterviewOwner,
  findTestInterviewOwner,
  getInterviewById
} from "../../util/ConnectionUtil";
import {CodingInterviewDTO} from "../dto/CodingInterviewDTO";
import {
  CodingAndTestInterviewDTO,
  MyCodingInterviewDTO,
  ProjectDTO,
  QuestionDTO,
  TestInterviewDTO
} from "../my-interviews/my-interviews.component";
import {User, UserCodingAnswers} from "../coding-interview-answer/coding-interview-answer.component";
import {
  MyQuestionDTO,
  MyTestInterviewDTO,
  UserQuestionAnswersDTO,
  UserTestAnswers
} from "../test-interview-answer/test-interview-answer.component";

@Injectable({
  providedIn: 'root'
})
export class ProjectInterviewService {

  constructor(private http: HttpClient) {
  }

  findUserProjectsInfo(): Observable<Root> {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));

    return this.http.get<any>("http://localhost:3131/api/interview/coding/find/info?user_id=" + user.user_id)
      .pipe(
        map((response: any) => {
          console.log(response);
          /*  if (!response.success) {
              throw new Error('Failed to fetch user projects info.');
            }*/

          const mappedResponse: Root = {
            item_count: response.item_count,
            message: response.message,
            object: {
              ownerProjects: response.object.ownerProjects.map((ownerProject: any) => ({
                projectId: ownerProject.projectId,
                projectName: ownerProject.projectName,
                projectStatus: ownerProject.projectStatus,
                participants: {
                  participants: ownerProject.participants.participants.map((participant: any) => ({
                    user: {
                      user_id: participant.user.user_id,
                      first_name: participant.user.first_name,
                      middle_name: participant.user.middle_name,
                      last_name: participant.user.last_name,
                      username: participant.user.username
                    }
                  }))
                }
              }))
            }
          };
          console.log("ASD: ", mappedResponse);
          return mappedResponse;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }

  findInterview(interviewId: string) {
    return this.http.get<any>(getInterviewById(interviewId))
      .pipe(
        map((response: any) => {
          console.log(response);
          if (response.status_code !== 2000) {
            return null;
          }
          const dto = new CodingInterviewDTO()
          dto.interview_id = response.object.interview_id
          dto.project_id = response.object.projectDTO.project_id
          dto.question = response.object.question
          dto.title = response.object.title
          dto.point = response.object.point
          dto.duration_minutes = response.object.duration_minutes
          dto.description = response.object.description

          return dto;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }

  dateStringToDate(dateString: string): Date | null {
    const parts = dateString.split(/[\s/:]/);
    if (parts.length !== 6) return null;

    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0 indexed in JavaScript
    const day = parseInt(parts[0], 10);
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);
    const second = parseInt(parts[5], 10);

    return new Date(year, month, day, hour, minute, second);
  }

  findAllInterviewsByUserId(userId: string) {
    return this.http.get<any>(findAllOwnerInterviewsByUserId(userId))
      .pipe(
        map((response: any) => {
          const codingInterviews = response.object.codingInterviews.map((ci: any) => {
            const codingDTO = new MyCodingInterviewDTO()
            codingDTO.description = ci.description
            codingDTO.duration_minutes = ci.duration_minutes
            codingDTO.end_time = ci.end_time
            codingDTO.interview_id = ci.interview_id
            codingDTO.project_dto = new ProjectDTO()
            codingDTO.project_dto.projectId = ci.projectDTO.projectId
            codingDTO.project_dto.projectName = ci.projectDTO.projectName
            codingDTO.project_dto.projectStatus = ci.projectDTO.projectStatus
            codingDTO.question = ci.question
            codingDTO.start_time = ci.start_time
            codingDTO.title = ci.title
            codingDTO.point = ci.point
            codingDTO.interview_status = ci.interview_status
            codingDTO.startDateObj = this.dateStringToDate(ci.start_time)
            codingDTO.endDateObj = this.dateStringToDate(ci.end_time)
            return codingDTO
          })

          const testInterviews = response.object.testInterviews.map((ti: any) => {
            const testDTO = new TestInterviewDTO()
            testDTO.interview_id = ti.interview_id
            testDTO.title = ti.title
            testDTO.start_time = ti.start_time
            testDTO.question_count = ti.question_count
            testDTO.projectDTO = new ProjectDTO()
            testDTO.projectDTO.projectId = ti.project_dto.projectId
            testDTO.projectDTO.projectName = ti.project_dto.projectName
            testDTO.projectDTO.projectStatus = ti.project_dto.projectStatus
            testDTO.total_score = ti.total_score
            testDTO.end_time = ti.end_time
            testDTO.duration_minutes = ti.duration_minutes
            testDTO.description = ti.description
            testDTO.questions = ti.questions.map((q: any) => {
              const questionDTO = new QuestionDTO()
              questionDTO.question = q.question
              questionDTO.option1 = q.option1
              questionDTO.option2 = q.option2
              questionDTO.option3 = q.option3
              questionDTO.option4 = q.option4
              questionDTO.point = q.point
              questionDTO.id = q.id
              return questionDTO
            })
            testDTO.startDateObj = this.dateStringToDate(ti.start_time)
            testDTO.endDateObj = this.dateStringToDate(ti.end_time)
            testDTO.status = testDTO.startDateObj < new Date() && testDTO.endDateObj > new Date()
            return testDTO
          })
          const dto = new CodingAndTestInterviewDTO()
          dto.codingInterviewDTO = codingInterviews
          dto.testInterviewDTO = testInterviews
          return dto
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }

  findTestInterviewOwner(interviewId: string) {
    return this.http.get<any>(findTestInterviewOwner(interviewId))
      .pipe(map((response: any) => {

          return response.object.map((obj: any) => {
            const dto = new UserTestAnswers()
            dto.id = obj.id
            dto.interview_result = obj.interview_result
            dto.interview_status = obj.interview_status
            dto.project = new ProjectDTO()
            dto.project.projectId = obj.project.projectId
            dto.project.projectName = obj.project.projectName
            dto.project.projectStatus = obj.project.projectStatus
            dto.score = obj.score
            dto.test_interview = new MyTestInterviewDTO()
            dto.test_interview.description = obj.test_interview.description
            dto.test_interview.duration_minutes = obj.test_interview.duration_minutes
            dto.test_interview.end_time = obj.test_interview.end_time
            dto.test_interview.interview_status = obj.test_interview.interview_status
            dto.test_interview.interview_id = obj.test_interview.interview_id
            dto.test_interview.project_dto = null
            dto.test_interview.question_count = obj.test_interview.question_count
            dto.test_interview.questions = obj.test_interview.questions.map((q: any) => {
              const qDTO = new MyQuestionDTO()
              qDTO.point = q.point
              qDTO.id = q.id
              qDTO.question = q.question
              qDTO.option1 = q.option1
              qDTO.option2 = q.option2
              qDTO.option3 = q.option3
              qDTO.option4 = q.option4
              return qDTO
            })
            dto.test_interview.start_time = obj.test_interview.start_time
            dto.test_interview.title = obj.test_interview.title
            dto.test_interview.total_score = obj.test_interview.total_score
            dto.user = new User()
            dto.user.user_id = obj.user.user_id
            dto.user.first_name = obj.user.first_name
            dto.user.middle_name = obj.user.middle_name
            dto.user.last_name = obj.user.last_name
            dto.user.full_name = obj.user.first_name + " " + obj.user.middle_name + " " + obj.user.last_name
            dto.user.username = obj.user.username
            dto.user_answers = obj.user_answers.map((ua: any) => {
              const uqDTO = new UserQuestionAnswersDTO()
              uqDTO.option1 = ua.option1
              uqDTO.option2 = ua.option2
              uqDTO.option3 = ua.option3
              uqDTO.option4 = ua.option4
              uqDTO.correct_answer = ua.correct_answer
              uqDTO.answer = ua.answer
              uqDTO.interview_id = ua.interview_id
              uqDTO.question = ua.question
              uqDTO.question_id = ua.question_id
              uqDTO.user_id = ua.user_id
              return uqDTO
            })

            console.log("USER_ANSWERS: ", dto.user_answers)
            return dto
          })

        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }

  findCodingInterviewOwner(interviewId: string) {
    return this.http.get<any>(findCodingInterviewOwner(interviewId))
      .pipe(map((response: any) => {
          return response.object.map((obj: any) => {
            const dto = new UserCodingAnswers()
            dto.answer_file_link = obj.answer_file_link
            dto.id = obj.id
            dto.interview_result = obj.interview_result
            dto.interview_status = obj.interview_status
            dto.coding_interview = new MyCodingInterviewDTO()
            dto.coding_interview.interview_status = obj.coding_interview.interview_status
            dto.coding_interview.description = obj.coding_interview.description
            dto.coding_interview.duration_minutes = obj.coding_interview.duration_minutes
            dto.coding_interview.end_time = obj.coding_interview.end_time
            dto.coding_interview.interview_id = obj.coding_interview.interview_id
            dto.coding_interview.point = obj.coding_interview.point
            dto.coding_interview.question = obj.coding_interview.question
            dto.coding_interview.start_time = obj.coding_interview.start_time
            dto.coding_interview.title = obj.coding_interview.title
            dto.project = new ProjectDTO()
            dto.project.projectId = obj.project.projectId
            dto.project.projectName = obj.project.projectName
            dto.project.projectStatus = obj.project.projectStatus
            dto.user = new User()
            dto.user.user_id = obj.user.user_id
            dto.user.first_name = obj.user.first_name
            dto.user.middle_name = obj.user.middle_name
            dto.user.last_name = obj.user.last_name
            dto.user.full_name = obj.user.first_name + " " + obj.user.middle_name + " " + obj.user.last_name
            dto.user.username = obj.user.username
            return dto
          })

        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }



  removeCodingInterview(interview_id: string) {
    return this.http.delete<any>("http://localhost:3131/api/interview/coding/delete?interview_id=" + interview_id)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );

  }

  removeTestInterview(interview_id: string) {

    return this.http.delete<any>("http://localhost:3131/api/interview/test/delete?interview_id=" + interview_id)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }

  acceptCodingInterview(id: string, status: boolean) {
    return this.http.post<any>(acceptOrRejectCodingInterviewRequest(id, status), null)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }
  acceptTestInterview(id: string, status: boolean) {
    return this.http.post<any>(acceptOrRejectTestInterviewRequest(id, status), null)
      .pipe(
        map((response: any) => {
          console.log(response);
          return response;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }
}
