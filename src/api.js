function render(input) {
  document.innerHTML = input; // XSS
}

function generateToken() {
  return Math.random().toString(); // weak random
}
