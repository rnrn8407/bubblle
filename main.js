const circleCount = 50;
const circles = [];

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = Math.random() * 50 + 10;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * (window.innerWidth - size)}px`;
    circle.style.top = `${Math.random() * (window.innerHeight - size)}px`;
    circle.speedX = (Math.random() - 0.5) * 2;
    circle.speedY = (Math.random() - 0.5) * 2;
    document.body.appendChild(circle);
    return circle;
}

function moveCircles() {
    circles.forEach(circle => {
        let x = parseFloat(circle.style.left);
        let y = parseFloat(circle.style.top);
        let size = parseFloat(circle.style.width);

        x += circle.speedX;
        y += circle.speedY;

        if (x <= 0 || x + size >= window.innerWidth) {
            circle.speedX *= -1;
            x = Math.max(0, Math.min(x, window.innerWidth - size));
        }
        if (y <= 0 || y + size >= window.innerHeight) {
            circle.speedY *= -1;
            y = Math.max(0, Math.min(y, window.innerHeight - size));
        }

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
    });
    requestAnimationFrame(moveCircles);
}

function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    circles.forEach(circle => {
        const rect = circle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const scale = 1 + (1 - distance / maxDistance);
            circle.style.transform = `scale(${scale})`;
        } else {
            circle.style.transform = 'scale(1)';
        }
    });
}

function init() {
    for (let i = 0; i < circleCount; i++) {
        circles.push(createCircle());
    }
    moveCircles();
    document.addEventListener('mousemove', handleMouseMove);
}

window.addEventListener('load', init);