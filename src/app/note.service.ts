import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private getNotesUrl = "http://localhost:8000/note/api/get";


  constructor(private http: HttpClient, private messageService: MessageService) { }

  // GET all notes
  getNotes(): Observable<Note[]> {
    this.messageService.add('NoteService: fetched notes');
    return this.http.get<Note[]>(this.getNotesUrl);
  }
  // GET one note
  getNote(id: number): Observable<Note> {
    // TODO: send the message _after_ fetching the hero
    const getOneNoteUrl = `${this.getNotesUrl}/${id}`;
    this.messageService.add(`NoteService: fetched note id=${id}`);
    return this.http.get<Note>(getOneNoteUrl);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
