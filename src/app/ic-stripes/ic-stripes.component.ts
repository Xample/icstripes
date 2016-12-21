import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  style,
  state,
  animate,
  transition,
  trigger,
  keyframes,
  AnimationEntryMetadata,
  AnimationStateTransitionMetadata,
  AnimationStateDeclarationMetadata,
  AnimationMetadata
} from '@angular/core';

type ms = number;

@Component({
  selector: 'app-ic-stripes',
  templateUrl: './ic-stripes.component.html',
  styleUrls: ['./ic-stripes.component.css'],
  animations: IcStripesComponent.buildAnimations(10)
})
export class IcStripesComponent<StripeType> implements OnInit, OnDestroy {
  @Input() items:Array<StripeType> = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  static buildAnimations(maxNbStripes:number):AnimationEntryMetadata[] {
    return [IcStripesComponent.buildStripesAnimations(maxNbStripes)];
  }

  static buildStripesAnimations(maxNbStripes:number):AnimationEntryMetadata {
    let statesAndTransitions:AnimationMetadata[] = [];
    for (let stripeIndex = 0; stripeIndex < maxNbStripes; stripeIndex++) {
      statesAndTransitions = statesAndTransitions.concat(IcStripesComponent.buildStripeTrigger(stripeIndex));
    }
    return trigger('flyInOut', statesAndTransitions);
  }

  static buildStripeTrigger(stripeIndex:number):AnimationMetadata[] {
    const stateName:string = 'in' + stripeIndex;
    const finalState:AnimationStateDeclarationMetadata = IcStripesComponent.finalState(stripeIndex, stateName);
    const transitionIn:AnimationStateTransitionMetadata = IcStripesComponent.stripeIn(stripeIndex, stateName);
    const transitionOut:AnimationStateTransitionMetadata = IcStripesComponent.stripeOut(stripeIndex, stateName);
    return [finalState, transitionIn, transitionOut];
  }

  static finalState(stripeIndex:number, stateName:string) {
    return state(stateName, style({transform: '*'}));
  }

  static stripeIn(stripeIndex:number, stateName:string):AnimationStateTransitionMetadata {
    const delay:ms = (stripeIndex) * 50;
    return transition('void => ' + stateName, [
      style({
        transform: 'translateY(-100%) rotate(7deg)'
      }),
      animate('0.15s ' + delay + 'ms ease-out')
    ]);
  }

  static stripeOut(stripeIndex:number, stateName:string):AnimationStateTransitionMetadata {
    return transition(stateName + ' => void', [
      animate(1000, keyframes([
        style({transform: 'translateY(0)', offset: 0}),
        style({transform: 'translateY(100%)', offset: 1.0})
      ]))
    ]);
  }
}
