const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor");
const range =document.getElementById("jsRange");
const mode =document.getElementById("jsMode");
const saveBtn =document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE ="700";

canvas.width =CANVAS_SIZE;
canvas.height =CANVAS_SIZE;

ctx.fillStyle ="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);//기본배경:흰색
ctx.strokeStyle ="INITIAL_COLOR"; //기본색상:검정
ctx.fillStyle ="INITIAL_COLOR";
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
    ctx.fillStyle = color;
}

function handleRangeChange(event){ //굵기변경
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

function handleCanvasCilck(){
    if(filling===true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveCilck(){
    const image =canvas.toDataURL();
    const link =document.createElement("a");
    link.href = image;
    link.download ="PaintJS";
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); //좌표
    canvas.addEventListener("mousedown",startPainting); //시작 
    canvas.addEventListener("mouseup",stopPainting); //종료
    canvas.addEventListener("mouseleave",stopPainting); //종료2
    canvas.addEventListener("click",handleCanvasCilck);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color =>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveCilck);
}