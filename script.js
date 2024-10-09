const cards = document.querySelectorAll('.card');
const starField = document.querySelector('.star-field');
const twinklingStars = document.querySelector('.twinkling-stars');
const numStars = 100;

function handleCardMovement(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ratioX = (x / rect.width) * 2 - 1;
    const ratioY = (y / rect.height) * 2 - 1;

    card.style.setProperty('--ratio-x', ratioX);
    card.style.setProperty('--ratio-y', ratioY);
}

function resetCardPosition(e) {
    const card = e.currentTarget;
    card.style.setProperty('--ratio-x', 0);
    card.style.setProperty('--ratio-y', 0);
}

cards.forEach(card => {
    card.addEventListener('mousemove', handleCardMovement);
    card.addEventListener('mouseleave', resetCardPosition);
});

function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const size = Math.random() * 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 2;

    Object.assign(star.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}vw`,
        top: `${y}vh`,
        animationDelay: `${delay}s`
    });
    
    return star;
}

function populateStarField() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numStars; i++) {
        fragment.appendChild(createStar());
    }
    twinklingStars.appendChild(fragment);
}
// Función para mostrar las estrellas fugaces después de 2.6 segundos
function showShootingStars() {
    setTimeout(() => {
        starField.classList.add('visible');
    }, 2460);
}

// Llamar a las funciones cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    populateStarField();
    showShootingStars();
});
