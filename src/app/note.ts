export class Note {
  id:number;
  title:string;
  content:string;
  date:string;
  category:string;
  constructor(title:string,content:string,date:string,category:string){
    // NOTE : is this necessary ?
    this.title=title;
    this.content=content;
    this.date=date;
    this.category=category;
  }
  set setTitle(newTitle:string){
    this.title=newTitle;
  }
}
