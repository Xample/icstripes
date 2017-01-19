import {Component, OnDestroy, Input, OnInit, ContentChild, ElementRef, AfterViewChecked} from '@angular/core';

interface Metadata {
  color:string;
  index:number;
  isInBody:boolean;
  offset:string;
  wideness:string;
}

interface Stripe {
  data:Object;
  metadata:Metadata;
}

@Component({
  selector: 'app-ic-stripes',
  templateUrl: './ic-stripes.component.html',
  styleUrls: ['./ic-stripes.component.css']
})

export class IcStripesComponent<StripeType> implements OnDestroy, OnInit, AfterViewChecked {
  @Input() items:Array<StripeType> = [];
  @ContentChild('contentTemplate') private contentTemplate:ElementRef;

  public state:string = "enter";
  private leadingStripes:number = 1;
  private tailingStripes:number = 1;
  private stripesColors:string[] = ['#C70000', '#AA0000', '#8F0000', '#6E0000', '#5A0000'];
  private stripes:Array<Stripe> = [];

  constructor() {
  }

  ngAfterViewChecked() {
    // We should not use any timeout. But I have no way to get the first page done with the default state before
    setTimeout(() => {
        this.state = "default";
      }, 0
    );
  }

  ngOnInit() {
    this.buildStripes();
  }

  ngOnDestroy() {
    this.state = "leave";
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

  private stripeWidthInPercents():number {
    return 100 / this.bodyStripesCount();
  }

  private stripeWidthStyle():string {
    // The overflow percentage prevents having white dots in the borders
    const overflowPercentage:number = 1.01;
    return this.stripeWidthInPercents() * overflowPercentage + '%';
  }

  private stripeOffsetStyle(stripeIndex:number):string {
    return this.stripeWidthInPercents() * this.bodyIndex(stripeIndex) + '%';
  }

  private dataForStripe(stripeIndex:number):Object {
    if (!this.isInBody(stripeIndex)) return undefined;
    const relativeIndex:number = this.bodyIndex(stripeIndex);
    return this.items[relativeIndex];
  }

  private buildStripe(index:number):Stripe {
    return {
      data: this.dataForStripe(index),
      metadata : {
        color: this.stripeColor(index),
        index: index,
        isInBody: this.isInBody(index),
        offset: this.stripeOffsetStyle(index),
        wideness: this.stripeWidthStyle()
      }
    }
  }

  private bodyStripesCount():number {
    return this.items.length;
  }

  private totalStripesCount():number {
    return this.leadingStripes + this.bodyStripesCount() + this.tailingStripes;
  }

  private buildStripes() {
    const stripes:Array<Stripe> = [];
    for (let index = 0; index < this.totalStripesCount(); index++) {
      stripes[index] = this.buildStripe(index);
    }
    this.stripes = stripes;
  }
}
