import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { AuthHttp } from "../auth.http";
import { ThreadList } from "../model/thread-list";
import { Item } from "../model/item";

@Injectable()
export class ThreadListService {
    constructor(private http: AuthHttp) { }

    private baseUrl = "api/threadlist/";     // Web API URL

    getAll(): Observable<ThreadList[]> {
        var url = this.baseUrl;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<ThreadList>{
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + id;
        return this.http.get(url)
            .map(res => <ThreadList>res.json())
            .catch(this.handleError);
    }

    getItems(id: number): Observable<Item[]> {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + id + "/items";
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/threadList/ Web API method to add a new list.
    add(list: ThreadList) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(list), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [PUT] /api/threadList/{id} Web API method to update an existing list.
    update(list: ThreadList) {
        var url = this.baseUrl + list.Id;
        return this.http.put(url, JSON.stringify(list), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/threadList/{id} Web API method to delete the list with the given id.
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