class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    create() {
        // Create graphics object for minimap
        this.minimapGraphics = this.add.graphics();
        this.actions = [
            { icon: 'bullet', hotkey: 'Q' },
            { icon: 'ping', hotkey: 'W' },
            // Add more actions as needed
        ];
    }

    renderHotbar(actions) {
        const barWidth = 600;
        const barHeight = 100;
        const barX = (this.cameras.main.width - barWidth) / 2;
        const barY = this.cameras.main.height - barHeight - 20;

        const iconSize = 64; // Size of the icons
        const spacing = (barWidth - iconSize * actions.length) / (actions.length + 1);

        actions.forEach((action, index) => {
            const iconX = barX + spacing + index * (iconSize + spacing);
            const iconY = barY + (barHeight - iconSize) / 2;

            // Render the action icon
            this.add.image(iconX, iconY, action.icon).setDisplaySize(iconSize, iconSize);

            // Draw a white square around the action icon
            this.add.rectangle(iconX, iconY, iconSize, iconSize).setStrokeStyle(2, 0xffffff);

            // Render the hotkey text centered under the icon
            this.add.text(iconX, iconY + iconSize / 2 + 10, action.hotkey, {
                fontSize: '24px',
                fill: '#ffffff'
            }).setOrigin(0.5, 0);
        });
    }

    renderMinimap(ships) {
        this.renderHotbar(this.actions);
        // console.log("Ships in scene: ", ships);

        const borderSize = 4;    // Size of the border

        // Get the camera view width and height
        const cameraWidth = this.cameras.main.width;
        const cameraHeight = this.cameras.main.height;

        const aspectRatio = cameraWidth / cameraHeight;
        const minimapHeight = 100; // Size of the minimap
        const minimapWidth = minimapHeight * aspectRatio; // Size of the minimap

        const startX = cameraWidth - minimapWidth - borderSize;
        const startY = 0;

        // Clear the previous minimap rendering
        this.minimapGraphics.clear();

        // Draw the black square with a white border
        this.minimapGraphics.lineStyle(borderSize, 0xffffff); // White border
        this.minimapGraphics.fillStyle(0x000000, 1);          // Black background
        this.minimapGraphics.strokeRect(startX, startY, minimapWidth, minimapHeight);
        this.minimapGraphics.fillRect(startX, startY, minimapWidth, minimapHeight);

        // Draw the blue dot representing the player in the center of the minimap
        const centerX = startX + minimapWidth / 2 + borderSize;
        const centerY = startY + minimapHeight / 2 + borderSize;
        this.minimapGraphics.fillCircle(centerX, centerY, 5);

        ships.forEach((ship) => {
          const shipX = Math.floor((ship.x / 2000) * minimapWidth) + startX;
          const shipY = Math.floor((ship.y / 2000) * minimapHeight) + startY;
          if (ship.team == 'ally') {
            this.minimapGraphics.fillStyle(0x8888ff, 1); // Blue color
          } else {
            this.minimapGraphics.fillStyle(0xff0000, 1); // Red color
          }
          this.minimapGraphics.fillCircle(shipX, shipY, 5);
        });
    }
}
