import { Category } from './category';

export class Note {
  id:number;
  title:string;
  content:string;
  date:string;
  category:Category;
  constructor(title:string,content:string,date:string, wordingCategory:string){
    // NOTE : is this necessary ?
    this.title=title;
    this.content=content;
    this.date=date;
    this.category=new Category;
    this.category.setWording=wordingCategory;
  }
  set setTitle(newTitle:string){
    this.title=newTitle;
  }
}
