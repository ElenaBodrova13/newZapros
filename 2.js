const formLine = document.querySelector("input");
const article = document.querySelector(".article");
const arrLi = document.querySelectorAll("li");
const box = document.querySelector(".box");
const text = document.querySelector(".text");

const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};
async function getRepoz() {
  try {
    text.classList.add("white");
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${formLine.value}`
    );
    const repozitoriy = await res.json();

    repozitoriy.items.forEach((element) => {
      setRepLi(element);
    });
  } catch (e) {
    console.log(e);
  }
  formLine.value = "";
}

formLine.addEventListener("keyup", debounce(getRepoz, 1000));

function setRep({ name, owner, stargazers_count }) {
  article.insertAdjacentHTML(
    "beforeend",
    `<div class=wrap><div class="list">name: ${name} owner:${owner.login} stars: ${stargazers_count}</div>
    <button class="close">X</button></div>`
  );
}
let caunter = 0;

function setRepLi(repName) {
  if (caunter < 5) {
    box.insertAdjacentHTML(
      "beforeend",
      `<li class="seach" name= ${repName.name} owner= ${repName.owner.login} stars=${repName.stargazers_count}> ${repName.name} </li>`
    );
    caunter++;
  }
}
box.addEventListener("click", (event) => {
  if (event.target.classList.contains("seach")) {
    event.target.remove();
    article.insertAdjacentHTML(
      "beforeend",
      `<div class=wrap><div class="list">name: ${event.target.getAttribute(
        "name"
      )} owner:${event.target.getAttribute(
        "owner"
      )} stars: ${event.target.getAttribute("stars")}</div>
          <button class="close">X</button></div>`
    );
  }
});
article.addEventListener("click", (event) => {
  const list = document.querySelector(".list");
  const btn = document.querySelector("button");
  if (event.target.classList.contains("close")) {
    console.log(event.target, btn.closest(".wrap"));
    btn.closest(".wrap").remove();
  }
});
