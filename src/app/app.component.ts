import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {BudgetService} from './budget.service'
import {LineItem} from './line-item/line-item'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public revenueStreams: FormGroup[] = []
  public expenses: FormGroup[] = []

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.budgetService.fetchMonthlyBudget().subscribe(lineItems => {
      this.buildForm(lineItems)
    })
  }

  get revenueStreamTotal(): number {
    return this.totalLineItemAmounts(this.revenueStreams)
  }

  get expenseTotal(): number {
    return this.totalLineItemAmounts(this.expenses)
  }

  get netIncome() { return this.revenueStreamTotal - this.expenseTotal }

  private buildForm(lineItems: LineItem[]) {
    this.revenueStreams = lineItems
      .filter(lineItem => !lineItem.expense)
      .map(lineItem => this.lineItemToFormGroup(lineItem))
    this.expenses = lineItems
      .filter(lineItem => lineItem.expense)
      .map(lineItem => this.lineItemToFormGroup(lineItem))
  }

  private lineItemToFormGroup(lineItem: LineItem): FormGroup {
    return this.fb.group({
      id: lineItem.id,
      title: lineItem.title,
      amount: lineItem.amount,
      expense: lineItem.expense
    })
  }

  private totalLineItemAmounts(lineItems: FormGroup[]) {
    return lineItems.reduce((prev, item) => { return prev += item.get('amount').value}, 0)
  }
}
