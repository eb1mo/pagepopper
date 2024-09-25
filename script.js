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
  } else if (animationType === "random") {
    launchRandomDir();
  } else if (animationType === "realistic") {
    launchRealisticBurst();
  } else if (animationType === "snowfall") {
    launchSnowfall();
  } else if (animationType === "fireworks") {
    launchFireworks();
  } else if (animationType === "stream") {
    launchContinuousStream();
  } else if (animationType === "hearts") {
    launchHearts();
  } else if (animationType === "stars") {
    launchStars();
  } else if (animationType === "unicorns") {
    launchUnicorns();
  } else if (animationType === "images") {
    launchImages();
  } else if (animationType === "customshapes") {
    launchCustomshapes();
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

function launchRandomDir() {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
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
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
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

function launchHearts() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
}

function launchStars() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function launchUnicorns() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ["emoji"],
      shapeOptions: {
        emoji: {
          value: ["🦄", "🌈"],
        },
      },
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function launchImages() {
  confetti({
    spread: 360,
    ticks: 200,
    gravity: 1,
    decay: 0.94,
    startVelocity: 30,
    particleCount: 100,
    scalar: 3,
    shapes: ["image"],
    shapeOptions: {
      image: [
        {
          src: "https://particles.js.org/images/fruits/apple.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/avocado.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/banana.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/berries.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/cherry.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/grapes.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/lemon.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/orange.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/peach.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/pear.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/pepper.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/plum.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/star.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/strawberry.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/watermelon.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://particles.js.org/images/fruits/watermelon_slice.png",
          width: 32,
          height: 32,
        },
      ],
    },
  });
}

function launchCustomshapes() {
  var defaults = {
    scalar: 2,
    spread: 270,
    particleCount: 25,
    origin: { y: 0.4 },
    startVelocity: 35,
  };

  confetti({
    ...defaults,
    shapes: ["image"],
    shapeOptions: {
      image: {
        src: "https://particles.js.org/images/pumpkin.svg",
        replaceColor: true,
        width: 32,
        height: 40,
      },
    },
    colors: ["#ff9a00", "#ff7400", "#ff4d00"],
  });
  confetti({
    ...defaults,
    shapes: ["image"],
    shapeOptions: {
      image: {
        src: "https://particles.js.org/images/pine-tree.svg",
        replaceColor: true,
        width: 271,
        height: 351.5,
      },
    },
    colors: ["#8d960f", "#be0f10", "#445404"],
  });
  confetti({
    ...defaults,
    shapes: ["heart"],
    colors: ["#f93963", "#a10864", "#ee0b93"],
  });
}
