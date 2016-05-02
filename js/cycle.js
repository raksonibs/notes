// Observables are lazy event streams which can emit zero or more events, and may or may not finish.
const changeMessage$ = sources.DOM
  .select('.input-message')
  .events('input')
  .map(e => e.target.value)

// (sources.DOM is a way of accessing the DOM, provided by CycleJS), listen out for any input events, and map each event to the value of the input box. This returns an observable, commonly referred to as a stream, and it’s denoted as a stream by a $ at the end of the variable name.
// model-view-intent: MVI is a simple pattern to refactor the main() function into three parts: Intent (to listen to the user), Model (to process information), and View (to output back to the user).
// CycleJS also provides us with drivers, which listen to observable inputs and perform side effects, such as DOM rendering (which CycleJS does via a Virtual DOM implementation) and HTTP requests, which Cycle has a built in driver for
// To kick off and start a CycleJS application we provide it with an object of drivers and a main function that is expected to return an observable for each of the drivers we’re using.
const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
};

// That’s an object with two drivers, DOM and HTTP, so we need to give Cycle a function that returns an object with two observables, one for each driver. In Cycle terms, these are called sinks. A driver is a function that listens to an observable sink of data
function main(sources) {
  // stuff here...
  const myDomObservable$ = ...;
  const myHttpObservable$ = ...;
  return {
    DOM: myDomObservable$,
    HTTP: myHttpObservable$
  }
}

Cycle.run(main, drivers);
//We know that when building an application using CycleJS we need to work with a ReactiveJS stream of data, but often not everything you’re working with will provide it.
//ReactiveJS lets us create a Subject, which is a way for us to create our own observables. We can create a new subject and pass data to it. Any subscribers to it will then have that data emitted.
import Pusher from 'pusher-js';
import { Subject } from 'rx';

const pusher = new Pusher('YOUR_PUSHER_API_KEY_HERE', {});

function pusherObservable(channelName, eventName) {
  const pusherMessages$ = new Subject();
  const channel = pusher.subscribe(channelName);
  channel.bind(eventName, (data) => {
    pusherMessages$.onNext(data);
  });

  return pusherMessages$.startWith(null);
}

export { pusherObservable };
const pusherMessages$ = pusherObservable('messages', 'new_message');

//intents
function main(sources) {
  const intent = function(DOM) {
    const changeMessage$ = sources.DOM
      .select('.input-message')
      .events('input')
      .map(e => e.target.value)
      .share();

    return {
      changeMessage$: changeMessage$,

      submitMessage$: changeMessage$
        .sample(sources.DOM.select('.messages-form').events('submit'))
        .share()
    }
  }
}
const actions = intent(sources.DOM);

// single stream
const model = function(actions) {
  const message$ = Observable.merge(
    actions.changeMessage$,
    actions.submitMessage$.map(x => '')
  ).startWith('')

  return Observable.combineLatest(
    allPusherMessages$,
    message$,
    (pusherMessages, message) => ({ pusherMessages, message })
  );
};

const state$ = model(actions);

function view(state$) {
  return state$.map(({ pusherMessages, message }) => {
    return viewMessages(pusherMessages, message);
  });
}

function viewMessages(pusherMessages, message) {
  return div([
    div({ id: 'message-list' }, pusherMessages.map(renderPusherMessage)),
    div([
      form({ className: 'messages-form', onsubmit: (e) => e.preventDefault() }, [
        input({ className: 'input-message', value: message  }),
        button({ className: 'send-message' }, [
          span({ className: 'white light fa fa-paper-plane-o' })
        ])
      ])
    ])
  ]);
}

function renderPusherMessage({ text, username, time }) {
  return div({ className: 'message' }, [
    div({ className: 'text-display' }, [
      div({ className: 'message-data' }, [
        span({ className: 'author' }, username),
        span({ className: 'timestamp' }, new Date(time)),
      ]),
      p({ className: 'message-body' }, text)
    ])
  ])
}

const request$ = actions.submitMessage$.filter(
  (message) => message !== ''
).map((message) => {
  return {
    method: 'POST',
    url: 'http://localhost:4567/messages',
    headers: {
      'Content-Type': 'application/json'
    },
    send: {
      time: new Date(),
      text: message,
      username: 'pusher'
    }
  }
});

function main(sources) {
  // code omitted

  return {
    DOM: view(state$),
    HTTP: request$
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  // we don't listen to the response
  // so we need to tell it to make HTTP requests anyway
  HTTP: makeHTTPDriver({ eager: true })
};

Cycle.run(main, drivers);