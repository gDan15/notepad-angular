import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private getCategoriesUrl = "http://localhost:8000/category/api/get";
  private categoriesUrl = "http://localhost:8000/category/api";


  constructor(private http: HttpClient, private messageService: MessageService) { }

  // GET : get all categories
  getCategories(): Observable<Note[]> {
    this.messageService.add('NoteService: fetched categories');
    return this.http.get<Note[]>(this.getCategoriesUrl);
    // .pipe
    // (
    //   catchError(this.handleError('getCategories', []))
    // );
  }
  // GET : get one category
  getNote(id: number): Observable<Note> {
    // TODO: send the message _after_ fetching the category
    const getOneNoteUrl = `${this.getCategoriesUrl}/${id}`;
    // this.messageService.add(`NoteService: fetched category id=${id}`);
    return this.http.get<Note>(getOneNoteUrl)
    .pipe
    (
      tap(_ => this.log(`fetched category id=${id}`))
      // catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }
  // PUT : update category informations
  updateNote(category: Note): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const categoryUrlPut = `${this.categoriesUrl}/put/${category.id}`;
    return this.http.put(categoryUrlPut, category, httpOptions)
    .pipe
    (
      tap(_ => this.log(`updated category id=${category.id}`))
      // catchError(this.handleError<any>('updateNote'))
    );
  }
  // DELETE : delete a category
  deleteNote (category: Note): Observable<Note>{
    // const id = typeof category === 'number' ? category : category.id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    const categoryUrlDelete = `${this.categoriesUrl}/delete/${category.id}`;

    return this.http.delete<Note>(categoryUrlDelete, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${category.id}`))
      // catchError(this.handleError<Note>('deleteNote'))
    );
  }
  // POST : add a category
  addNote(category: Note): Observable<Note> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    const categoryUrlPut = `${this.categoriesUrl}/post`;
    return this.http.post<Note>(categoryUrlPut, category, httpOptions);
    // .pipe(
    //   tap((category: Note) => this.log(`added category w/ id=${category.id}`)),
    //   catchError(this.handleError<Note>('addNote'))
    // );
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     // this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  private log(message: string) {
    this.messageService.add('NoteService: ' + message);
  }
}
