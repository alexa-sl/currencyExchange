import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import currencies from "../../../assets/currencies.json";
import {NgForOf} from "@angular/common";
import {RatesService} from "../../services/rates.service";
import {BehaviorSubject} from "rxjs";
import {IRate} from "../../shared/interfaces/IRate";
import {IRateList} from "../../shared/interfaces/IRateList";

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
  constructor(private fb: FormBuilder, private rateService: RatesService) {}

  form: FormGroup;
  currencies;
  rates$: BehaviorSubject<IRate> = new BehaviorSubject<IRate>(<IRate>{});
  rates: IRateList = {
    inputVal: {},
    outputVal: {}
  };
  symbols = {
    inputVal: '',
    outputVal: ''
  }
  ngOnInit() {
    this.currencies = [...Object.values(currencies)];
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      inputVal: new FormControl(100),
      outputVal: new FormControl(null),
      inputCur: new FormControl(this.currencies[92]), //RUB
      outputCur: new FormControl(this.currencies[0]), //USD
    });
    this.getRatesForCurrency({'code': 'RUB', 'symbol_native': 'P'}, 'inputVal');
    this.getRatesForCurrency({'code': 'USD', 'symbol_native': '$'}, 'outputVal');
    this.count(this.form.controls['inputVal'].value, 'outputVal', {'code': 'USD'});
  }

  getRatesForCurrency(inputCurrency, position) {
    this.getRate(inputCurrency.code, position);
  }

  count(input: number, control: string, outputCurrency) {

    this.rates$.subscribe(res => {
      if (this.rates[control]) {
        let currencyToCheck = control === 'outputVal' ? 'inputVal' : 'outputVal';
        let result: number = input * this.rates[currencyToCheck].conversion_rates?.[outputCurrency.code];
        this.setResult(control, result);
      }
    });
  }

  setResult (control, result) {
    this.form.controls[control].setValue(result);
  }

  getRate (curCode, position) {
    this.rateService.getRateForCur(curCode).subscribe({
        next: v => {
          this.rates[position] = v;
          this.rates$.next(this.rates[position]);
          this.symbols[position] = this.currencies.find(x => x.code === curCode).symbol_native;
        },
        error: e => console.log(e)
    });
  }

}
