"use trict";
    const upload = document.getElementById('upload');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const horizontalCasesInput = document.getElementById('horizontalCases');
    const verticalCasesInput = document.getElementById('verticalCases');
    const colorInput = document.getElementById('color');
    const thicknessInput = document.getElementById('thickness');
    const downloadBtn = document.getElementById('download');

    let img = new Image();

    // Fonction pour charger l'image sélectionnée
    upload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Lorsque l'image est chargée, elle est dessinée sur le canvas
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawGrid(); // Ajouter le cadrillage après que l'image soit chargée
    };

    // Fonction pour dessiner le cadrillage
    function drawGrid() {
      const horizontalCases = parseInt(horizontalCasesInput.value);
      const verticalCases = parseInt(verticalCasesInput.value);
      const color = colorInput.value;
      const thickness = parseInt(thicknessInput.value);

      const cellWidth = canvas.width / horizontalCases;
      const cellHeight = canvas.height / verticalCases;

      // Redessiner l'image pour éviter que les grilles ne s'empilent
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Configurer les propriétés du dessin
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;

      // Dessiner les lignes verticales
      for (let i = 1; i < horizontalCases; i++) {
        const x = i * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Dessiner les lignes horizontales
      for (let i = 1; i < verticalCases; i++) {
        const y = i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Mettre à jour le cadrillage lorsque l'utilisateur modifie les paramètres
    horizontalCasesInput.addEventListener('input', drawGrid);
    verticalCasesInput.addEventListener('input', drawGrid);
    colorInput.addEventListener('input', drawGrid);
    thicknessInput.addEventListener('input', drawGrid);

    // Fonction pour télécharger l'image avec le cadrillage
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'image_with_grid.png';
      link.href = canvas.toDataURL();
      link.click();
    });