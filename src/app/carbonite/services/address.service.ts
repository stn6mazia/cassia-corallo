import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AddressService {

    constructor(private http: HttpClient) {
    }

    getAddressByZip(zip) {
        return this.http.get<any>(`https://viacep.com.br/ws/${zip}/json/`).pipe(
            tap()
        )
    }
}
