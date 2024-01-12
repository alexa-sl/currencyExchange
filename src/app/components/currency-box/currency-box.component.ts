import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment.development";
import currencies from "../../../assets/currencies.json";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-currency-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './currency-box.component.html',
  styleUrl: './currency-box.component.sass'
})
export class CurrencyBoxComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form: FormGroup;
  currencies;
  ngOnInit() {
    this.currencies = [...Object.values(currencies)];
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      inputVal: new FormControl(1),
      outputVal: new FormControl(null),
      inputCur: new FormControl(this.currencies[92]), //RUB
      outputCur: new FormControl(this.currencies[0]), //USD
    })
  }

  count(input: number, rate: number, control: string, currency) {
    let result: number = input * rate;
    console.log(currency?.code);
    this.form.controls[control].setValue(result);
  }

}
