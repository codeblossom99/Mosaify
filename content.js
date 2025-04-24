let selectedAreas = [];

decodeURIComponent.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('dblclick', (e) => {
        e.preventDefault();
        createSelectionBox(e);
    });
});

function createSelectionBox(e){
    // 建立選擇框
    const selectionBox = document.createElement('div');
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px dashed rgba(0, 0, 255, 0.5)';
    selectionBox.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
    document.body.appendChild(selectionBox);

    let startX = e.clientX;
    let startY = e.clientY;

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';

    // 拖拉選擇框
    function onMouseMove(event) {
        const width = event.clientX - startX;
        const height = event.clientY - startY;

        selectionBox.style.width = `${Math.abs(width)}px`;
        selectionBox.style.height = `${Math.abs(height)}px`;

        if (width < 0) selectionBox.style.left = `${event.clientX}px`;
        if (height < 0) selectionBox.style.top = `${event.clientY}px`;
    }

    // 結束選擇
    function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // 確定選擇框大小並加入以選區域
        const area = {
            x: parseInt(selectionBox.style.left),
            y: parseInt(selectionBox.style.top),
            width: parseInt(selectionBox.style.width),
            height: parseInt(selectionBox.style.height)
        };

        selectedAreas.push(area);
        applyMosaic(area);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function applyMosaic(area) {
    // 在選擇的區域應用模糊效果
    const mosaic = document.createElement('div');
    mosaic.style.position = 'absolute';
    mosaic.style.left = `${area.x}px`;
    mosaic.style.top = `${area.y}px`;
    mosaic.style.width = `${area.width}px`;
    mosaic.style.height = `${area.height}px`;
    mosaic.style.background = 'url(data:image/png;base64,...)';  // 這裡應該是模糊圖像
    mosaic.style.filter = 'blur(5px)';
    document.body.appendChild(mosaic);
}