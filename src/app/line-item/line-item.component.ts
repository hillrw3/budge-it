import {Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit {
  @Input() form: FormGroup
  @Input() disabled: boolean = false

  ngOnInit(): void {
    if (this.disabled) {
      this.form = new FormBuilder().group({
        title: {value: 'New Item', disabled: true},
        amount: {value: '0', disabled: true}
      })
    }
  }
}
