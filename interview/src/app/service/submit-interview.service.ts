import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingLanguageDTO} from "../dto/ProgrammingLanguageDTO";
import {CreateCodingInterviewDTO} from "../dto/CreateCodingInterviewDTO";
import {catchError, map, throwError} from "rxjs";
import {getUser} from "./login.service";
import {CREATE_CODING_INTERVIEW_REQUEST} from "../../util/ConnectionUtil";

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

    const blob = new Blob([code], {type: 'text/plain'});
    const fileName = "e87f24a6-d26a-45ea-ad27-0ff23b520dff_" + "7d1a61e9-a859-4166-8a09-3cb6b27507b9" + lang.extension;
    const file = new File([blob], fileName);


    const formData = new FormData();
    formData.append('file', file);
    formData.append("interview_id", "b2f0f89a-e8a5-4ec2-a459-336216f81846")
    formData.append("user_id", "7d1a61e9-a859-4166-8a09-3cb6b27507b9")

    return this.http.post<any>('http://localhost:7878/api/interview/coding/submit', formData);
  }
}


/*

package main
import "fmt"
func isPrime(num int) bool {
    if num <= 1 {
        return false
    }
    for i := 2; i*i <= num; i++ {
        if num%i == 0 {
            return false
        }
    }
    return true
}

func findFirstNPrimes(N int) []int {
    var primes []int
    count := 0
    num := 2
    for count < N {
        if isPrime(num) {
            primes = append(primes, num)
            count++
        }
        num++
    }
    return primes
}

func main() {
    N := 10 // Change N to the desired number of primes
    primes := findFirstNPrimes(N)
    fmt.Printf("First %d prime numbers are: %v\n", N, primes)
}
 */
