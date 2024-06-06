

//program variables
//controls section
var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(100, 75);
var transV = new point(250, 250);
var scaleP = 1;
var scaleV = 1;
var o = new point(0, 0, "");
var a = new point(0, 0, "");
var b = new point(0, 0, "");
var vo = new point(0, 0, "O");
var va = new point(0, 0, "Va");
var vb = new point(0, 0, "Vb");
var vba = new point(0, 0, "Vba");
var Va = new point(0, 0, "Va");
var Vb = new point(0, 0, "Vb");
var Vba = new point(0, 0, "Vba");



var theta2 = 40; 
var phi = 0; 
var omega2 = 1; 
var omega3 = 0;
theta3 = 0;
var vela = 0,
  velba = 0,
  velb = 0;

var r = 0,
  l = 0;
var flaggrashof = true;
//graphics section
var canvas, canvas2;
var ctx, ctx2;
//timing section
var simTimeId = setInterval("", "1000");
var pauseTime = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
//temporary or dummy variables
var temp = 0;
var offset = 0;


//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss() {
  $(".variable").css("padding-top", "25px");
  $("#commentboxright").css("text-align", "left");
  $("#commentboxright").css("line-height", "16px");

 
}

//start of simulation here; starts the timer with increments of 0.1 seconds
function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#theta2spinner").spinner("value", theta2); //to set simulation parameters on pause
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    document.querySelector(".playPause").textContent = "Pause";
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "clock") {
    document.getElementById("rotationbutton").src = "images/anti.svg";
    rotstatus = -1;
  }
  if (imgfilename == "anti") {
    document.getElementById("rotationbutton").src = "images/clock.svg";
    rotstatus = 1;
  }
}


function varinit() {
  varchange();
 
  $("#r2slider").slider("value", 40);
  $("#r2spinner").spinner("value", 40);
  //Variable r3 slider and number input types
  $("#r3slider").slider("value", 100);
  $("#r3spinner").spinner("value", 100);

  $("#theta2slider").slider("value", 40);
  $("#theta2spinner").spinner("value", 40);
  //Variable omega2 slider and number input types
  $("#omega2slider").slider("value", 1);
  $("#omega2spinner").spinner("value", 1);
}


function varchange() {

  $("#r2slider").slider({ max: 60, min: 20, step: 2 }); 
  $("#r2spinner").spinner({ max: 60, min: 20, step: 2 }); 

  $("#r2slider").on("slide", function (e, ui) {
    $("#r2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("spin", function (e, ui) {
    $("#r2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r2spinner").on("change", function () {
    varchange();
  });


  $("#r3slider").slider({ max: 240, min: 80, step: 2 }); // slider initialisation : jQuery widget
  $("#r3spinner").spinner({ max: 240, min: 80, step: 2 }); // number initialisation : jQuery widget

  $("#r3slider").on("slide", function (e, ui) {
    $("#r3spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r3spinner").on("spin", function (e, ui) {
    $("#r3slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#r3spinner").on("change", function () {
    varchange();
  });


  $("#theta2slider").slider({ max: 360, min: 0, step: 2 }); // slider initialisation : jQuery widget
  $("#theta2spinner").spinner({ max: 360, min: 0, step: 2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#theta2slider").on("slide", function (e, ui) {
    $("#theta2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta2spinner").on("spin", function (e, ui) {
    $("#theta2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#theta2spinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omega2slider").slider({ max: 10, min: 1, step: 0.2 }); // slider initialisation : jQuery widget
  $("#omega2spinner").spinner({ max: 10, min: 1, step: 0.2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omega2slider").on("slide", function (e, ui) {
    $("#omega2spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("spin", function (e, ui) {
    $("#omega2slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2spinner").on("change", function () {
    varchange();
  });

  varupdate();
}

//Computing of various system parameters
function varupdate() {
  $("#r2slider").slider("value", $("#r2spinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#r3slider").slider("value", $("#r3spinner").spinner("value"));
  $("#theta2slider").slider("value", $("#theta2spinner").spinner("value"));

  r = $("#r2spinner").spinner("value");
  l = $("#r3spinner").spinner("value");
  $("#r3slider").slider({ max: 6 * $("#r2slider").slider("value") });
  $("#r3slider").slider({ min: 2.5 * $("#r2slider").slider("value") });
  $("#r3spinner").spinner({ max: 6 * $("#r2slider").slider("value") });
  $("#r3spinner").spinner({ min: 2.5 * $("#r2slider").slider("value") });
  if (!simstatus) {
    $("#omega2slider").slider("enable");
    $("#omega2spinner").spinner("enable");

    $("#theta2slider").slider("disable");
    $("#theta2spinner").spinner("disable");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
    printcomment("", 2);
    theta2 = theta2 + 0.1 * deg(omega2);
    theta2 = theta2 % 360;
    if (theta2 < 0) theta2 += 360;
  }
  if (simstatus) {
    $("#theta2slider").slider("enable");
    $("#theta2spinner").spinner("enable");
    $("#omega2slider").slider("disable");
    $("#omega2spinner").spinner("disable");
    omega2 = rotstatus * $("#omega2spinner").spinner("value");
    theta2 = $("#theta2spinner").spinner("value");
  }
  phi = deg(Math.asin((r * Math.sin(rad(theta2))) / l));
  theta3 = -phi;
  o.xcoord = 0;
  o.ycoord = 0;
  a.xcoord = o.xcoord + scaleP * r * Math.cos(rad(theta2));
  a.ycoord = o.ycoord + scaleP * r * Math.sin(rad(theta2));
  b.xcoord = a.xcoord + scaleP * l * Math.cos(rad(phi));
  b.ycoord = o.ycoord;

  //Velocity Calculations
  if (Math.abs(r * omega2) < 50) scaleV = 2;
  else if (Math.abs(r * omega2) >= 50 && Math.abs(r * omega2) < 150) scaleV = 1;
  else if (Math.abs(r * omega2) >= 150 && Math.abs(r * omega2) < 400)
    scaleV = 0.5;
  else if (Math.abs(r * omega2) >= 400) scaleV = 0.25;
  else scaleV = 1;

  vela = r * omega2;
  velba = (vela * Math.sin(rad(90 + theta2))) / Math.sin(rad(90 + phi));
  velb = (vela * Math.sin(rad(theta2 + phi))) / Math.sin(rad(90 + phi));
  vo.xcoord = 0;
  vo.ycoord = 0;
  va.xcoord = vo.xcoord + scaleV * vela * Math.cos(rad(90 + theta2));
  va.ycoord = vo.ycoord + scaleV * vela * Math.sin(rad(90 + theta2));
  vba.xcoord = va.xcoord + scaleV * velba * Math.cos(rad(270 - phi));
  vba.ycoord = va.ycoord + scaleV * velba * Math.sin(rad(270 - phi));
  vb.xcoord = vo.xcoord + scaleV * velb * Math.cos(rad(180));
  vb.ycoord = vo.ycoord + scaleV * velb * Math.sin(rad(0));
  //printcomment(pointdist(vo,vba)+" calc "+velb,1);
  omega3 = -velba / l;
  //printcomment("Limits of l for the set r : "+$('#r3spinner').spinner("option","min")+" and\n "+$('#r3spinner').spinner("option","max")+" ",1);
  printcomment(
    "V<sub>xy</sub>=Velocity of x with respect to y<br>V<sub>x</sub>=Velocity of x with respect to ground",
    1
  );
  printcomment(
    "V<sub>a</sub>=" +
      roundd(vela, 2) +
      " mm/s &nbsp;&nbsp;&nbsp; &omega;<sub>3</sub>=" +
      roundd(omega3, 2) +
      "rad/s<br>V<sub>ba</sub>=" +
      roundd(-velba, 2) +
      " mm/s<br>V<sub>b</sub>=" +
      roundd(-velb, 2) +
      " mm/s",
    2
  );
  draw();
}

//Simulation graphics
function draw() {
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400); //clears the complete canvas#simscreen everytime

  pointtrans(o, trans);
  pointtrans(a, trans);
  pointtrans(b, trans);

  //Crank Center and Sliding base
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 20;
  ctx.moveTo(o.xcoord, o.ycoord);
  ctx.lineTo(o.xcoord, o.ycoord + 10);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#666666";
  ctx.moveTo(75, o.ycoord + 15);
  ctx.lineTo(530, o.ycoord + 15);
  ctx.stroke();
  ctx.closePath();

  pointjoin(o, a, ctx, "#FF0000", 8);

  pointdisp(o, ctx, 2, "#000000", "#000", "", "", "");

  pointjoin(a, b, ctx, "#00FF00", 8);

  pointdisp(a, ctx, 8, "#00FFCC", "#00FFCC", "", "", "");

  pointdisp(b, ctx, 5, "#000000", "#003366", "", "", "");

  drawrem(ctx);

  // slider element
  ctx.globalAlpha = 0.7;
  drawrect(b, 50, 20, 10, ctx, "#808080", "#808080", 1);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#000";
  ctx.strokeText("B", b.xcoord - 3, b.ycoord + 3);
  ctx.strokeText("A", a.xcoord - 3, a.ycoord + 3);
  ctx.save();
  ctx.translate(0.75, 0.75);
  ctx.font = "12px 'Comic Sans MS'";
  ctx.fillStyle = "#000";
  if (scaleV >= 1) ctx.fillText("Scale = 1:" + scaleV, 225, 165);
  if (scaleV < 1) ctx.fillText("Scale = " + 1 / scaleV + ":1", 225, 165);
  ctx.restore();
  drawvel(ctx);


}
function drawvel(context) {
  //Velocity Diagram
  vo = pointtrans(vo, transV);
  va = pointtrans(va, transV);
  vba = pointtrans(vba, transV);
  vb = pointtrans(vb, transV);

  pointjoin(vo, va, ctx, "#FF0000", 2);
  drawArrow(
    va.xcoord,
    va.ycoord,
    ctx,
    180 - theta2 - rotstatus * 90,
    15,
    30,
    "#FF0000"
  );

  pointjoin(va, vba, ctx, "#00FF00", 2);
  drawArrow(
    vba.xcoord,
    vba.ycoord,
    ctx,
    180 + phi + signof(velba) * 90,
    15,
    30,
    "#00FF00"
  );

  pointjoin(vo, vb, ctx, "#000000", 2);
  drawArrow(
    vb.xcoord,
    vb.ycoord,
    ctx,
    90 - signof(velb) * 90,
    15,
    30,
    "#000000"
  );

  (Va.xcoord = (va.xcoord + vo.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Va.ycoord = (va.ycoord + vo.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Va, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Vb.xcoord = (vo.xcoord + vb.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vb.ycoord = (vo.ycoord + vb.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vb, ctx, 2, "blue", "white", "black", "12px", "12px");

  (Vba.xcoord = (va.xcoord + vba.xcoord) / 2), // Calculate the midpoint along the x-axis
    (Vba.ycoord = (va.ycoord + vba.ycoord) / 2); // Calculate the midpoint along the y-axis
  pointdisp(Vba, ctx, 2, "blue", "white", "black", "12px", "12px");
}

function drawrem(context) {
  // positioning dimension display
  if (theta2 % 360 <= 180) offset = -45;
  else offset = 20;

  // dimension line
  context.save();
  context.moveTo(o.xcoord, o.ycoord - offset);
  context.lineWidth = 3;
  context.strokeStyle = "#000000";
  context.lineTo(b.xcoord, o.ycoord - offset);
  context.moveTo(o.xcoord, o.ycoord - offset + 5);
  context.lineTo(o.xcoord, o.ycoord - offset - 5);
  context.moveTo(b.xcoord, o.ycoord - offset + 5);
  context.lineTo(b.xcoord, o.ycoord - offset - 5);
  context.stroke();

  // arrows at dimension
  drawArrow(
    b.xcoord,
    b.ycoord - offset,
    context,
    180,
    15,
    30,
    "#000",
    "",
    "#000"
  );
  drawArrow(
    o.xcoord,
    o.ycoord - offset,
    context,
    0,
    15,
    30,
    "#000",
    "",
    "#000"
  );

  // Position Analysis Title
  context.save();
  ctx.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = "15px 'Nunito', 'sans-serif'";
  context.fillStyle = "#000000";
  context.fillText("Position Diagram", 225, 15);
  context.restore();
  ctx.save();
  ctx.translate(0.5, 0.5);
  context.lineWidth = 1;
  context.font = "15px 'Nunito', 'sans-serif'";
  context.fillStyle = "#000000";
  context.fillText("Velocity Diagram", 225, 150);
  context.restore();
  // r, l, d display
  context.save();
  context.lineWidth = 1;
  context.fillStyle = "#000000";
  context.font = "12px Arial";
  context.fillText("d", (o.xcoord + b.xcoord) / 2, o.ycoord - offset - 10);
  context.fillText(
    "r",
    (o.xcoord + a.xcoord) / 2 - 1,
    (o.ycoord + a.ycoord) / 2 + 1
  );
  context.fillText(
    "l",
    (a.xcoord + b.xcoord) / 2 - 1,
    (a.ycoord + b.ycoord) / 2 + 3
  );
  context.restore();
}


function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";

    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
  }
}
