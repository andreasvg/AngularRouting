# APM

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Overview

This project is from Deborah Kurata's Pluralsight course on Angular routing.

## Child Routes

The Products feature module implements child routes to view and edit products. The view to list products is also a child route, and the parent route for products is component-less.

## Resolver

We use the ProductResolver to fetch product data before showing the product detail or edit product views.

## Route Guards

Two route guards have been built in the AuthGuardService:

- canActivate (determines whether the Product routes may be activated)
- canLoad (determines whether the Product module may be loaded)

## Secondary Routes

A secondary route are implemented to diplay popup messages. See the routes defined in the Message module.

## Lazy Loading

The SelectiveStrategy service implements a custom preloading loading strategy for preloading the Products feature module.
