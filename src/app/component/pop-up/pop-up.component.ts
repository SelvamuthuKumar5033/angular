import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Input() flag?: boolean;
  @Input() message?: string = '';
  @Output() res = new EventEmitter<boolean>();

  confirm() {
    const obj = this;
    obj.res.emit(true);
  }
  cancel() {
    const obj = this;
    obj.flag = false;
    obj.res.emit(false);
  }
}
