import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  @Input() nflag? :boolean;
  @Input() message? :string='';
  @Output() res = new EventEmitter<boolean>();

  cancel(){
    const obj = this;
    obj.nflag = false;
    obj.res.emit(false);
  }
}
