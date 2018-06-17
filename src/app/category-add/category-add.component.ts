import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category : Category;
  categories : Category[];
  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.categories = new Array<Category>();
  }
  getCategories() : void{
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
  addCategory(wording:string):void{
    this.category = new Category();
    this.category.setWording = wording;
    // this.category.setWordingCategory("test");
    console.log('My category is called ' + this.category.wording);
    this.categoryService.addCategory(this.category)
      .subscribe(category => {
        this.categories.push(this.category);
      });
  }
}
