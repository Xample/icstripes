import {Component, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'app-ic-stripes',
  templateUrl: './ic-stripes.component.html',
  styleUrls: ['./ic-stripes.component.css']
})
export class IcStripesComponent<StripeType> implements OnDestroy {
  @Input() items:Array<StripeType> = [];

  public state:string = "enter";

  constructor() {
  }

  ngAfterViewChecked() {
    // Silly
    setTimeout(() => {
        this.state = "default";
      }, 0
    );
  }

  ngOnDestroy() {
    this.state = "leave";
  }
}
