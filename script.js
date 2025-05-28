function mostrarMM1() {
    document.getElementById("selector").style.display = "none";
    document.getElementById("mm1").style.display = "block";
}

function mostrarMMS() {
    document.getElementById("selector").style.display = "none";
    document.getElementById("mms").style.display = "block";
}

function volver() {
    document.getElementById("selector").style.display = "block";
    document.getElementById("mm1").style.display = "none";
    document.getElementById("mms").style.display = "none";
}

function calcularMM1() {
    const lambda = parseFloat(document.getElementById("lambda1").value);
    const mu = parseFloat(document.getElementById("mu1").value);
    const n = parseInt(document.getElementById("n").value);

    if (lambda <= 0 || mu <= 0 || lambda >= mu || isNaN(n) || n < 0) {
        alert("Asegúrate de que 0 < λ < μ y n ≥ 0.");
        return;
    }

    const Ls = lambda / (mu - lambda);
    const Ws = 1 / (mu - lambda);
    const Lq = (lambda * lambda) / (mu * (mu - lambda));
    const Wq = lambda / (mu * (mu - lambda));
    const rho = lambda / mu;
    const P0 = 1 - rho;
    const Pn = (1 - rho) * Math.pow(rho, n);

    document.getElementById("resultadoMM1").innerHTML = `
        <h3>Resultados para M/M/1:</h3>
        <ul>
            <li><strong>Ls</strong> (N° promedio en el sistema): ${Ls.toFixed(4)}</li>
            <li><strong>Ws</strong> (Tiempo promedio en el sistema): ${Ws.toFixed(4)}</li>
            <li><strong>Lq</strong> (N° promedio en la cola): ${Lq.toFixed(4)}</li>
            <li><strong>Wq</strong> (Tiempo promedio en la cola): ${Wq.toFixed(4)}</li>
            <li><strong>ρ</strong> (Utilización del sistema): ${rho.toFixed(4)}</li>
            <li><strong>P0</strong> (Probabilidad de sistema vacío): ${P0.toFixed(4)}</li>
            <li><strong>Pn</strong> (Probabilidad de que halla ${n} clientes): ${Pn.toFixed(6)}</li>
        </ul>
    `;
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularMMS() {
    const lambda = parseFloat(document.getElementById("lambda2").value);
    const mu = parseFloat(document.getElementById("mu2").value);
    const s = parseInt(document.getElementById("s").value);

    if (lambda <= 0 || mu <= 0 || s <= 0 || lambda >= s * mu) {
        alert("Asegúrate de que 0 < λ < s * μ, y s > 0.");
        return;
    }

    const rho = lambda / (s * mu);
    let sum = 0;
    for (let n = 0; n < s; n++) {
        sum += Math.pow(lambda / mu, n) / factorial(n);
    }
    const part2 = Math.pow(lambda / mu, s) / (factorial(s) * (1 - rho));
    const P0 = 1 / (sum + part2);

    const Lq = P0 * Math.pow(lambda / mu, s) * rho / (factorial(s) * Math.pow(1 - rho, 2));
    const Ls = Lq + (lambda / mu);
    const Wq = Lq / lambda;
    const Ws = Ls / lambda;

    document.getElementById("resultadoMMS").innerHTML = `
        <h3>Resultados para M/M/s:</h3>
        <ul>
            <li><strong>P0</strong> (Probabilidad de que no haya clientes): ${P0.toFixed(4)}</li>
            <li><strong>Lq</strong> (N° promedio de clientes en cola): ${Lq.toFixed(4)}</li>
            <li><strong>Ls</strong> (N° promedio de clientes en el sistema): ${Ls.toFixed(4)}</li>
            <li><strong>Wq</strong> (Tiempo promedio en cola): ${Wq.toFixed(4)}</li>
            <li><strong>Ws</strong> (Tiempo promedio en sistema): ${Ws.toFixed(4)}</li>
            <li><strong>ρ</strong> (Utilización del sistema): ${rho.toFixed(4)}</li>
        </ul>
    `;
}