
const text_input = document.getElementById("note")

text_input.value = localStorage.getItem('nullnote');

text_input.addEventListener('keyup', (event) => {
    const text = document.getElementById('note').value;
    localStorage.setItem('nullnote', text);
  });

text_input.addEventListener('keydown', function(e) {
  console.log( )
  if (e.shiftKey && e.key == 'Tab'){
    //Define position
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    //Edit text
    this.value = this.value.substring(0, start-1) + this.value.substring(start-1, end+1).replace(/\t/g, '') + this.value.substring(end+1);

    // put caret at right position again
    this.selectionStart = start-1
    this.selectionEnd = start-1

  }
  else if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

window.addEventListener('storage', function(e) {
  text_input.value = localStorage.getItem('nullnote');
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

