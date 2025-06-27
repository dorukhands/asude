window.addEventListener("load", () => {
    const splash = document.getElementById("splash-screen");
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    // Canvas boyutları
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Konfeti parçacıkları
    const confettiCount = 100;
    const confetti = [];

    class Confetto {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = 5 + Math.random() * 8;
            this.speed = 1 + Math.random() * 3;
            this.angle = Math.random() * 360;
            this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        }
        update() {
            this.y += this.speed;
            this.angle += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.angle * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetto());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((c) => {
            c.update();
            c.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // 3 saniye sonra splash ekranı gizle
    setTimeout(() => {
        splash.style.transition = "opacity 0.6s ease";
        splash.style.opacity = 0;
        setTimeout(() => {
            splash.style.display = "none";
        }, 600);
    }, 3000);
});
