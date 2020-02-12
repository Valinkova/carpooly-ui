import { Component } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";
import { Account } from "./shared/models/account.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  navigateToMyProfilePage() {
    const account: Account = this.authService.getAccount();
    this.router
      .navigate(["view-profile"], {
        queryParams: {
          id: account.id,
        }
      })
  }
}
