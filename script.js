const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posición X del mouse en la tarjeta
        const y = e.clientY - rect.top; // Posición Y del mouse en la tarjeta

        // Normalizamos las posiciones de X e Y
        const ratioX = (x / rect.width) * 2 - 1; // Valor entre -1 y 1
        const ratioY = (y / rect.height) * 2 - 1; // Valor entre -1 y 1

        // Actualiza las variables CSS para la rotación
        card.style.setProperty('--ratio-x', ratioX);
        card.style.setProperty('--ratio-y', ratioY); // No invertir Y para rotación correcta
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--ratio-x', 0); // Resetea la rotación al salir
        card.style.setProperty('--ratio-y', 0);
    });
});