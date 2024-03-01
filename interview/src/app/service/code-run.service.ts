import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  HACKER_EARTH_CALLBACK_URL,
  HACKER_EARTH_EVALUATE_URL,
  HACKER_EARTH_ID,
  HACKER_EARTH_SECRET_KEY
} from "../../util/constants";

@Injectable({
  providedIn: 'root'
})
export class CodeRunService {

  constructor(private http: HttpClient) {
  }

  runCode(source: string, language: string, inputs: string): Observable<any> {
    const data = {
      'source': source,
      'lang': language,
      'time_limit': 50,
      'memory_limit': 246323,
      'input': inputs,
      'callback': HACKER_EARTH_CALLBACK_URL,
      'id': HACKER_EARTH_ID
    };

    const headers = new HttpHeaders().set('client-secret', HACKER_EARTH_SECRET_KEY)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(HACKER_EARTH_EVALUATE_URL, data, {headers});
  }


  getCodeResult(url: string): Observable<any> {
    const headers = new HttpHeaders().set('client-secret', HACKER_EARTH_SECRET_KEY)
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.get(url, {headers});
  }

  getOutput(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'text'})
  }

}
