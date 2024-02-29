import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";

@Injectable({
  providedIn: 'root'
})
export class SubmitInterviewService {

  constructor(private http: HttpClient) {
  }

  submitCode(code: string, lang: ProgrammingLanguageDTO) {

    const blob = new Blob([code], {type: 'text/plain'});
    const fileName = "e87f24a6-d26a-45ea-ad27-0ff23b520dff_" + "7d1a61e9-a859-4166-8a09-3cb6b27507b9" + lang.extension;
    const file = new File([blob], fileName);


    const formData = new FormData();
    formData.append('file', file);
    formData.append("interview_id", "e87f24a6-d26a-45ea-ad27-0ff23b520dff")
    formData.append("user_id", "7d1a61e9-a859-4166-8a09-3cb6b27507b9")

    return this.http.post<any>('http://localhost:7878/api/interview/coding/submit', formData);
  }
}
