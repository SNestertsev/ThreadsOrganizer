import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { ThreadListService } from "../services/thread-list.service";
import { ThreadList } from "../model/thread-list";

@Component({
    selector: "list-edit",
    templateUrl: "./app/components/thread-list-edit.component.html"
})
export class ThreadListEditComponent implements OnInit {
    list: ThreadList;

    constructor(
        private authService: AuthService,
        private threadListService: ThreadListService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        var id = +this.activatedRoute.snapshot.params['id'];
        if (id) {
            this.threadListService.get(id).subscribe((list) => {
                this.list = list;
                console.log(this.list);
            });
        }
        else if (id === 0) {
            console.log("id is 0: adding a new list...");
            this.list = new ThreadList(0, "New List", null);
        }
        else {
            console.log("Invalid id: routing back to home...");
            this.router.navigate([""]);
        }
    }

    onInsert(list: ThreadList) {
        this.threadListService.add(list).subscribe(
            (data) => {
                this.list = data;
                console.log("ThreadList " + this.list.Id + " has been added.");
                this.router.navigate([""]);
            },
            (error) => console.log(error)
        );
    }

    onUpdate(list: ThreadList) {
        this.threadListService.update(list).subscribe(
            (data) => {
                this.list = data;
                console.log("ThreadList " + this.list.Id + " has been updated.");
                this.router.navigate(["thread-list/view", this.list.Id]);
            },
            (error) => console.log(error)
        );
    }

    onDelete(list: ThreadList) {
        var id = list.Id;
        this.threadListService.delete(id).subscribe(
            (data) => {
                console.log("ThreadList " + id + " has been deleted.");
                this.router.navigate([""]);
            },
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }

    onListDetailView(list: ThreadList) {
        this.router.navigate(["thread-list/view", list.Id]);
    }
}