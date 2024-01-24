import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(
      BaseUrl.API_END_Point + BaseUrl.METHODS.GET_ALL_PRODUCTS
    );
  }

  getAllCategories() {
    return this.http.get(
      BaseUrl.API_END_Point + BaseUrl.METHODS.GET_ALL_CATEGORIES
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get(
      BaseUrl.API_END_Point +
        BaseUrl.METHODS.GET_PRODUCTS_BY_CATEGORY +
        category
    );
  }

  createProduct(product: any) {
    return this.http.post(
      BaseUrl.API_END_Point + BaseUrl.METHODS.CREATE_PRODUCT,
      product
    );
  }

  editProduct(product: any, id: number) {
    return this.http.patch(
      BaseUrl.API_END_Point + BaseUrl.METHODS.EDIT_PRODUCT + id,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      BaseUrl.API_END_Point + BaseUrl.METHODS.DELETE_PRODUCT + id
    );
  }
}
