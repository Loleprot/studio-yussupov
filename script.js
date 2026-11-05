function addTag(tagText) {
    const messageInput = document.getElementById('message');
    if (messageInput.value.includes(tagText)) return;
    
    if (messageInput.value.trim() === '') {
        messageInput.value = tagText;
    } else {
        messageInput.value += ', ' + tagText;
    }
    messageInput.focus();
}

document.querySelectorAll('.tariff-chip input').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.tariff-chip').forEach(c => c.classList.remove('active'));
        this.closest('.tariff-chip').classList.add('active');
    });
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Замени на свой WhatsApp номер (начиная с 7, без +)
    const phoneNumber = '77070000000'; 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const selectedTariff = document.querySelector('input[name="tariff"]:checked').value;

    let text = `Здравствуйте! Меня зовут ${name}.\n\n`;
    text += `🎯 Выбранный тариф: *${selectedTariff}*\n`;
    text += `📱 Мой номер: ${phone}\n`;
    if (message) {
        text += `💬 Детали проекта: ${message}\n`;
    }

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
});// ==========================================
// АНИМАЦИЯ НЕЙРОНОВ И ПЕРЕДАЧИ ИМПУЛЬСОВ
// ==========================================
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Подстраиваем размер при изменении экрана
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Мышь для взаимодействия
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Класс одного нейрона (точки)
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 2 + 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Отскок от границ
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
        ctx.fillStyle = 'rgba(165, 180, 252, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Создаем сеть нейронов
function initParticles() {
    particlesArray = [];
    let numberOfParticles = Math.floor((width * height) / 12000); // Количество зависит от экрана
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Рисуем связи и передачу импульсов информации
function animateNeuralNetwork() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Соединяем нейроны линиями (передача информации)
        for (let j = i + 1; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                let opacity = 1 - (distance / 130);
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.35})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        // Взаимодействие с курсором мыши
        if (mouse.x !== null && mouse.y !== null) {
            let mdx = particlesArray[i].x - mouse.x;
            let mdy = particlesArray[i].y - mouse.y;
            let mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouse.radius) {
                ctx.strokeStyle = `rgba(236, 72, 153, ${1 - mdist / mouse.radius})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateNeuralNetwork);
}

initParticles();
animateNeuralNetwork();