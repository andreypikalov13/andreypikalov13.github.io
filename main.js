window.addEventListener('DOMContentLoaded',()=>{

	
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
} 



	var buttonChange = document.querySelectorAll('.program'),
infoblock = document.querySelectorAll('.info > span'),
buttonPlay = document.querySelector('.play');

//buttonChange.addEventListener("click",changeProgram);
var data = turnProgram;
var blockIndex = 0;

var audio = new Audio();
    audio.src = "sound/timer.mp3";
    audio.loop = 100;

var dodod = new Audio();
    dodod.src = "sound/end.mp3";
    dodod.loop = 100;

var index = 0;
//console.log(data[0].approach1);
var min,sec;

	
var timeInterval;    
 	
 	
 
  


function play() {

	

	
	console.log(blockIndex);
	
	min = data[index]['approach'+blockIndex];
	if(sec==0){
			
			sec=60;
			min--;
		}else{
			sec=data[index]['secun'+blockIndex];
		}
	
	timeInterval = setInterval(timer,100);
	infoblock[blockIndex].style.border = '2px solid blue';

	buttonPlay.innerHTML = min+':'+sec;
	audio.play();
	buttonPlay.classList.add('timer');

	function timer(){
		if(sec < 10){
			buttonPlay.innerHTML = min+':0'+sec;
		}else{
		buttonPlay.innerHTML = min+':'+sec;
		}
		 if(sec==0){
			
			sec=60;
			min--;
		}sec--;
		if(min<0){

			infoblock[blockIndex].style.border = 'none';
			blockIndex++;
			buttonPlay.classList.remove('timer');
			audio.pause();
			dodod.play();
			var gg = setTimeout(()=>{dodod.pause()},2100);
		
			
			buttonPlay.innerHTML = `<img src="images/play.png" alt="play">`;
			clearInterval(timeInterval);
			
			
		}
		
		
	}

}


buttonPlay.addEventListener("click",play);
//buttonPlay.removeEventListener("click",play);
buttonChange.forEach((item,index1)=>{
	
    buttonChange[index1].addEventListener('click',()=>{
 	index  = index1;
 	clearInterval(timeInterval);
 	infoblock.forEach((item,i)=>{
 		infoblock[i].style.border = 'none';
 	})
 	
 	
	buttonPlay.classList.remove('timer');
	buttonPlay.innerHTML = `<img src="images/play.png" alt="play">`;
	audio.pause();
 	blockIndex = 0;
 	infoblock.forEach((item,index2)=>{

 		infoblock[index2].innerHTML = data[index1]['approach'+index2]+':'+ data[index1]['secun'+index2];
 	});
  })
});


infoblock.forEach((item,index2)=>{

 		infoblock[index2].innerHTML = data[0]['approach'+index2]+':'+ data[0]['secun'+index2];
 	});
});
