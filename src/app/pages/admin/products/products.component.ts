import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { CategoriesComponent } from '../categories/categories.component';

interface IProductObj {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoriesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: IProductObj = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  };
  category: string = '';
  categoryList: string[] = [];
  productsList: IProductObj[] = [];

  constructor(private productSrv: ProductService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getProducts() {
    try {
      this.productSrv.getAllProducts().subscribe((res: any) => {
        this.productsList = res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  getProductsByCategory() {
    try {
      this.productSrv
        .getProductsByCategory(this.category)
        .subscribe((res: any) => {
          this.productsList = res;
        });
    } catch (error) {
      console.log(error);
    }
  }

  getCategory() {
    try {
      this.productSrv.getAllCategories().subscribe((res: any) => {
        this.categoryList = res;
      });
    } catch (error) {
      console.log(error);
    }
  }
  chooseCategory(category: string) {
    if (category === 'All') {
      this.category === '';
      this.getProducts();
    } else {
      this.category = category;
      this.getProductsByCategory();
    }
  }
  clickCreateProduct() {
    try {
      this.productSrv.createProduct(this.productObj).subscribe((res: any) => {
        alert('Product created!');
        console.log(res);

        this.productObj = {
          id: 0,
          title: '',
          price: 0,
          description: '',
          category: '',
          image: '',
          rating: { rate: 0, count: 0 },
        };
      });
    } catch (error) {
      alert(
        'Something went wrong with creating product. Please, try again latter!'
      );
      console.log(error);
    }
  }

  onEdit(product: IProductObj) {
    this.productObj = product;
    this.openSidePanel();
  }
  onDelete(product: IProductObj) {
    const answer = confirm('Are you sure in your desicion?');
    if (answer) {
      try {
        this.productSrv.deleteProduct(product.id).subscribe((res: any) => {
          alert(
            'Product by name ' + product.title + ' was succefully deleted!'
          );
          console.log(res);
          this.getProducts();
        });
      } catch (error) {
        alert(
          'Something went wrong with deleting product. Please, try again latter!'
        );
        console.log(error);
      }
    }
  }
  clickUpdateProduct() {
    try {
      this.productSrv
        .editProduct(this.productObj, this.productObj.id)
        .subscribe((res: any) => {
          alert('Product edited!');
          console.log(res);
        });

      this.productObj = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      };
    } catch (error) {
      alert(
        'Something went wrong with editing product. Please, try again latter!'
      );
      console.log(error);
    }
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }
  closeSidePanel() {
    this.isSidePanelVisible = false;
    this.productObj = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: { rate: 0, count: 0 },
    };
  }
}
