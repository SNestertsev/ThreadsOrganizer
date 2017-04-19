import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ThreadListService } from "../services/thread-list.service";
import { ThreadList } from "../model/thread-list";

@Component({
    selector: "home",
    templateUrl: "./app/components/home.component.html"
})
export class HomeComponent implements OnInit{
    title = "Welcome View";
    selectedList: ThreadList;
    lists: ThreadList[] = null;
    errorMessage: string;

    public hasLists = false;

    constructor(
        private authService: AuthService,
        private threadListService: ThreadListService,
        private router: Router) { }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            var s = this.threadListService.getAll();
            s.subscribe(
                lists => {
                    this.lists = lists;
                    this.hasLists = (this.lists.length > 0)
                },
                error => this.errorMessage = <any>error
            );
        }
    }

    onSelect(list: ThreadList) {
        this.selectedList = list;
        console.log("Thread list with Id " + this.selectedList.Id + " has been clicked: loading list viewer...");
        this.router.navigate(["thread-list/view", this.selectedList.Id]);
    }
}