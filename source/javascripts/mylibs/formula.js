self.addEventListener('message', function(e) {
  // In a real application, we'd do some kind of parsing here.
  // Instead, we just eval the given formula directly.
  var message = {
    formula: e.data,
    result: eval(e.data)
  };
  self.postMessage(message);
});