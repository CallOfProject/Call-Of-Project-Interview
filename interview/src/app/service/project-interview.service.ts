import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequestDTO} from "../dto/LoginRequestDTO";
import {catchError, map, Observable, throwError} from "rxjs";
import {LOGIN_REQUEST} from "../../util/ConnectionUtil";
import {CURRENT_USER} from "../../util/constants";
import {Root} from "../dto/UserProjectInterviewDTO";

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

          // Gelen yanıttaki veriyi uygun arayüzlere dönüştürme
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
          console.log("ASD: ",mappedResponse);
          return mappedResponse;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError('Something went wrong; please try again later.');
        })
      );
  }
}
