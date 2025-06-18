let clickCount = 0;

function addProgressBar() {
  clickCount++; // Increases on every click (1st click = 10%, 2nd = 20%, etc.)
  const fillPercent = clickCount * 10;

  const container = document.getElementById("progress-bars");

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "progress-wrapper";

  // Create bar
  const bar = document.createElement("div");
  bar.className = "progress-bar";
//   bar.innerText = "0%";
  wrapper.appendChild(bar);
  container.appendChild(wrapper);

  // Animate fill up to 'fillPercent'
  let width = 0;
  const interval = setInterval(() => {
    if (width >= fillPercent || width >= 100) {
      clearInterval(interval);
    } else {
      width++;
      bar.style.width = width + "%";
    //   bar.innerText = width + "%";
    }
  }, 15);
}
