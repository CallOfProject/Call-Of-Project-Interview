import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {catchError, map, Observable, throwError} from "rxjs";
import {
  CREATE_CODING_INTERVIEW_REQUEST,
  getIsSolvedBeforeRequest,
  getIsSolvedTestBeforeRequest,
  getQuestionByIdx,
  getTestInterviewInfo,
  getTestInterviewSubmitRequest,
  SUBMIT_TEST_QUESTION_REQUEST
} from "../../util/ConnectionUtil";
import {CURRENT_USER} from "../../util/constants";
import {CreateTestInterviewDTO, QuestionAnswerDTO} from "../dto/TestInterviewDTOs";

export interface IsSolvedBeforeStatus {
  message: string,
  status_code: number,
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SubmitInterviewService {

  constructor(private http: HttpClient) {
  }

  createCodingInterview(createCodingInterviewDTO: CreateCodingInterviewDTO) {
    return this.http.post(CREATE_CODING_INTERVIEW_REQUEST, createCodingInterviewDTO, {
      /* headers: {
         'Authorization': 'Bearer ' + getUser().access_token
       }*/
    })
      .pipe(map((response: any) => {
          console.log("ASDSAD: ", response)
          return response;
        }),
        catchError((error: any) => {
          console.log("ERR: ", error);
          return throwError(error);
        })
      );
  }

  submitCode(code: string, lang: ProgrammingLanguageDTO, userId: string, interviewId: string) {
    const blob = new Blob([code], {type: 'text/plain'});

    const fileName = `${userId}_${interviewId}${lang.extension}`
    const file = new File([blob], fileName);

    const formData = new FormData();
    formData.append('file', file);
    formData.append("interview_id", interviewId)
    formData.append("user_id", userId)

    return this.http.post<any>('http://localhost:3131/api/interview/coding/submit', formData).pipe(map((response: any) => {
        console.log(response)
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  checkUserSolvedBefore(interview_id: string, user_id: string): Observable<IsSolvedBeforeStatus> {
    return this.http.get<any>(getIsSolvedBeforeRequest(interview_id, user_id))
      .pipe(map((response: any) => {
          let obj: IsSolvedBeforeStatus = {
            message: response.message,
            status_code: response.status_code,
            status: response.object

          }
          return obj;
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  createTestInterview(dto: CreateTestInterviewDTO) {
    return this.http.post<any>('http://localhost:3131/api/interview/test/create', dto).pipe(map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  getIsSolvedBefore(interviewId: string, user_id: string) {
    return this.http.get<any>(getIsSolvedTestBeforeRequest(interviewId, user_id)).pipe(map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  getTestInterviewInformation(interviewId: string) {
    return this.http.get<any>(getTestInterviewInfo(interviewId)).pipe(map((response: any) => {
        console.log("RES: ", response)
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }


  getTestQuestion(interviewId: string, idx: number) {
    return this.http.get<any>(getQuestionByIdx(interviewId, idx)).pipe(map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  submitTestQuestion(dto: QuestionAnswerDTO) {

    return this.http.post<any>(SUBMIT_TEST_QUESTION_REQUEST, dto).pipe(map((response: any) => {
        console.log("SUBMIT Q RES: ", response)
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))

  }

  submitTestInterview(interviewId: string, user_id: string) {
    return this.http.post<any>(getTestInterviewSubmitRequest(interviewId, user_id), {}).pipe(map((response: any) => {
        console.log("SUBMIT RES: ", response)
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))

  }
}
