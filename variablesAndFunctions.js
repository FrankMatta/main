const welcomeButton = document.querySelector('.welcome button');
const nextLevelButton = document.querySelector('#next-level-button')
const playAgainButton = document.querySelector('.gameover button')
const username = document.querySelector('.welcome input')
const currUsername = document.querySelector('.userInfo .left')
const currLevel = document.querySelector('.userInfo .right')
const newGameButton = document.querySelector('#new-game-button')
const continueButton = document.querySelector('#continue-button')
const welcomeBackHeader = document.querySelector('#welcome-back-header')

//  Display Pages
const userInfo = document.querySelector('.userInfo')
const welcomePage = document.querySelector('.welcome');
const welcomeBackPage = document.querySelector('.container.continue');
const nextLevelPage = document.querySelector('.container.next-level');
const gameoverPage = document.querySelector('.gameover');

//need to tell user welcome back
// game settings
let key = "User";
let index = 0;
let level = [
  "noob...",
 "Getting The Hang Of It..",
 "Alright Mazer.",
 "Pro Mazer!",
 "GodLike!!"
];

let velocity = [11,6,4,2,2];
let cellsHorizontal = [3,10,20,30,60];
let cellsVertical = [3,10,20,30,60];

const setInfo = ()=>{



  for(let key in localStorage)
  {
    if(key === 'User')
    {
      value = localStorage.getItem(key);
      welcomeBackHeader.innerText = `Welcome Back ${value}!`
      currUsername.innerText = `User: ${value}`;
    }
    if(key === 'Level')
    {
      value = localStorage.getItem(key);
      currLevel.innerText = `Level: ${level[index]}`;
    }
    if(key === 'Index')
    {
      index = parseInt(localStorage.getItem(key));
    }
  }
}
