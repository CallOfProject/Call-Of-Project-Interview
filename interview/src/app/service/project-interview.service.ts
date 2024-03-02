import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {CURRENT_USER} from "../../util/constants";
import {Root} from "../dto/UserProjectInterviewDTO";
import {getInterviewById} from "../../util/ConnectionUtil";
import {CodingInterviewDTO} from "../dto/CodingInterviewDTO";

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
}
