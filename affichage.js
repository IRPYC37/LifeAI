m = document.getElementById("life").getContext("2d");

Coef_BB = 0;
Coef_BR = 0;
Coef_RR = 0;
Coef_RY = 0;
Coef_YB = 0;
Coef_YY = 0;
Coef_WW = 0;
Coef_WR = 0;
Coef_WB = 0;
Coef_WY = 0;

/*Vecteurs max entre les cellules*/
inputVA = document.querySelector(".maxVect");
inputVA.addEventListener("input", () => {
  vecteurMax = inputVA.value;
});

/*Generation des vecteurs aléatoires*/
inputPA = document.querySelector(".ParamAlea");
inputPA.addEventListener("click", () => {
  vecteurMax = inputVA.value;
  Coef_YY = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_BB = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_BR = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_YB = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_RR = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_RY = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_WW = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_WR = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_WB = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;
  Coef_WY = Math.random() * (vecteurMax - -vecteurMax) + -vecteurMax;

  numberBB.textContent = Coef_BB;
  numberBR.textContent = Coef_BR;
  numberRR.textContent = Coef_RR;
  numberRY.textContent = Coef_RY;
  numberYB.textContent = Coef_YB;
  numberYY.textContent = Coef_YY;
  numberWW.textContent = Coef_WW;
  numberWY.textContent = Coef_WY;
  numberWB.textContent = Coef_WB;
  numberWR.textContent = Coef_WR;

});

/*Slider Blue X Red*/
inputSBR = document.querySelector(".slider_blueXred");
numberBR = document.querySelector(".displayBR");
inputSBR.addEventListener("input", () => {
  numberBR.textContent = inputSBR.value;
  Coef_BR = inputSBR.value;
});

/*Slider Red X Yellow*/
inputSRY = document.querySelector(".slider_redXyellow");
numberRY = document.querySelector(".displayRY");
inputSRY.addEventListener("input", () => {
  numberRY.textContent = inputSRY.value;
  Coef_RY = inputSRY.value;
});

/*Slider Yellow X Blue*/
inputSYB = document.querySelector(".slider_yellowXblue");
numberYB = document.querySelector(".displayYB");
inputSYB.addEventListener("input", () => {
  numberYB.textContent = inputSYB.value;
  Coef_YB = inputSYB.value;
});

/*Slider Blue X Blue*/
inputSBB = document.querySelector(".slider_blueXblue");
numberBB = document.querySelector(".displayBB");
inputSBB.addEventListener("input", () => {
  numberBB.textContent = inputSBB.value;
  Coef_BB = inputSBB.value;
});

/*Slider Red X Red*/
inputSRR = document.querySelector(".slider_redXred");
numberRR = document.querySelector(".displayRR");
inputSRR.addEventListener("input", () => {
  numberRR.textContent = inputSRR.value;
  Coef_RR = inputSRR.value;
});

/*Slider Yellow X Yellow*/
inputSYY = document.querySelector(".slider_yellowXyellow");
numberYY = document.querySelector(".displayYY");
inputSYY.addEventListener("input", () => {
  numberYY.textContent = inputSYY.value;
  Coef_YY = inputSYY.value;
});

/*Slider White X White*/
inputSWW = document.querySelector(".slider_whiteXwhite");
numberWW = document.querySelector(".displayWW");
inputSWW.addEventListener("input", () => {
  numberWW.textContent = inputSWW.value;
  Coef_WW = inputSWW.value;
});

/*Slider White X Yellow*/
inputSWY = document.querySelector(".slider_whiteXyellow");
numberWY = document.querySelector(".displayWY");
inputSWY.addEventListener("input", () => {
  numberWY.textContent = inputSWY.value;
  Coef_WY = inputSWY.value;
});

/*Slider White X Blue*/
inputSWB = document.querySelector(".slider_whiteXblue");
numberWB = document.querySelector(".displayWB");
inputSWB.addEventListener("input", () => {
  numberWB.textContent = inputSWB.value;
  Coef_WB = inputSWB.value;
});

/*Slider White X Red*/
inputSWR = document.querySelector(".slider_whiteXred");
numberWR = document.querySelector(".displayWR");
inputSWR.addEventListener("input", () => {
  numberWR.textContent = inputSWR.value;
  Coef_WR = inputSWR.value;
});

draw = (x, y, c, s) => {
  m.fillStyle = c;
  m.fillRect(x, y, s, s);
};

particles = [];
particle = (x, y, c) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c };
};

random = () => {
  return Math.random() * 900 + 50;
};

/*Creer un groupe de cellules*/
create = (number, color) => {
  group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

/*Regles entre les cellules*/
rule = (particles1, particles2, g) => {
  for (let i = 0; i < particles1.length; i++) {
    fx = 0;
    fy = 0;
    for (let j = 0; j < particles2.length; j++) {
      a = particles1[i];
      b = particles2[j];
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0 && d < 125) {
        F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 || a.x >= 500) {
      a.vx *= -1;
    }
    if (a.y <= 0 || a.y >= 500) {
      a.vy *= -1;
    }
  }
};

/*Creation des cellules */
blue = create(100, "blue");
yellow = create(100, "yellow");
red = create(100, "red");
white = create(100, "white");

update = () => {
  rule(blue, blue, Coef_BB);
  rule(red, red, Coef_RR);
  rule(yellow, yellow, Coef_YY);
  rule(blue, red, Coef_BR);
  rule(red, yellow, Coef_RY);
  rule(yellow, blue, Coef_YB);

  rule(white, white, Coef_WW);
  rule(white, red, Coef_WR);
  rule(white, blue, Coef_WB);
  rule(white, yellow, Coef_WY);

  m.clearRect(0, 0, 1000, 1000);
  draw(0, 0, "black", 1000);
  for (i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
};
update();
