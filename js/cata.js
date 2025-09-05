// script.js

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageUrl = this.querySelector('img').src;
            const imageAlt = this.querySelector('img').alt;
            const title = this.querySelector('.overlay h3').textContent;
            const description = this.querySelector('.overlay p') ? this.querySelector('.overlay p').textContent : '';

            // Créer la structure de la lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-button">&times;</span>
                    <img src="${imageUrl}" alt="${imageAlt}">
                    <div class="caption">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;

            // Ajouter la lightbox au DOM et appliquer les styles pour l'afficher
            body.appendChild(lightbox);
            body.style.overflow = 'hidden'; // Empêche le scroll pendant la lightbox

            // Gestion de la fermeture
            const closeButton = lightbox.querySelector('.close-button');
            closeButton.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                // Fermer si on clique en dehors du contenu de la lightbox
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Fermer avec la touche Échap
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.remove();
            body.style.overflow = ''; // Rétablit le scroll
        }
    }
});

// Script pour gérer la lecture audio
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const toggleButton = document.getElementById('toggle-music');
    
    // Essayer de jouer la musique automatiquement
    const playAudio = () => {
        audio.play().then(() => {
            // Si la lecture réussit
            toggleButton.textContent = '🔊 Son activé';
            toggleButton.classList.add('playing');
        }).catch(error => {
            // Si la lecture automatique est bloquée
            console.log('Lecture automatique bloquée:', error);
            toggleButton.textContent = '▶️ Activer le son';
        });
    };
    
    // Démarrer la lecture
    playAudio();
    
    // Gérer le clic sur le bouton
    toggleButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            toggleButton.textContent = '🔊 Son activé';
            toggleButton.classList.add('playing');
        } else {
            audio.pause();
            toggleButton.textContent = '🔇 Son désactivé';
            toggleButton.classList.remove('playing');
        }
    });
    
    // Gestion de la fin de la musique (pour la remise en boucle)
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        audio.play();
    });
});