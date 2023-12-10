
//랜덤 배경화면
const images=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];
const randomImage=images[Math.floor(Math.random()*images.length)]
const imageBg =document.createElement('img');
imageBg.src=`images/${randomImage}`;
document.body.appendChild(imageBg);
//랜덤 명언
const quotes=[
  {quote:"The only way to do great work is to love what you do.- Steve Jobs",
  translate:"위대한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다. - 스티브 잡스"},

{quote:"In three words I can sum up everything I've learned about life: it goes on.- Robert Frost",
translate:"세 마디로 내가 삶에 대해 배운 모든 것을 요약할 수 있다: 삶은 계속된다. - 로버트 프로스트"},

{quote:"The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
translate:"우리가 내일을 깨닫는 데 유일한 제한은 오늘의 의심일 것이다. - 프랭클린 D. 루즈벨트"},

{quote:"The best way to predict the future is to create it. - Peter Drucker",
translate:"미래를 예측하는 가장 좋은 방법은 그것을 창조하는 것이다. - 피터 드러커"},

{quote:"Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
translate:"철이 뜨거워질 때까지 기다리지 말고, 찍어서 뜨겁게 만들어라. - 윌리엄 버들러 예이츠"},

{quote:"Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
translate:"성공은 영원하지 않고, 실패는 치명적이지 않다. 계속하는 용기가 중요하다. - 윈스턴 처칠"},

{quote:"Don't watch the clock; do what it does. Keep going. - Sam Levenson",
translate:"시계를 주시하지 마라; 시계가 하는 대로 하라. 계속 나아가라. - 샘 레빈슨"},

{quote:"The only way to achieve the impossible is to believe it is possible. - Charles Kingsleigh (Alice in Wonderland)",
translate:"불가능한 것을 이루는 유일한 방법은 그것이 가능하다고 믿는 것이다. - 찰스 킹스리 (이상한 나라의 앨리스)"},

{quote:"Your time is limited, don't waste it living someone else's life. - Steve Jobs",
translate:"당신의 시간은 제한되어 있다. 남의 삶을 살아가는 데 시간을 낭비하지 마라. - 스티브 잡스"},

{quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
translate:"두 가지는 무한하다: 우주와 인간의 어리석음; 그리고 나는 우주에 대해서는 확실하지 않다. - 알버트 아인슈타인"}
];
const quote=document.querySelector('#quote blockquote:first-child');
const translate=document.querySelector('#quote blockquote:last-child');
const randomQuote=quotes[Math.floor(Math.random()*quotes.length)]
quote.innerText=randomQuote.quote;
translate.innerText=randomQuote.translate;
//현재시간
const nowTime= document.querySelector(".time");
function clock() {
  let today = new Date();
  let times = today.toLocaleTimeString();
  nowTime.innerText=times;
}
setInterval(clock,1000);
//유저로그인
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const logoutBtn = document.querySelector('#logout-btn');
const BLIND_CLASSNAME = "blind";
const USERNAME = 'userName';

function loginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(BLIND_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME, userName);
  paintGreetings();
}

function paintGreetings() {
  const userName = localStorage.getItem(USERNAME);
  greeting.innerText = `Merry Christmas, ${userName}!🎄`;
  greeting.classList.remove(BLIND_CLASSNAME);
  logoutBtn.classList.remove(BLIND_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME);

if (savedUsername === null) {
  loginForm.classList.remove(BLIND_CLASSNAME);
  loginForm.addEventListener('submit', loginSubmit);
} else {
  paintGreetings();
}

function userLogout() {
  localStorage.clear();
  location.reload();
}

logoutBtn.addEventListener('click', userLogout);

//투두리스트
const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const username = localStorage.getItem("username");
const TODOS_KEY = `${username}_todos`;

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText ="◾" + newTodo.text;
  const button = document.createElement("button");
  button.className = "trash-btn";
  const img = document.createElement("img");
  img.setAttribute("src", "./images/letter-x.png");
  img.className = "trash-img";

  button.appendChild(img);
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newTodo,
    id: Date.now(),
  }
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parseToDos = JSON.parse(savedToDos);
  toDos = parseToDos;
  parseToDos.forEach(paintToDo);
}
//위치,날씨
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const API_KEY = "a62d2936ac06ca7a0d5881335e6d2746";
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  //   console.log("you live", lat, lng);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      //   console.log(data.name, data.weather[0].main, data.weather[0].description, data.main.temp);
      const weather = document.querySelector("#weather .location span");
      const city = document.querySelector("#weather .weather span");
      weather.innerText = `${data.name}`;
      city.innerText = `${data.weather[0].main}  ${data.main.temp} ℃ `;
    });
}
function onGeoError() {
  alert("can't find your location");
}

