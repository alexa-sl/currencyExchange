import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {IRate} from "../shared/interfaces/IRate";

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {}

  getRateForCur (curCode) {
    const url = environment.api + curCode;

    console.log('url', url);
    return this.http.get<IRate>(url);
  }
}
