import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {

    @Input() public type = 1;

    public animationFile = '/assets/anim/loading.json';

    public options = {
        path: '',
        loop: true
    }

    constructor() { }

    ngOnInit() {

     if(this.type){
       this.animationFile = '/assets/anim/loading.json';

       this.options = {
         path: this.animationFile,
         loop: true
       }
     }

    }

}
