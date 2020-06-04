const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor");
const range =document.getElementById("jsRange");
const mode =document.getElementById("jsMode");
const saveBtn =document.getElementById("jsSave");
const clear =document.getElementById("jsClear");
const erase =document.getElementById("jsErase");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE ="700";

canvas.width =CANVAS_SIZE; //캔퍼스 넓이
canvas.height =CANVAS_SIZE;//캔퍼스 높이

ctx.fillStyle ="white"; //기본배경:흰색
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);//기본박스:캔퍼스크기
ctx.strokeStyle ="INITIAL_COLOR"; //기본선색상:검정
ctx.lineWidth = 2.5; //기본굵기: 2.5

let painting = false;
let filling = false;
let eraseCV = false;
let color ="white";

function onMouseMove(event){ //움직임
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
      ctx.beginPath();
      ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
        if(eraseCV === true){
            ctx.fillStyle ="white";
            ctx.strokeStyle="white";
            ctx.fillRect(x,y,30,30); 
       }else{
           ctx.strokeStyle=color;
       }
    }
}

function startPainting(){ //시작
    painting =true;
}

function stopPainting(){ //종료
    painting =false;
}

function handleCanvasCilck(){ //채우기 변경
    if(filling===true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){ //오른쪽 클릭 방지
    event.preventDefault();
}

function handleColorClick(event){ //선색상변경
    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){ //선굵기변경
    const size = event.target.value;
    ctx.lineWidth = size;
    
}

function handleModeClick(event){ //버튼클릭변경(fill, paint)
    if(filling === false){
        filling = true;
        mode.innerText="paint";
    }else{
        filling = false;
        mode.innerText="fill";
    }
}

function handleSaveCilck(){ //다운로드
    const image =canvas.toDataURL();
    const link =document.createElement("a");
    link.href = image;
    link.download ="PaintJS";
    link.click();

}

function hadleClear(){ //캔퍼스 초기화
    ctx.clearRect (0,0,CANVAS_SIZE,CANVAS_SIZE);
}

function handleErase(event){ //캔퍼스 지우개
    if(eraseCV === false){
        eraseCV = true;
        erase.innerText="on";   
    }else{
        eraseCV = false;
        erase.innerText="off";
    }
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove); //움직임
    canvas.addEventListener("mousedown",startPainting); //시작 
    canvas.addEventListener("mouseup",stopPainting); //종료
    canvas.addEventListener("mouseleave",stopPainting); //종료
    canvas.addEventListener("click",handleCanvasCilck); //클릭
    canvas.addEventListener("contextmenu",handleCM); //오른쪽클릭
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

if(clear){
    clear.addEventListener("click",hadleClear);
}

if(erase){
    erase.addEventListener("click",handleErase);
}