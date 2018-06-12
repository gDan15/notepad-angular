import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';



@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.component.html',
  styleUrls: ['./note-add.component.css']
})
export class NoteAddComponent implements OnInit {
  note : Note;
  notes : Note[];
  constructor(private noteService : NoteService) { }

  ngOnInit() {
    this.notes = new Array<Note>();
  }
  getNotes() : void{
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }
  addNote(title:string, content:string, date:string, category:string):void{
    this.note = new Note(title,content,date,category);
    // this.note.setWordingNote("test");
    console.log('My note is called ' + this.note.title);
    this.noteService.addNote(this.note)
      .subscribe(note => {
        this.notes.push(this.note);
      });
  }
}
