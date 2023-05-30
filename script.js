function sketch() {
	const container = document.querySelector('.container');
	const clearBtn = document.querySelector('#clear');
	const rainbowMode = document.querySelector('#random-colors');
	const defaultColor = document.querySelector('#default');
	const sizeSlider = document.querySelector('.size-slider');
	const barLabel = document.querySelector('.bar-label');

	const gridSizeOptions = [
		{ size: 16, label: '16x16' },
		{ size: 32, label: '32x32' },
		{ size: 48, label: '48x48' },
		{ size: 64, label: '64x64' },
		{ size: 80, label: '80x80' },
		{ size: 96, label: '96x96' },
	];

	let gridSize = gridSizeOptions[0].size; // Varsayılan grid boyutu

	sizeSlider.addEventListener('input', function () {
		const selectedSize = parseInt(this.value) - 1;
		gridSize = gridSizeOptions[selectedSize].size;
		barLabel.textContent = `Grid Size: ${gridSizeOptions[selectedSize].label}`;
		createGrid(gridSize);
	});

	createGrid(gridSize);

	function createGrid(size) {
		clearGrid();

		// Kare boyutunu hesapla
		const squareSize = Math.floor((640 * 1000) / size) / 1000;

		container.style.gridTemplateColumns = `repeat(${size}, ${squareSize}px)`;
		container.style.gridTemplateRows = `repeat(${size}, ${squareSize}px)`;

		for (let i = 0; i < size * size; i++) {
			const square = createSquare(squareSize);
			container.appendChild(square);
		}
	}

	function createSquare(squareSize) {
		const square = document.createElement('div');
		square.classList.add('square');
		square.style.width = `${squareSize}px`;
		square.style.height = `${squareSize}px`;

		square.addEventListener('mousedown', startDrawing);
		square.addEventListener('mouseup', stopDrawing);
		square.addEventListener('mousemove', continueDrawing);

		return square;
	}

	let isDrawing = false;

	function startDrawing() {
		isDrawing = true;
		drawSquare(this);
	}

	function stopDrawing() {
		isDrawing = false;
	}

	function continueDrawing() {
		if (isDrawing) {
			drawSquare(this);
		}
	}

	function drawSquare(square) {
		if (defaultColor.classList.contains('active')) {
			square.style.backgroundColor = 'black';
		} else if (rainbowMode.classList.contains('active')) {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);
			square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
		}
	}

	clearBtn.addEventListener('click', function () {
		createGrid(gridSize);
	});

	function clearGrid() {
		container.innerHTML = '';
	}

	defaultColor.addEventListener('click', setDefaultColor);

	rainbowMode.addEventListener('click', setRainbowMode);

	function setDefaultColor() {
		removeActiveClass();
		defaultColor.classList.add('active');
	}

	function setRainbowMode() {
		removeActiveClass();
		rainbowMode.classList.add('active');
	}

	function removeActiveClass() {
		const buttons = [defaultColor, rainbowMode];
		buttons.forEach((button) => button.classList.remove('active'));
	}

	sizeSlider.addEventListener('input', function () {
		const selectedSize = parseInt(this.value) - 1;
		gridSize = gridSizeOptions[selectedSize].size;
		barLabel.textContent = `Grid Size: ${gridSizeOptions[selectedSize].label}`;
		createGrid(gridSize);
	});
}

sketch();
