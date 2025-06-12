import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading = this.isLoading.asObservable();
  show() {
    const obj = this;
    obj.isLoading.next(true);
  }
  hide() {
    const obj = this;
    obj.isLoading.next(false);
  }
}
