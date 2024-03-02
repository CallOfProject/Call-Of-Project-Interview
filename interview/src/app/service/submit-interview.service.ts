import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {catchError, map, Observable, throwError} from "rxjs";
import {CREATE_CODING_INTERVIEW_REQUEST, getIsSolvedBeforeRequest} from "../../util/ConnectionUtil";
import {CURRENT_USER} from "../../util/constants";

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
          console.log(response)
          return response;
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  submitCode(code: string, lang: ProgrammingLanguageDTO) {

    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    const interview_id = localStorage.getItem("interview_id");

    const blob = new Blob([code], {type: 'text/plain'});

    const fileName = `${user.user_id}_${interview_id}${lang.extension}`
    const file = new File([blob], fileName);

    const formData = new FormData();
    formData.append('file', file);
    formData.append("interview_id", interview_id)
    formData.append("user_id", user.user_id)

    return this.http.post<any>('http://localhost:3131/api/interview/coding/submit', formData).pipe(map((response: any) => {
        console.log(response)
        return response;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      }))
  }

  checkUserSolvedBefore(interview_id: string): Observable<IsSolvedBeforeStatus> {

    const user = JSON.parse(localStorage.getItem(CURRENT_USER))

    return this.http.get<any>(getIsSolvedBeforeRequest(interview_id, user.user_id))
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
}
