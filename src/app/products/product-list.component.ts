import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import { MessageService } from '../messages/message.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    const show = this.route.snapshot.queryParamMap.get('showImage');
    this.showImage = show === 'true' ? true : false;

    this.productService.getProducts().subscribe(
      products => {
        this.messageService.addMessage('Products retrieved from server');

        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
