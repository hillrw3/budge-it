import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {BudgetService} from './budget.service'
import {LineItem} from './line-item/line-item'
import {Budget} from './budget'

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
    this.budgetService.fetchMonthlyBudget().subscribe(budget => {
      this.buildForm(budget)
    })
  }

  get revenueStreamTotal(): number { return this.totalLineItemAmounts(this.revenueStreams) }

  get expenseTotal(): number { return this.totalLineItemAmounts(this.expenses) }

  get netIncome() { return this.revenueStreamTotal - this.expenseTotal }

  addRevenueStream() { this.revenueStreams.push(this.lineItemToFormGroup(LineItem.fromJson())) }

  addExpense() { this.expenses.push(this.lineItemToFormGroup(LineItem.fromJson())) }

  private buildForm(budget: Budget) {
    this.revenueStreams = budget.revenueStreams.map(lineItem => this.lineItemToFormGroup(lineItem))
    this.expenses = budget.expenses.map(lineItem => this.lineItemToFormGroup(lineItem))
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
