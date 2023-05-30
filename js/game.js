score = 0;
cross = true;
endGame=false;
winGame=false;

audio = new Audio('/assets/music.mp3');
audiogo = new Audio('/assets/gameover.mp3');
function f (){
  document.getElementById('dd').classList.add('obstacleAni')
	debugger
	$('#start').attr('style','display:none')
	
var timer = setTimeout(() => {
	audio.play()
	for(let id=0;id<input.length;id++){
		st=$(`
		<div class="col-md-4">
			<div class="form-floating mb-4 ">
			<input class="form-control" id="${input[id].entry}" type=${input[id].type} name=${input[id].entry} disabled placeholder="abcd"></input> 
			<label for="${input[id].entry}" >${input[id].entry} </label>
			</div>
		</div>
			`)
		$('#contact-form').append(st) 
	}  
}, 1000);

 
// ---------------------------------player move----------------------------------------------------

document.onkeydown = function (e) {
    // console.log("Key code is: ", e.keyCode)
	if ( e.keyCode ==  38|| e.keyCode ==  32 ) {
		dino = document.querySelector('.dino');
		dino.classList.add('animateDino');
		setTimeout(() => {
				dino.classList.remove('animateDino')
		}, 500);
	}
	if (e.keyCode == 39) {
		dino = document.querySelector('.dino');
		dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
				if(1170 > dinoX)
				dino.style.left = dinoX + 112 + "px";

	}
	if (e.keyCode == 37) {
		dino = document.querySelector('.dino');
		dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

		if(52<dinoX)
		dino.style.left = (dinoX - 112) + "px";
	}
}

// ---------------------------------Annimation and Score----------------------------------------------------

timer=setInterval(() => {
	dino = document.querySelector('.dino');
	gameOver = document.querySelector('.gameOver');
	obstacle = document.querySelector('.obstacle');

	dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
	dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

	ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
	oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

	offsetX = Math.abs(dx - ox);
	offsetY = Math.abs(dy - oy);
    
	if (offsetX < 73 && offsetY < 52) {
			gameOver.innerHTML = `Game Over -  Your Score ${ document.getElementById('scoreCont').value}`
		endGame=true;
		
			obstacle.classList.remove('obstacleAni')
			dino.classList.remove('animateDino')
		audiogo.play();
		setTimeout(() => {
				audiogo.pause();
				audio.pause();
		}, 1000);

		setTimeout(()=>{
				for(let i =0;i<input.length;i++){
						// setTimeout(show(i),1000)
						show(i)
				}
		},3000)
			
	}else if (offsetX < 145 && cross) {
		score += 1;
		show(score - 1)
		if(score<7){
		document.getElementById('scoreCont').innerHTML = score
		}
		cross = false;
		setTimeout(() => {
				cross = true;
		}, 1000);

		setTimeout(() => {
				aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
				newDur = aniDur - 0.5;
				obstacle.style.animationDuration = newDur + 's';
				console.log('New animation duration: ', newDur)
		}, 700);
	}
}, 10);
 

// ---------------------------------Dynamic Form with DB entry----------------------------------------------------


const input =[{entry:'firstname' , type:'text'},{entry:'lastname' , type:'text'},{entry:'email' , type:'email'},{entry:'designation' , type:'text'},{entry:'mobile' , type:'number'},{entry:'organization',text:'text'}]
str = ""
existArr = []
p = 0
function show(id) {
	if (!existArr.includes(id)&& id<6) {
		document.getElementById(input[id].entry).disabled=false
		existArr.push(id)
		win=document.getElementById('trophy')
		win.innerHTML =` ${existArr.length}/6`
	}    
}

// ---------------------------------Timer Function----------------------------------------------------

var timeLeft = 30; 
var tf=0;
var timerId = setInterval(countdown, 1000);
function countdown() {
  if (timeLeft == -1 || endGame || winGame) {
    if(endGame) tf=timeLeft
    document.getElementById('submit').classList.remove('invisible')
    document.getElementById('timerid').classList.add('invisible')
    document.getElementById('progressid').style.width = `100%`
    clearTimeout(timerId); 
  }else{
   	document.getElementById('timerid').innerHTML = timeLeft + ' seconds remaining';
		p += 3.333
		progress = document.getElementById('progressid').style.width = `${p}%`
    timeLeft--; 
  }
}


// ---------------------------------Form Submition----------------------------------------------------

function formSubmit(){
	const formdata=new FormData()
	for(let i=0;i<input.length;i++){
		formdata.append(input[i].entry, document.getElementsByName(input[i].entry)[0].value)
	}
	console.log("Form Data => ",formdata)
	if(tf!=0){
		finish("Congratulations!!!","Warmest congratulations on your achievement! Wishing you even more success in the future.")
	}else if(tf==0){
		finish("ThankYou!!!","Thanks friend for coming and making my event beautiful. I can not forget this gesture of yours.")
	}
}



// --------------------------------- thank you page ----------------------------------------------------

function finish(topic,message){
     
text=`   
<div class="border border-3 border-success"></div>
<div class="card  bg-white shadow p-5">
    <div class="mb-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-success" width="75" height="75"
            fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
                d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
        </svg>
    </div>
    <div class="text-center">
        <h1>${topic}</h1>
        <p>${message} </p>
        <button class="btn btn-outline-success">Back Home</button>
    </div>

</div>`

document.getElementById('thankyou').innerHTML=text;

}
}
