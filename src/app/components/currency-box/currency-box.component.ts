import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-currency-box',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './currency-box.component.html',
  styleUrl: './currency-box.component.sass'
})
export class CurrencyBoxComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: FormGroup;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      inputVal: new FormControl(null),
      outputVal: new FormControl(null)
    })
  }

}
