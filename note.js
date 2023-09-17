const text_input = document.getElementById("note")

window.addEventListener('load', function (e) {
  text_input.value = localStorage.getItem('notepad');
});

window.addEventListener('storage', function (e) {
  text_input.value = localStorage.getItem('notepad');
});

text_input.addEventListener('keyup', (event) => {
  const text = document.getElementById('note').value;
  localStorage.setItem('notepad', text);
});


// Manage tab and untab
text_input.addEventListener('keydown', function (e) {
  if (e.shiftKey && e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    //Edit text
    this.value = this.value.substring(0, start - 1) + this.value.substring(start - 1, end + 1).replace(/\t/g, '') + this.value.substring(end + 1);

    // put caret at right position again
    this.selectionStart = start - 1
    this.selectionEnd = start - 1

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
