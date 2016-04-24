- three types of browser events:
  - error, resize, scroll.
document loading events
  - load, unload, ready.
    - load attached to any handler with external resource.

  - ready when dom completed constructed
  - key events, click based. movement based, form events

- The load, error and unload methods have been deprecated since jQuery version 1.8. The load() method is ambiguous in nature. This method could either mean an AJAX load or an actual firing of load event. Similarly, the error method could also be confused with the jQuery.error() method. Now in jQuery 3, these methods have finally been removed. You will now have to use the on method to register these event listeners.