const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor");
const range =document.getElementById("jsRange");
const mode =document.getElementById("jsMode");


canvas.width =700;
canvas.height =700;

ctx.strokeStyle ="#2c2c2c"; //기본색상:검정
ctx.lineWidth = 2.5; //기본굵기: 2.5

let painting = false;
let filling = false;

function startPainting(){ //시작
    painting =true;
}

function stopPainting(){ //종료
    painting =false;
}

function onMouseMove(event){ //좌표
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
      ctx.beginPath();
      ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){ //색상변경
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
    
}

function handleModeClick(event){
    if(filling === false){
        filling = true;
        mode.innerText="paint";
    }else{
        filling = false;
        mode.innerText="fill";
    }
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); //좌표
    canvas.addEventListener("mousedown",startPainting); //시작 
    canvas.addEventListener("mouseup",stopPainting); //종료
    canvas.addEventListener("mouseleave",stopPainting); //종료2
}

Array.from(colors).forEach(color =>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}