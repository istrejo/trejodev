import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':leave',
        [animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-6px)' }))],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(6px)' }),
          animate('200ms 100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
