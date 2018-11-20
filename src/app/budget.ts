import {LineItem} from './line-item/line-item'

export class Budget {
  constructor(public revenueStreams: LineItem[], public expenses: LineItem[]) {}

  static fromJson(json: Partial<Budget>): Budget {
    const revenueStreams = (json['revenueStreams'] || []).map(item => LineItem.fromJson(item))
    const expenses = (json['expenses'] || []).map(item => LineItem.fromJson(item))
    return new Budget(revenueStreams, expenses)
  }
}
