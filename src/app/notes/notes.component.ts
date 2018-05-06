import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../note';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes:Note[];
  constructor(private noteService : NoteService) { }

  ngOnInit() {
  }

  getNote() : void{
    this.noteService.getNote().subscribe(notes => this.notes = notes);;
  }

}
