import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export class Book {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  REST_API = 'http://localhost:8000/api';

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`;
    console.log({ API_URL });
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // get all objects
  GetBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // get single object
  GetBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // update
  UpdateBook(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    console.log('udpatebook', { data });
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // delete
  DeleteBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log({ error });
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.error.code} \n message ${error.error.message}`;
    }
    console.log({ errorMessage });
    return throwError(errorMessage);
  }
}
