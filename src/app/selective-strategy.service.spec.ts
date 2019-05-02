import { TestBed } from '@angular/core/testing';

import { SelectiveStrategy } from './selective-strategy.service';
import { Route } from '@angular/router';
import { of } from 'rxjs';

describe('SelectiveStrategyService', () => {
  let service: SelectiveStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(SelectiveStrategy);
  });

  it('should be created', () => {    
    expect(service).toBeTruthy();
  });

  describe(`preload`, () => {
    it(`should return null in the observable if the route data does not contain a truthy preload value`, () => {
      // Arrange:
      let result;
      let route: Route = getTestRoute();
      route.data = { preload: false};

      // Act:      
      service.preload(route, () => {}).subscribe(resp => result = resp);

      // Assert:
      expect(result).toBe(null);
    });

    it(`should return the result of the given function if the route data contains a truthy preload value`, () => {
      // Arrange:
      const testValue = 'foo';
      let result;
      let route: Route = getTestRoute();
      route.data = { preload: true};

      // Act:      
      service.preload(route, () => { return of(testValue)}).subscribe(resp => result = resp);

      // Assert:
      expect(result).toBe(testValue);
    });

  });  
});

function getTestRoute(): Route {
  return {
    path: '',
    pathMatch: '',
    matcher: null,
    component: null,
    redirectTo: '',
    outlet: '',
    canActivate: [],
    canActivateChild: [],
    canDeactivate: [],
    canLoad: [],
    data: {},
    resolve: null,
    children: null,
    loadChildren: null,
    runGuardsAndResolvers: null
}

}
