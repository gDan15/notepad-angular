import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NotesComponent } from './notes/notes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NoteDetailComponent }  from './note-detail/note-detail.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryAddComponent } from './category-add/category-add.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addNote', component: NoteAddComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'category/detail/:id', component: CategoryDetailComponent },
  { path: 'addCategory', component: CategoryAddComponent },
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
