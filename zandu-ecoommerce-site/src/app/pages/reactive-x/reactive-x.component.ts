import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-x',
  templateUrl: './reactive-x.component.html',
  styleUrls: ['./reactive-x.component.scss']
})
export class ReactiveXComponent implements OnInit {

  observable: Observable<number>;

  constructor() {
    // Initialize observable
    this.observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
  }

  ngOnInit(): void {
    // fromEvent(document, 'click')
    //   .pipe(
    //     throttleTime(1000),
    //     scan(count => count + 1, 0)
    //   )
    //   .subscribe(count => console.log(`Clicked ${count} times`));

    // Transforming values passed through observables
    // fromEvent<MouseEvent>(document, 'click')
    //   .pipe(
    //     throttleTime(1000),
    //     map(event => event.clientX),
    //     scan((count, clientX) => count + clientX, 0)
    //   )
    //   .subscribe(count => console.log(count));
  }

  handleOnClickMe(): void {
    /*console.log('just before subscribe');
    this.observable.subscribe({
      next(x): void { console.log('got value ' + x); },
      error(err): void { console.error('something wrong occurred: ' + err); },
      complete(): void { console.log('done'); }
    });
    console.log('just after subscribe');*/

    const observable = from([10, 20, 30]);
    const subscription = observable.subscribe(x => console.log(x));
    // Later:
    subscription.unsubscribe();
  }

}
