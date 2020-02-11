import { Component } from "@angular/core";
import { LoginService } from "../shared/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
  private email: string;
  private password: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.email = "";
    this.password = "";
  }

  onSubmit() {
    try {
      this.loginService
        .login({ email: this.email, password: this.password })
        .subscribe((response: Response) => {
          if (response.ok) {
            this.router
              .navigate(["main-page"])
              .then(r => console.log("Its successful"));
          }
        });
    } catch (e) {
      this.router
        .navigate(["main-page"])
        .then(r => console.log("Its succesxwsful"));
    }
  }

  private validateEmail() {
    if (this.email === "") {
      return true;
    }
    return !(!this.email.includes("@") || this.email.indexOf("@") === 0);
  }

  private validatePassword() {
    if (this.password === "") {
      return true;
    }
    return this.password.length === 6;
  }
}
