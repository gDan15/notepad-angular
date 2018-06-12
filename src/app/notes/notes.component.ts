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
  selectedNote:Note;
  note : Note;

  constructor(private noteService : NoteService) { }

  ngOnInit() {
      this.getNotes();
  }

  getNotes() : void{
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }
  onSelect(note: Note): void {
    this.selectedNote = note;
  }
  delete(note: Note): void {
    // this.notes = this.heroes.filter(h => h !== hero);
    this.noteService.deleteNote(note).subscribe();
  }
}
