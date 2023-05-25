    export function splitImage(imageUrl: string) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const tileSize = Math.floor(image.width / 3);
    
          const tiles = [];
    
          for (let i = 0; i < 9; i++) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            canvas.width = tileSize;
            canvas.height = tileSize;
            if(context) {context.drawImage(image, col * tileSize, row * tileSize, tileSize, tileSize, 0, 0, tileSize, tileSize);}  
            const tileImage = canvas.toDataURL(); // Converte para data URL
            const tile = {
              id: i, // Identificador único do Tile
              image: tileImage // Imagem dividida do Tile
            };
            tiles.push(tile);
          }
    
          resolve(tiles);
        };
    
        image.onerror = reject;
        image.src = imageUrl;
      });
    }
