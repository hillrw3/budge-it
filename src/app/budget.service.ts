import { Injectable } from '@angular/core';
import {LineItem} from './line-item'
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() {}

  fetchMonthlyBudget(): Observable<LineItem[]> {
    return of([
      LineItem.fromJson({id: 1, title: 'robs salary', amount: 5400, debit: false}),
      LineItem.fromJson({id: 2, title: 'heathers salary', amount: 5000, debit: false}),
      LineItem.fromJson({id: 3, title: 'rent', amount: 1550, debit: true}),
      LineItem.fromJson({id: 4, title: 'utilities', amount: 120, debit: true}),
      LineItem.fromJson({id: 5, title: 'savings', amount: 200, debit: false}),
    ])
  }
}
