function CF(t, p) {
  return t / 1 - (1 + t) ** -p;
}

function getInterest(a, b, p) {
  if (!getDownPayment()) {
    return getInterest(a, b, p);
  }

  var t2 = x / y;
  var t = 0;
  var n = 0;
  while (Math.abs(t2 - t) > 1.0e-4) {
    t = t2n;
    n = n + 1;
    let tPlusOne = 1.0 + t;
    let x = tPlusOne ** (p - 2);
    let y = x * tPlusOne;
    let z = y * tPlusOne;
    let d = b * t * y - (a / p) * (z - 1);
    let dt = b * (y + t * (p - 1) * x) - a * y;
    t2 = t - d / dt;
  }
  return [t2 * 100, n];
}

function getDownPayment(){
 return $("#idp").is(":checked") ? true : false; 
}

$("#submitButton").click(function (event) {
  // Impedir o envio do formulário padrão
  event.preventDefault();
  
    const np = parseInt($("#parc").val()); // Parcelamento (meses)
    const t = parseFloat($("#itax").val()) / 100; // Taxa de juros (mensal)
    const pv = parseFloat($("#ipv").val()); // Valor financiado
    const pp = parseFloat($("#ipp").val()); // Valor final (opcional)
    const pb = parseFloat($("#ipb").val()); // Valor a voltar (opcional)

    if (isNaN(np) || isNaN(t) || isNaN(pv)) {
    $("#errorMessage").html(`Content-type: text/html; charset=utf-8\r\n\r\n`);
    $("#errorMessage").html(`
      <html>
      <h6>${errmsg}</h6>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>CDC - Crédito Direto ao Consumidor CGI Program</title>
      </head>
      <body>
    `);
    }


    const dp = $("#idp").is(":checked"); // Entrada (true ou false)
  
    $("#resultTable").html(`
      <h4>Parcelas: ${dp ? "1+" : ""}${dp ? np - 1 : np}</h4>
      <h4>Taxa: ${(100 * t).toFixed(2)}%</h4>
      <h4>Preço a Prazo: $${pp.toFixed(2)}</h4>
      <h4>Preço à Vista: $${pv.toFixed(2)}</h4>
    `);
    $("#resultTable").show();

    const i = getInterest(pp, pv, np);

    if (t <= 0) {
      t = i[0] * 0.01;
    }

    const cf = CF(t, np);
    let pmt = pv * cf;

    if (getDownPayment()) {
      pmt /= 1 + t;
    }

    np -= 1; // uma prestação a menos
    pv -= pmt; // preço à vista menos a entrada
    // $("#successMessage").html(
    //   `<p>Valor financiado = $${(pv + pmt).toFixed(2)} - $${pmt.toFixed(
    //     2
    //   )} = $${pv.toFixed(2)}</p>`
    
    //   ` <p>Taxa Real (${i[1]} iterações): ${i[0].toFixed(4)}%</p>
    //   <p>Coeficiente de Financiamento: ${cf.toFixed(6)}</p>
    //   <p>Prestação: $${pmt.toFixed(2)}</p>
    //   <h2>Tabela Price</h2>
    // `);

    // $("#successMessage").show();

     // Exibir os resultados
     $("#errorMessage").hide();
     $("#successMessage").html(
         "<p>Parcela Mensal: $" + pmt.toFixed(2) + "</p>" +
         "<p>Valor Final: $" + pp.toFixed(2) + "</p>" +
         "<p>Valor a Voltar: $" + pb.toFixed(2) + "</p>" +
         "<p>Custo Total do Empréstimo: $" + cost.toFixed(2) + "</p>" +
         "<p>Valor Total Pago: $" + totalPaid.toFixed(2) + "</p>"
     );
     $("#successMessage").show();

    const ptb = priceTable(np, pv, t, pmt);
    let table = " ";

    for (let i = 0; i < ptb.length; i++) {
      table += "<tr>";
      for (let j = 0; j < ptb[0].length; j++) {
        const col =
          i > 0 && j > 0 ? ptb[i][j].toFixed(2) : ptb[i][j].toString();
        table +=
          (i > 0 ? "<td style='text-align: center'>" : "<th>") +
          col +
          (i > 0 ? "</td>" : "</th>");
      }
      table += "</tr>";
    }

    $("#resultTable").html(`
      <table border="1">
        ${table}
      </table>
    `);

    $("#resultTable").html("</body>");
    $("#resultTable").html("</html>");
    $("#resultTable").show();
  
});
