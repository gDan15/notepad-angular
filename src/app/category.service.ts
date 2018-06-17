import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getCategoriesUrl = "http://localhost:8000/category/api/get";
  private categoriesUrl = "http://localhost:8000/category/api";


  constructor(private http: HttpClient, private messageService: MessageService) { }

  // GET : get all categories
  getCategories(): Observable<Category[]> {
    this.messageService.add('CategoryService: fetched categories');
    return this.http.get<Category[]>(this.getCategoriesUrl);
    // .pipe
    // (
    //   catchError(this.handleError('getCategories', []))
    // );
  }
  // GET : get one category
  getCategory(id: number): Observable<Category> {
    // TODO: send the message _after_ fetching the category
    const getOneCategoryUrl = `${this.getCategoriesUrl}/${id}`;
    // this.messageService.add(`CategoryService: fetched category id=${id}`);
    return this.http.get<Category>(getOneCategoryUrl)
    .pipe
    (
      tap(_ => this.log(`fetched category id=${id}`))
      // catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }
  // PUT : update category informations
  updateCategory(category: Category): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const categoryUrlPut = `${this.categoriesUrl}/put/${category.id}`;
    return this.http.put(categoryUrlPut, category, httpOptions)
    .pipe
    (
      tap(_ => this.log(`updated category id=${category.id}`))
      // catchError(this.handleError<any>('updateCategory'))
    );
  }
  // DELETE : delete a category
  deleteCategory (category: Category): Observable<Category>{
    // const id = typeof category === 'number' ? category : category.id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    const categoryUrlDelete = `${this.categoriesUrl}/delete/${category.id}`;

    return this.http.delete<Category>(categoryUrlDelete, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${category.id}`))
      // catchError(this.handleError<Category>('deleteCategory'))
    );
  }
  // POST : add a category
  addCategory(category: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    const categoryUrlPut = `${this.categoriesUrl}/post`;
    return this.http.post<Category>(categoryUrlPut, category, httpOptions);
    // .pipe(
    //   tap((category: Category) => this.log(`added category w/ id=${category.id}`)),
    //   catchError(this.handleError<Category>('addCategory'))
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
    this.messageService.add('CategoryService: ' + message);
  }
}
