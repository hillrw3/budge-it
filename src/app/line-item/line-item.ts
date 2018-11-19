export class LineItem {
  constructor(
    public id: number,
    public title: string,
    public amount: number,
    public debit: boolean
  ) {}

  static fromJson(json: Partial<LineItem> = {}): LineItem {
    return new LineItem(json['id'], json['title'], json['amount'], json['debit'])
  }
}
