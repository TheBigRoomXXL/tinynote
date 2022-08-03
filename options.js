function save_options() {
  var bg_color = document.getElementById('bg_color').value;
  var ft_color = document.getElementById('ft_color').value;
  chrome.storage.sync.set({
    bg_color: bg_color,
    ft_color: ft_color,
  })
}

