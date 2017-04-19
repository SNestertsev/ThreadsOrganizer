import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { ThreadListService } from "../services/thread-list.service";
import { ThreadList } from "../model/thread-list";
import { Item } from "../model/item";

@Component({
    selector: "list-view",
    templateUrl: "./app/components/thread-list-view.component.html"
})
export class ThreadListViewComponent implements OnInit {
    list: ThreadList;
    items: Item[] = null;

    constructor(
        private authService: AuthService,
        private threadListService: ThreadListService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.threadListService.get(id).subscribe(list => this.list = list);
            this.threadListService.getItems(id).subscribe(items => this.items = items);
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit mode...");
            this.router.navigate(["thread-list/edit", 0]);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onListDetailEdit(list: ThreadList) {
        this.router.navigate(["thread-list/edit", list.Id]);
    }

    onBack() {
        this.router.navigate(['']);
    }
};