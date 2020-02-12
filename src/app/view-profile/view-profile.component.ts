import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ViewProfileService } from "../shared/services/view-profile.service";
import { Account } from '../shared/models/account.model';

@Component({
  selector: "view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.css"]
})
export class ViewProfileComponent implements OnInit {
  private profile: any = {};
  private isOpenRank: boolean;
  private comment: string;
  private rate: number;

  constructor(
    private route: ActivatedRoute,
    private viewProfileService: ViewProfileService
  ) {
    this.comment = "";
    this.isOpenRank = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.viewProfileService
        .getUser(params.id)
        .subscribe((account: Account) => (this.profile = account));
    });
  }

  rankDriver() {
    this.isOpenRank = true;
  }

  closeRankPage() {
    this.isOpenRank = false;
  }

  onSubmitRateClick() {
    this.closeRankPage();
    this.viewProfileService.rateDriver({
      rate: this.rate,
      comment: this.comment
    });
    this.rate = undefined;
  }

  onCancelRateClick() {
    this.closeRankPage();
    this.rate = undefined;
  }

  rateIt(rateNumber: number) {
    this.rate = rateNumber;
  }
}
