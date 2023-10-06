m = document.getElementById("life").getContext("2d");

/*Slider Nb Bleu*/
inputNbB = document.querySelector(".nombreBleu");
numberNbB = document.querySelector(".nbBleu");
nbB = 0;
inputNbB.addEventListener("input", () => {
  numberNbB.textContent = inputNbB.value;
  nbB = inputSBR.value;
});

/*Slider Blue X Red*/
inputSBR = document.querySelector(".slider_blueXred");
numberBR = document.querySelector(".displayBR");
Coef_BR = 0;
inputSBR.addEventListener("input", () => {
  numberBR.textContent = inputSBR.value / 100;
  Coef_BR = inputSBR.value / 100;
});

/*Slider Red X Yellow*/
inputSRY = document.querySelector(".slider_redXyellow");
numberRY = document.querySelector(".displayRY");
Coef_RY = 0;
inputSRY.addEventListener("input", () => {
  numberRY.textContent = inputSRY.value / 100;
  Coef_RY = inputSRY.value / 100;
});

/*Slider Yellow X Blue*/
inputSYB = document.querySelector(".slider_yellowXblue");
numberYB = document.querySelector(".displayYB");
Coef_YB = 0;
inputSYB.addEventListener("input", () => {
  numberYB.textContent = inputSYB.value / 100;
  Coef_YB = inputSYB.value / 100;
});

/*Slider Blue X Blue*/
inputSBB = document.querySelector(".slider_blueXblue");
numberBB = document.querySelector(".displayBB");
Coef_BB = 0;
inputSBB.addEventListener("input", () => {
  numberBB.textContent = inputSBB.value / 100;
  Coef_BB = inputSBB.value / 100;
});

/*Slider Red X Red*/
inputSRR = document.querySelector(".slider_redXred");
numberRR = document.querySelector(".displayRR");
Coef_RR = 0;
inputSRR.addEventListener("input", () => {
  numberRR.textContent = inputSRR.value / 100;
  Coef_RR = inputSRR.value / 100;
});

/*Slider Yellow X Yellow*/
inputSYY = document.querySelector(".slider_yellowXyellow");
numberYY = document.querySelector(".displayYY");
Coef_YY = 0;
inputSYY.addEventListener("input", () => {
  numberYY.textContent = inputSYY.value / 100;
  Coef_YY = inputSYY.value / 100;
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

create = (number, color) => {
  group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

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
blue = create(500, "blue");
yellow = create(500, "yellow");
red = create(500, "red");

update = () => {
  rule(blue, blue, Coef_BB);

  rule(red, red, Coef_RR);

  rule(yellow, yellow, Coef_YY);

  /*rule(red,blue,10)*/

  rule(blue, red, Coef_BR);

  rule(red, yellow, Coef_RY);

  rule(yellow, blue, Coef_YB);

  m.clearRect(0, 0, 1000, 1000);
  draw(0, 0, "black", 1000);
  for (i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
};
update();