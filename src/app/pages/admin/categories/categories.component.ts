import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories$: Observable<any>;

  constructor(private productSrv: ProductService) {
    this.categories$ = this.productSrv.getAllCategories();
  }
}
