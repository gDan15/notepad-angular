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
  private notesUrl = "http://localhost:8000/note/api";


  constructor(private http: HttpClient, private messageService: MessageService) { }

  // GET : get all notes
  getNotes(): Observable<Note[]> {
    this.messageService.add('NoteService: fetched notes');
    return this.http.get<Note[]>(this.getNotesUrl)
    .pipe
    (
      catchError(this.handleError('getNotes', []))
    );
  }
  // GET : get one note
  getNote(id: number): Observable<Note> {
    // TODO: send the message _after_ fetching the hero
    const getOneNoteUrl = `${this.getNotesUrl}/${id}`;
    // this.messageService.add(`NoteService: fetched note id=${id}`);
    return this.http.get<Note>(getOneNoteUrl)
    .pipe
    (
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }
  // PUT : update note informations
  // TODO : error 405 while trying to update, doesn't work at all.
  updateNote(note: Note): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const noteUrlPut = `${this.notesUrl}/put/${note.id}`;
    return this.http.put(noteUrlPut, note, httpOptions).pipe
    (
      tap(_ => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }
  // POST : add a note
  addNote(note: Note): Observable<Note> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    const noteUrlPut = `${this.notesUrl}/post`;
    return this.http.post<Note>(noteUrlPut, note, httpOptions).pipe(
      tap((note: Note) => this.log(`added note w/ id=${note.id}`)),
      catchError(this.handleError<Note>('addNote'))
    );
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
  private log(message: string) {
    this.messageService.add('NoteService: ' + message);
  }
}
