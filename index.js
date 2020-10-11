
if(!localStorage.length){

  welcomeButton.addEventListener('click', ()=>{
    if(!username.value){
      alert('Please Enter A Name');
    }else {
       localStorage.setItem('User', username.value);
       localStorage.setItem('Level', level[index]);
       localStorage.setItem('Index', index)
       welcomePage.classList.add('hidden');
       setInfo();
       userInfo.classList.remove('hidden');
       generateMaze();
    }
  })
} else
{
  setInfo();
  welcomePage.classList.add('hidden');
  welcomeBackPage.classList.remove('hidden');
}


newGameButton.addEventListener('click', ()=>{
  welcomeBackPage.classList.add('hidden');
  index = 0;
  localStorage.setItem('Index', index);
  console.log(index)
  userInfo.classList.remove('hidden')
  setInfo();
  generateMaze();
})

continueButton.addEventListener('click', ()=>{
  welcomeBackPage.classList.add('hidden')
  setInfo()
  userInfo.classList.remove('hidden')
  generateMaze();
})
