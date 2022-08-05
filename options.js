let  bg_color_element = document.getElementById('bg_color')
let  ft_color_element = document.getElementById('ft_color')

window.addEventListener("load", set_value_from_store, false);


bg_color_element.addEventListener('input', (event) => {
  localStorage.setItem('bg_color', event.target.value);
});

ft_color_element.addEventListener('input', (event) => {
  localStorage.setItem('ft_color', event.target.value);
});

function set_value_from_store(){
  console.log("here")
  bg_color_element.value = localStorage.getItem('bg_color');
  ft_color_element.value = localStorage.getItem('ft_color');

}