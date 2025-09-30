// เปิดไมค์เพื่อฟังเสียง
navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  microphone.connect(analyser);

  function detectBlow() {
    analyser.getByteFrequencyData(dataArray);
    let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

    if (volume > 50) { // ถ้าเสียงดังเหมือนเป่า
      document.querySelector(".flame").style.display = "none";
      document.getElementById("message").innerText = "ขอให้วันเกิดปีนี้เต็มไปด้วยรอยยิ้มน้า";
    } else {
      requestAnimationFrame(detectBlow);
    }
  }

  detectBlow();
}).catch(err => {
  alert("ไม่สามารถเปิดไมค์ได้: " + err);
});
