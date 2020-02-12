import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(
    message: string,
    action: string,
    isError: boolean,
    duration?: number
  ) {
    let panelClass = "green-snackbar";
    if (isError) {
      panelClass = "red-snackbar";
    }
    this.snackBar.open(message, action, {
      panelClass: panelClass,
      verticalPosition: "top",
      horizontalPosition: "end"
    });
  }
}
