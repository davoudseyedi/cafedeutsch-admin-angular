import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {

  @ViewChild('modalOpener', {static: true}) public modalOpenerDefault?:ElementRef;
  @ViewChild('modalCloser', {static: true}) public modalCloserDefault?:ElementRef;

  @Input() public WidthForm = false;
  @Output() public action = new EventEmitter();

  title = '';
  description = '';
  name = '';
  item:any = null;

  constructor(){}

  ngOnInit() {

  }

  public openModal(type = '') {

    this.modalOpenerDefault?.nativeElement.click();
  }

  public closeModal(type = '') {

    this.modalCloserDefault?.nativeElement.click();
  }

  public confirmAction() {

    this.action.emit(this.item);

    this.closeModal();
  }

}
