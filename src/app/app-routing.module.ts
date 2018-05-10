import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NotesComponent } from './notes/notes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { NoteDetailComponent }  from './note-detail/note-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: NoteDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: NotesComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
