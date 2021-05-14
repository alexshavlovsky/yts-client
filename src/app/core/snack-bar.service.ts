import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EMPTY, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showHttpError(error: any): Observable<never> {
    const message = error.error ? (error.error.message ? error.error.message : error.error) : error.message;
    this.snackBar.open(message, 'close');
    return EMPTY;
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'close');
  }

}
