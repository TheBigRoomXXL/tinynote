
const text_input = document.getElementById("note")

text_input.value = localStorage.getItem('nullnote');

text_input.addEventListener('keyup', (event) => {
    console.log("here")
    const text = document.getElementById('note').value;
    console.log(text)
    localStorage.setItem('nullnote', text);
  });   

window.addEventListener('storage', function(e) {
  console.log("now")  
  text_input.value = localStorage.getItem('nullnote');
});