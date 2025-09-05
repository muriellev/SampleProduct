import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products: Product[] = [];
  newName = '';
  newPrice = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.list().subscribe((data) => (this.products = data));
  }

  add() {
    const product: Product = { id: 0, name: this.newName, price: this.newPrice };
    this.productService.create(product).subscribe(() => this.load());
  }

  delete(id: number) {
    this.productService.delete(id).subscribe(() => this.load());
  }
}
