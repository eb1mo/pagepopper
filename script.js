let countdown;
let timeLeft;
let isPaused = false;

function startTimer() {
  const websiteUrl = document.getElementById("websiteUrl").value;
  const timerInput = document.getElementById("timerInput").value;

  if (!websiteUrl) {
    alert("Please enter a valid URL.");
    return;
  }

  timeLeft = parseInt(timerInput) || 60;
  document.getElementById("countdown").innerText = timeLeft;
  document.getElementById("countdown").style.opacity = "1";
  document.getElementById("pauseButton").style.display = "inline-block"; // Show the pause button

  countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!isPaused) {
    timeLeft--;
    document.getElementById("countdown").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      openWebsite();
      playConfettiAnimation(); // Play selected confetti animation
      hideInputSection(); // Hide input and countdown
    }
  }
}

function openWebsite() {
  const websiteUrl = document.getElementById("websiteUrl").value;
  const iframe = document.getElementById("websiteFrame");
  iframe.src = websiteUrl;
  iframe.style.display = "block"; // Show the iframe
}

function hideInputSection() {
  const inputSection = document.querySelector(".hero-section");
  inputSection.style.opacity = "0";
  setTimeout(() => {
    inputSection.style.display = "none";
  }, 500); // Smooth transition before hiding
}

function pauseTimer() {
  const pauseButton = document.getElementById("pauseButton");
  if (isPaused) {
    isPaused = false;
    pauseButton.innerText = "Pause";
  } else {
    isPaused = true;
    pauseButton.innerText = "Resume";
  }
}

function playConfettiAnimation() {
  const animationType = document.getElementById("animationType").value;

  if (animationType === "basic") {
    launchBasicBurst();
  } else if (animationType === "realistic") {
    launchRealisticBurst();
  } else if (animationType === "snowfall") {
    launchSnowfall();
  } else if (animationType === "fireworks") {
    launchFireworks();
  } else if (animationType === "stream") {
    launchContinuousStream();
  }
}

// Confetti Animations
function launchBasicBurst() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function launchRealisticBurst() {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


function launchSnowfall() {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration;

  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    const timeLeft = animationEnd - Date.now(),
      ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["circle"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}

function launchFireworks() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  function frame() {
    confetti({
      particleCount: 50,
      spread: 160,
      origin: { y: Math.random() },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}

function launchContinuousStream() {
  const duration = 15 * 1000; // Continuous for 15 seconds
  const end = Date.now() + duration;

  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}
