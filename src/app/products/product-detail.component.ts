import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;
  routeParams$: Observable<ParamMap>;

  constructor(private route: ActivatedRoute) { }

   ngOnInit(): void {
      /*
        // subscribe to the product id from the route and fetch the product data via
        // the ProductService:
        this.route.paramMap.subscribe(
        params => {
          const id: number = +params.get('id');
          this.getProduct(id);
        }
        );
      */

      /*
        // get the product id directly from the route snapshot, retrieve the
        // product via the ProductService:
        const id = +this.route.snapshot.paramMap.get('id');
        this.getProduct(id);
      */

      // reading the resolved data directly from the snapshot:
      const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
      this.errorMessage = resolvedData.error;
      if (resolvedData.product) {
        this.onProductRetrieved(resolvedData.product);
      }

      // subscribing to an observable to get the resolved data:
/*       this.route.data.subscribe(
        data => {
          let resolvedProduct: ProductResolved;
          resolvedProduct = data['resolvedData'];

          this.errorMessage = resolvedProduct.error;
          if (resolvedProduct.product) {
            this.onProductRetrieved(resolvedProduct.product);
          }
        }
      ); */
    }

/*   getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.onProductRetrieved(product),
      error => this.errorMessage = <any>error);
  } */

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
