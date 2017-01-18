import {Component, OnDestroy, Input, OnInit} from '@angular/core';

interface StripeMetadata {
  offset:string;
  wideness:string;
  color:string;
  isInBody:boolean;
}

@Component({
  selector: 'app-ic-stripes',
  templateUrl: './ic-stripes.component.html',
  styleUrls: ['./ic-stripes.component.css']
})

export class IcStripesComponent<StripeType> implements OnDestroy, OnInit {
  @Input() items:Array<StripeType> = [];

  public state:string = "enter";
  private leadingStripes:number = 1;
  private tailingStripes:number = 1;
  private stripesColors:string[] = ['#C70000', '#AA0000', '#8F0000', '#6E0000', '#5A0000'];
  private stripes:Array<StripeMetadata> = [];

  constructor() {
  }

  ngAfterViewChecked() {
    // We should not use any timeout. But I have no way to get the first page done with the default state before
    setTimeout(() => {
        this.state = "default";
      }, 0
    );
  }

  private stripeColor(index):string {
    const relativeIndex:number = this.bodyIndex(index);
    const closestBodyIndex = this.closestBodyIndex(relativeIndex);
    return this.stripesColors[closestBodyIndex];
  }

  private isInBody(stripeIndex:number):boolean {
    const relativeIndex:number = this.bodyIndex(stripeIndex);
    return relativeIndex === this.closestBodyIndex(relativeIndex);
  }

  private closestBodyIndex(bodyIndex:number) {
    const maximumBodyIndex:number = this.bodyStripesCount() - 1;
    return Math.min(Math.max(0, bodyIndex), maximumBodyIndex);
  }

  private bodyIndex(index:number):number {
    return index - this.leadingStripes;
  }

  private stripeWidth():number {
    const idealWidth:number = 1 / this.bodyStripesCount();
    return idealWidth;
  }

  private stripeWidthStyle():string {
    // The overflow percentage prevents having white dots in the borders
    const overflowPercentage:number = 1;
    return (this.stripeWidth() * (100 + overflowPercentage)) + '%';
  }

  private stripeOffsetStyle(stripeIndex:number):string {
    return (this.stripeWidth() * 100) * this.bodyIndex(stripeIndex) + '%';
  }

  private buildStripe(index:number):StripeMetadata {
    return {
      offset: this.stripeOffsetStyle(index),
      wideness: this.stripeWidthStyle(),
      color: this.stripeColor(index),
      isInBody: this.isInBody(index)
    }
  }

  private bodyStripesCount():number {
    return this.items.length;
  }

  private totalStripesCount():number {
    return this.leadingStripes + this.bodyStripesCount() + this.tailingStripes;
  }

  private buildStripes() {
    const stripes:Array<StripeMetadata> = [];
    for (let index = 0; index < this.totalStripesCount(); index++) {
      stripes[index] = this.buildStripe(index);
    }
    this.stripes = stripes;
  }

  ngOnInit() {
    this.buildStripes();
  }

  ngOnDestroy() {
    this.state = "leave";
  }
}
