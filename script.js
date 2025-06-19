// script.js

// --------------- Funciones Auxiliares Generales ---------------

function getInputValue(id) {
    return document.getElementById(id).value;
}

function displayResult(outputId, errorId, message, isError = false) {
    const outputElement = document.getElementById(outputId);
    const errorElement = document.getElementById(errorId);
    
    if (isError) {
        outputElement.innerHTML = '';
        errorElement.innerHTML = `<p>${message}</p>`;
        errorElement.style.display = 'block';
    } else {
        outputElement.innerHTML = message;
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    }
}

// Función para alternar modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Guardar la preferencia del usuario en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}


// --------------- Lógica del Menú Hamburguesa y Toggle de Tema ---------------
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const darkModeToggle = document.getElementById('darkModeToggle'); // Nuevo: Referencia al checkbox del toggle

    // Lógica del menú hamburguesa
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('nav-open');
    });

    // Cierra el menú cuando se hace clic en un enlace de navegación
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('nav-open');
            }
        });
    });

    // Lógica del toggle de modo oscuro
    // Sincronizar el estado del toggle con el localStorage al cargar la página
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true; // Marca el checkbox si el modo oscuro está activado
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.checked = false; // Desmarca el checkbox
    }

    // Listener para el cambio del toggle
    darkModeToggle.addEventListener('change', toggleDarkMode);
});


// --------------- Factorial ---------------

function factorialConPasos(n) {
    const num = BigInt(n); 

    if (num < 0n) {
        return { total: 'Error: Número negativo', detalle: '' };
    }
    if (num === 0n || num === 1n) {
        return { total: 1n, detalle: '1' };
    }

    let resultado = 1n;
    let pasos = "";
    
    for (let i = num; i >= 1n; i--) {
        resultado *= i;
        pasos += (i !== 1n) ? i.toString() + "x" : i.toString();
    }
    
    return {
        total: resultado,
        detalle: pasos
    };
}

function calcularFactorial() {
    const input = document.getElementById("factorialNumero");
    const valor = parseInt(input.value);

    if (isNaN(valor) || valor < 0) {
        displayResult('factorialResultado', 'factorialError', "Por favor, ingresa un número entero no negativo válido.", true);
        return;
    }

    const { total, detalle } = factorialConPasos(valor);
    const resultHtml = `<p>${valor}! = ${detalle} = <strong>${total.toString()}</strong></p>`;
    displayResult('factorialResultado', 'factorialError', resultHtml);
}


// --------------- Conteo (Combinatoria) ---------------

function calcularPermutaciones() {
    const n = parseInt(getInputValue("permN"));
    const k = parseInt(getInputValue("permK"));

    if (isNaN(n) || isNaN(k) || n < 0 || k < 0) {
        displayResult('permutacionesResultado', 'permutacionesError', "Por favor, ingresa números enteros no negativos válidos.", true);
        return;
    }
    if (k > n) {
        displayResult('permutacionesResultado', 'permutacionesError', "k no puede ser mayor que n para permutaciones.", true);
        return;
    }

    const factN = factorialConPasos(n).total;
    const factNK = factorialConPasos(n - k).total;
    const resultado = factN / factNK;

    const resultHtml = `<p>P(${n}, ${k}) = <strong>${resultado.toString()}</strong></p>`;
    displayResult('permutacionesResultado', 'permutacionesError', resultHtml);
}

function calcularCombinaciones() {
    const n = parseInt(getInputValue("combN"));
    const k = parseInt(getInputValue("combK"));

    if (isNaN(n) || isNaN(k) || n < 0 || k < 0) {
        displayResult('combinacionesResultado', 'combinacionesError', "Por favor, ingresa números enteros no negativos válidos.", true);
        return;
    }
    if (k > n) {
        displayResult('combinacionesResultado', 'combinacionesError', "k no puede ser mayor que n para combinaciones.", true);
        return;
    }

    const factN = factorialConPasos(n).total;
    const factK = factorialConPasos(k).total;
    const factNK = factorialConPasos(n - k).total;
    const resultado = factN / (factK * factNK);

    const resultHtml = `<p>C(${n}, ${k}) = <strong>${resultado.toString()}</strong></p>`;
    displayResult('combinacionesResultado', 'combinacionesError', resultHtml);
}

// --------------- Conjuntos ---------------

function parseSetInput(inputString) {
    return new Set(inputString.split(',').map(item => item.trim()).filter(item => item !== ''));
}

function displaySetResult(outputId, errorId, setResult) {
    const sortedArray = Array.from(setResult).sort();
    const resultHtml = `<p>{ ${sortedArray.join(', ')} }</p>`;
    displayResult(outputId, errorId, resultHtml);
}

function calcularUnion() {
    const setA = parseSetInput(getInputValue("conjuntoA"));
    const setB = parseSetInput(getInputValue("conjuntoB"));

    const union = new Set([...setA, ...setB]);
    displaySetResult('unionResultado', 'unionError', union);
}

function calcularInterseccion() {
    const setA = parseSetInput(getInputValue("conjuntoA"));
    const setB = parseSetInput(getInputValue("conjuntoB"));

    const interseccion = new Set([...setA].filter(x => setB.has(x)));
    displaySetResult('interseccionResultado', 'interseccionError', interseccion);
}

function calcularDiferenciaA() { // A - B
    const setA = parseSetInput(getInputValue("conjuntoA"));
    const setB = parseSetInput(getInputValue("conjuntoB"));

    const diferencia = new Set([...setA].filter(x => !setB.has(x)));
    displaySetResult('diferenciaAResultado', 'diferenciaAError', diferencia);
}

function calcularDiferenciaB() { // B - A
    const setA = parseSetInput(getInputValue("conjuntoA"));
    const setB = parseSetInput(getInputValue("conjuntoB"));

    const diferencia = new Set([...setB].filter(x => !setA.has(x)));
    displaySetResult('diferenciaBResultado', 'diferenciaBError', diferencia);
}


// --------------- Funciones (Matemáticas) ---------------

function evaluateMathExpression(expression, xValue) {
    const sanitizedExpression = expression.replace(/x(?![a-zA-Z0-9_])/g, `(${xValue})`);
    
    try {
        return eval(sanitizedExpression);
    } catch (e) {
        console.error("Error al evaluar la expresión:", e);
        return NaN;
    }
}

function evaluarFuncion() {
    const definicion = getInputValue("funcionDefinicion");
    const x = parseFloat(getInputValue("funcionX"));

    if (definicion.trim() === "") {
        displayResult('funcionResultado', 'funcionError', "Por favor, ingresa la definición de la función.", true);
        return;
    }
    if (isNaN(x)) {
        displayResult('funcionResultado', 'funcionError', "Por favor, ingresa un valor numérico para x.", true);
        return;
    }

    const resultado = evaluateMathExpression(definicion, x);

    if (isNaN(resultado) || !isFinite(resultado)) {
        displayResult('funcionResultado', 'funcionError', "Error: Expresión inválida o resultado no numérico (ej: división por cero).", true);
        return;
    }
    const resultHtml = `<p>f(${x}) = <strong>${resultado}</strong></p>`;
    displayResult('funcionResultado', 'funcionError', resultHtml);
}

function evaluarComposicion() {
    const fxDef = getInputValue("funcionFX");
    const gxDef = getInputValue("funcionGX");
    const x = parseFloat(getInputValue("compX"));

    if (fxDef.trim() === "" || gxDef.trim() === "") {
        displayResult('composicionResultado', 'composicionError', "Por favor, ingresa ambas definiciones de función.", true);
        return;
    }
    if (isNaN(x)) {
        displayResult('composicionResultado', 'composicionError', "Por favor, ingresa un valor numérico para x.", true);
        return;
    }

    const gxResult = evaluateMathExpression(gxDef, x);
    if (isNaN(gxResult) || !isFinite(gxResult)) {
        displayResult('composicionResultado', 'composicionError', "Error en g(x): Expresión inválida o resultado no numérico.", true);
        return;
    }

    const fgxResult = evaluateMathExpression(fxDef, gxResult);
    if (isNaN(fgxResult) || !isFinite(fgxResult)) {
        displayResult('composicionResultado', 'composicionError', "Error en f(g(x)): Expresión inválida o resultado no numérico.", true);
        return;
    }

    const resultHtml = `<p>f(g(${x})) = <strong>${fgxResult}</strong></p>`;
    displayResult('composicionResultado', 'composicionError', resultHtml);
}

// --------------- Historial (Opcional) ---------------
/*
let historialCalculos = [];

function addToHistory(entry) {
    historialCalculos.push(entry);
    if (historialCalculos.length > 10) {
        historialCalculos.shift();
    }
    renderHistory();
}

function renderHistory() {
    const historialList = document.getElementById("historialLista");
    historialList.innerHTML = '';
    historialCalculos.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historialList.appendChild(li);
    });
}
*/