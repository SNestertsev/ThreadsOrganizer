﻿import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserEditComponent } from "../components/user-edit.component";

@Component({
    selector: "login",
    templateUrl: "./app/components/login.component.html"
})
export class LoginComponent {
    title = "Login";
    loginForm = null;
    loginError = false;
    externalProviderWindow = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    performLogin(e) {
        e.preventDefault();
        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;
        this.authService.login(username, password)
            .subscribe((data) => {
                // login successful
                this.loginError = false;
                var auth = this.authService.getAuth();
                // alert("Our Token is: " + auth.access_token);
                this.router.navigate([""]);
            },
            (err) => {
                console.log(err);
                // login failure
                this.loginError = true;
            });
    }

    callExternalLogin(providerName: string) {
        var url = "api/Accounts/ExternalLogin/" + providerName;
        // minimalistic mobile devices support
        var w = (screen.width >= 1050) ? 1050 : screen.width;
        var h = (screen.height >= 550) ? 550 : screen.height;
        var params = "toolbar=yes,scrollbars=yes,resizable=yes,width=" + w + ", height=" + h;
        // close previously opened windows (if any)
        if (this.externalProviderWindow) {
            this.externalProviderWindow.close();
        }
        // TODO: refactor this "window.open" approach with some OAuth2 client library (may be Facebook OAuth2 JavaScript SDK).
        this.externalProviderWindow = window.open(url, "ExternalProvider", params, false);
    }

    onRegister() {
        this.router.navigate(["register"]);
    }
}