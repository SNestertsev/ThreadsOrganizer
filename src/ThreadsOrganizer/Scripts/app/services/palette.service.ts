import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { AuthHttp } from "../auth.http";
import { Palette } from "../model/palette";
import { PaletteItem } from "../model/palette-item";

@Injectable()
export class PaletteService {
    constructor(private http: AuthHttp) { }

    private baseUrl = "api/palette/";     // Web API URL
    private cachedData: Palette[] = null;

    getAll(): Observable<Palette[]> {
        if (this.cachedData) {
            return Observable.of(this.cachedData);
        }
        else {
            var url = this.baseUrl;
            return this.http.get(url)
                .map(response => response.json())
                .catch(this.handleError)
                .do((data) => { this.cachedData = data });
        }
    }

    get(id: number): Observable<Palette> {
        if (id == null) { throw new Error("id is required."); }
        return this.getAll()
            .map(list => list.find(p => p.Id === id))
            .do(p => {
                var url = this.baseUrl + id;
                p.Items = this.http.get(url)
                    .map(response => response.json())
                    .catch(this.handleError);
            });
    }

    // calls the [POST] /api/palette/ Web API method to add a new palette.
    add(list: Palette) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(list), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [PUT] /api/palette/{id} Web API method to update an existing palette.
    update(list: Palette) {
        var url = this.baseUrl + list.Id;
        return this.http.put(url, JSON.stringify(list), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/palette/{id} Web API method to delete the palette with the given id.
    delete(id: number) {
        var url = this.baseUrl + id;
        return this.http.delete(url)
            .catch(this.handleError);
    }

    // returns a viable RequestOptions object to handle Json requests
    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }

    private handleError(error: Response) {
        // output errors to the console
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}