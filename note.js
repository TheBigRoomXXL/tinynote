const text_input = document.getElementById("note")
window.addEventListener("load", set_value_from_store, false);


text_input.addEventListener('keyup', (event) => {
    const text = document.getElementById('note').value;
    localStorage.setItem('notepad', text);
  });


  // Manage tab and untab
text_input.addEventListener('keydown', function(e) {
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
  set_value_from_store()
});



function set_value_from_store(){
  console.log("here")
  text_input.value = localStorage.getItem('notepad');
  document.body.style.background = localStorage.getItem('bg_color');
  text_input.style.background = localStorage.getItem('bg_color');
  text_input.style.color = localStorage.getItem('ft_color');
  
}