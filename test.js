function CF(t,p){
    return t / 1-(1 + t)**-p
}

$("#submitButton").click(function (event) {
try {
    const np = parseInt($("#parc").val()); // Parcelamento (meses)
    const tax = parseFloat($("#itax").val()) / 100; // Taxa de juros (mensal)
    const pv = parseFloat($("#ipv").val()); // Valor financiado
    const pp = parseFloat($("#ipp").val()); // Valor final (opcional)
    const pb = parseFloat($("#ipb").val()); // Valor a voltar (opcional)
  } catch (err) {
    const errmsg = `Invalid Parameters: ${err}`;
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
  
    console.log(errmsg);
  
    const dp = $("#idp").is(":checked"); // Entrada (true ou false)
    $("#resultTable").html(`
      <h4>Parcelas: ${dp ? '1+' : ''}${dp ? np - 1 : np}</h4>
      <h4>Taxa: ${(100 * t).toFixed(2)}%</h4>
      <h4>Preço a Prazo: $${pp.toFixed(2)}</h4>
      <h4>Preço à Vista: $${pv.toFixed(2)}</h4>
    `);
  
    setDownPayment(dp); // com ou sem entrada?
    const i = getInterest(pp, pv, np);
  
    if (t <= 0) {
      t = i[0] * 0.01;
    }
  
    const cf = CF(t, np);
    let pmt = pv * cf;
  
    if (getDownPayment()) {
      pmt /= (1 + t);
    }
  
    np -= 1; // uma prestação a menos
    pv -= pmt; // preço à vista menos a entrada
    $("#successMessage").html(`<h4>Valor financiado = $${(pv + pmt).toFixed(2)} - $${pmt.toFixed(2)} = $${pv.toFixed(2)}</h4>`);
    $("#successMessage").html(`
      <h4>Taxa Real (${i[1]} iterações): ${i[0].toFixed(4)}%</h4>
      <h4>Coeficiente de Financiamento: ${cf.toFixed(6)}</h4>
      <h4>Prestação: $${pmt.toFixed(2)}</h4>
      <h2>Tabela Price</h2>
    `);
  
    const ptb = priceTable(np, pv, t, pmt);
    let table = " ";
  
    for (let i = 0; i < ptb.length; i++) {
      table += "<tr>";
      for (let j = 0; j < ptb[0].length; j++) {
        const col = (i > 0 && j > 0) ? ptb[i][j].toFixed(2) : ptb[i][j].toString();
        table += (i > 0 ? "<td style='text-align: center'>" : "<th>") + col + (i > 0 ? "</td>" : "</th>");
      }
      table += "</tr>";
    }
  
    $("#price").html(`
      <table border="1">
        ${table}
      </table>
    `);

    $("#price").html("</body>");
    $("#price").html("</html>");
  }
})