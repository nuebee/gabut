document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("fireworksCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var noBtn = document.getElementById("noBtn");
    var yesBtn = document.getElementById("yesBtn");
    var resultText = document.getElementById("resultText");
  
    // Fungsi untuk memindahkan tombol "TIDAK" ke posisi acak saat mouseover
    function moveNoButton() {
      var maxX = window.innerWidth - noBtn.offsetWidth;
      var maxY = window.innerHeight - noBtn.offsetHeight;
      var randomX = Math.floor(Math.random() * maxX);
      var randomY = Math.floor(Math.random() * maxY);
      noBtn.style.left = randomX + "px";
      noBtn.style.top = randomY + "px";
    }
    noBtn.addEventListener("mouseover", moveNoButton);
  
    // Variabel untuk menyimpan partikel kembang api
    var particles = [];
    function createFirework(x, y) {
      var numParticles = 100; // jumlah partikel per ledakan ditingkatkan
      for (var i = 0; i < numParticles; i++) {
        particles.push({
          x: x,
          y: y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          radius: Math.random() * 3 + 1,
          color: "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)",
          life: 100,
          decay: Math.random() * 0.05 + 0.01
        });
      }
    }
  
    function animateFireworks() {
      // Efek fade-out agar partikel terlihat smooth
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      requestAnimationFrame(animateFireworks);
    }
  
    // Tangani klik pada tombol "IYA"
    yesBtn.addEventListener("click", function() {
      // Sembunyikan kedua tombol
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
      
      // Tampilkan teks "BAGUS"
      resultText.style.display = "block";
      
      // Buat firework pertama di tengah tombol IYA
      var rect = this.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      createFirework(centerX, centerY);
      
      // Mulai animasi kembang api
      animateFireworks();
  
      // Tambahkan interval untuk membuat tambahan ledakan kembang api secara random selama 3 detik
      var fireworkInterval = setInterval(function() {
        var randomX = Math.random() * canvas.width;
        var randomY = Math.random() * canvas.height;
        createFirework(randomX, randomY);
      }, 300);
      
      // Hentikan interval setelah 3 detik
      setTimeout(function(){
        clearInterval(fireworkInterval);
      }, 3000);
    });
  
    // Sesuaikan ukuran canvas jika jendela di-resize
    window.addEventListener("resize", function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });
  