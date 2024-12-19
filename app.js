"use strict"; // Active le mode strict pour renforcer la sécurité et éviter les erreurs silencieuses

// Sélection des éléments HTML nécessaires
const upload = document.getElementById('upload'); // Champ de téléchargement pour les fichiers
const canvas = document.getElementById('canvas'); // Élément canevas pour dessiner l'image
const ctx = canvas.getContext('2d'); // Contexte 2D pour dessiner sur le canevas
const horizontalCasesInput = document.getElementById('horizontalCases'); // Champ pour le nombre de cases horizontales
const verticalCasesInput = document.getElementById('verticalCases'); // Champ pour le nombre de cases verticales
const colorInput = document.getElementById('color'); // Champ pour sélectionner la couleur du cadrillage
const thicknessInput = document.getElementById('thickness'); // Champ pour définir l'épaisseur des lignes
const downloadBtn = document.getElementById('download'); // Bouton pour télécharger l'image avec le cadrillage

let img = new Image(); // Crée un nouvel objet image

// Fonction pour charger l'image sélectionnée
upload.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Récupère le premier fichier sélectionné
  if (file) {
    const reader = new FileReader(); // Crée un objet FileReader pour lire le fichier
    reader.onload = (e) => {
      img.src = e.target.result; // Définit la source de l'image à l'URL du fichier
    };
    reader.readAsDataURL(file); // Lit le fichier comme une URL de données
  }
});

// Lorsque l'image est chargée, elle est dessinée sur le canevas
img.onload = () => {
  canvas.width = img.width; // Ajuste la largeur du canevas à celle de l'image
  canvas.height = img.height; // Ajuste la hauteur du canevas à celle de l'image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Dessine l'image sur le canevas
  drawGrid(); // Ajoute le cadrillage après avoir chargé l'image
};

// Fonction pour dessiner le cadrillage
function drawGrid() {
  const horizontalCases = parseInt(horizontalCasesInput.value); // Nombre de cases horizontales
  const verticalCases = parseInt(verticalCasesInput.value); // Nombre de cases verticales
  const color = colorInput.value; // Couleur des lignes
  const thickness = parseInt(thicknessInput.value); // Épaisseur des lignes

  const cellWidth = canvas.width / horizontalCases; // Largeur d'une cellule
  const cellHeight = canvas.height / verticalCases; // Hauteur d'une cellule

  // Redessiner l'image pour éviter que les grilles ne s'accumulent
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Configurer les propriétés du dessin
  ctx.strokeStyle = color; // Définir la couleur des lignes
  ctx.lineWidth = thickness; // Définir l'épaisseur des lignes

  // Dessiner les lignes verticales
  for (let i = 1; i < horizontalCases; i++) {
    const x = i * cellWidth; // Position x de la ligne
    ctx.beginPath(); // Commence un nouveau tracé
    ctx.moveTo(x, 0); // Début de la ligne
    ctx.lineTo(x, canvas.height); // Fin de la ligne
    ctx.stroke(); // Dessine la ligne
  }

  // Dessiner les lignes horizontales
  for (let i = 1; i < verticalCases; i++) {
    const y = i * cellHeight; // Position y de la ligne
    ctx.beginPath(); // Commence un nouveau tracé
    ctx.moveTo(0, y); // Début de la ligne
    ctx.lineTo(canvas.width, y); // Fin de la ligne
    ctx.stroke(); // Dessine la ligne
  }
}

// Mettre à jour le cadrillage lorsque l'utilisateur modifie les paramètres
horizontalCasesInput.addEventListener('input', drawGrid); // Redessine lors d'un changement de cases horizontales
verticalCasesInput.addEventListener('input', drawGrid); // Redessine lors d'un changement de cases verticales
colorInput.addEventListener('input', drawGrid); // Redessine lors d'un changement de couleur
thicknessInput.addEventListener('input', drawGrid); // Redessine lors d'un changement d'épaisseur

// Fonction pour télécharger l'image avec le cadrillage
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a'); // Crée un élément <a>
  link.download = 'image_with_grid.png'; // Définit le nom du fichier à télécharger
  link.href = canvas.toDataURL(); // Convertit le contenu du canevas en URL de données
  link.click(); // Simule un clic pour déclencher le téléchargement
});
