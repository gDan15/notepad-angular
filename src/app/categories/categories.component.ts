import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Category[];
  selectedCategory:Category;
  category : Category;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
      this.getCategories();
  }

  getCategories() : void{
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
  onSelect(category: Category): void {
    this.selectedCategory = category;
  }
  delete(category: Category): void {
    // this.categories = this.heroes.filter(h => h !== hero);
    this.categoryService.deleteCategory(category).subscribe();
  }
}
