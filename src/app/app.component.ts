import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {BudgetService} from './budget.service'
import {LineItem} from './line-item'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public credits: FormGroup[] = []
  public debits: FormGroup[] = []

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.budgetService.fetchMonthlyBudget().subscribe(lineItems => {
      this.buildForm(lineItems)
    })
  }

  private buildForm(lineItems: LineItem[]) {
    this.credits = lineItems
      .filter(lineItem => !lineItem.debit)
      .map(lineItem => this.lineItemToFormGroup(lineItem))
    this.debits = lineItems
      .filter(lineItem => lineItem.debit)
      .map(lineItem => this.lineItemToFormGroup(lineItem))
  }

  private lineItemToFormGroup(lineItem: LineItem): FormGroup {
    return this.fb.group({
      id: lineItem.id,
      title: lineItem.title,
      amount: lineItem.amount,
      debit: lineItem.debit
    })
  }
}
