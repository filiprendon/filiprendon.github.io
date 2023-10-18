function calcularPropina() {
    let numComensales = parseFloat(document.getElementById("numeroComensales").value);
    let totalCuenta = parseFloat(document.getElementById("precioTotal").value);
    let servicio = document.getElementById("calificacionServicio").value;
    let porcentaje;
  
    if (isNaN(numComensales)) {
      numComensales = 1;
    }
    
    if (isNaN(totalCuenta)) {
      alert("Por favor pon el total de la cuenta");
    }
  
    if (servicio === "") {
      alert("Por favor, califica el servicio");
      return;
    }
  
    switch (servicio) {
      case "1":
        porcentaje = 10;
        break;
      case "2":
        porcentaje = 5;
        break;
      case "3":
        porcentaje = 0;
        break;
    }
  
    let propinaTotal = (totalCuenta * (porcentaje / 100));
    propinaTotal = Math.max(propinaTotal, numComensales * 0.50); 
  
  let propinaPorPersona = propinaTotal / numComensales;
  document.getElementById("propinaPorPersona").textContent = propinaPorPersona.toFixed(2) + " €";
  
    
  document.getElementById("calcularPropina").reset();
  }
  