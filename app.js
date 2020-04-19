function initProgressBar() {
  const player = document.getElementById('player');
  const length = parseFloat(player.duration);
  const currentTime = player.currentTime;
  // console.log(length);
  // console.log(currentTime);

  // Calculate length total value
  let totalLength = calculateTotalLength(length);
  document.getElementById('end-time').innerText = totalLength;

  // Calculate current value
  let currentValue = calculateCurrentValue(currentTime);
  document.getElementById('start-time').innerText = currentValue;

  let progressBar = document.getElementById('seek-obj');
  progressBar.value = parseFloat(currentTime / length);
  progressBar.addEventListener('click', event => {
    let percent = (event.offsetX / progressBar.offsetWidth);
    player.currentTime = percent * player.duration;
    progressBar.value = percent / 100
  });

  if (currentTime === length) {
    document.getElementById('play-btn').className == '';
  }

}

function initPlayer(num) {
  // num if there're multiple player

  // Audio embed object
  const playerContainer = document.getElementById('player-container');
  const player = document.getElementById('player');
  const playBtn = document.getElementById('play-btn');
  let isPlaying = false;

  for (let i=0; i < num; i++) {

    // Controls Listener
    if (playBtn != null) {
      playBtn.addEventListener('click', () => togglePlay());
    }

    // Controls sounds and method
    let togglePlay = () => {
      if (!player.paused) {
        player.pause();
        isPlaying = false;
        document.getElementById('play-btn').className = "";
      } else {
        player.play();
        isPlaying = true;
        document.getElementById('play-btn').className = "pause";
      }
    }
  };
}

function calculateTotalLength(length) {
  const minutes = Math.floor(length / 60);
  const secondsInt = length - minutes * 60;
  const secondsStr = secondsInt.toString();
  const seconds = secondsStr.substr(0, 2);
  const time = `${minutes}:${seconds}`;

  return time;
}

function calculateCurrentValue(current_time) {
  const currentHour = parseFloat(current_time / 3600) % 24;
  const currentMinute = parseInt(current_time / 60) % 60;
  const currentSecondsLong = current_time % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTime = (currentMinute < 10 ? "0" + currentMinute : currentMinute) + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);

  return currentTime;
}

initPlayer(document.querySelectorAll('#player-container').length)
