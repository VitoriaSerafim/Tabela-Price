$("#submitButton").click(function (event) {
    // Impedir o envio do formulário padrão
    event.preventDefault();

    // Obter os valores de entrada do usuário
    var np = parseInt($("#parc").val()); // Parcelamento (meses)
    var tax = parseFloat($("#itax").val()) / 100; // Taxa de juros (mensal)
    var pv = parseFloat($("#ipv").val()); // Valor financiado
    var pp = parseFloat($("#ipp").val()); // Valor final (opcional)
    var pb = parseFloat($("#ipb").val()); // Valor a voltar (opcional)
    var dp = $("#idp").is(":checked"); // Entrada (true ou false)

console.log(np,tax,pv,pp,pb,dp)

    // Validar os valores de entrada
    if (isNaN(np) || isNaN(tax) || isNaN(pv)) {
        $("#errorMessage").html("<p>Por favor, preencha os campos corretamente.</p>");
        $("#errorMessage").show();
        $("#successMessage").hide();
        return;
    }

    // Ajuste para a primeira parcela paga no ato da compra
    var n = np - (dp ? 1 : 0);

    // Calcular a parcela mensal (Tabela Price) com a entrada
    var i = tax; // Taxa de juros mensal
    var pmt; // Parcela mensal
    if (i === 0) {
        // Caso de juros zero
        pmt = pv / n;
    } else {
        pmt = (pv * i) / (1 - Math.pow(1 + i, -n));
    }

    // Calcular o valor final (se não fornecido)
    if (isNaN(pp)) {
        pp = pmt * n;
    }

    // Calcular o valor a voltar (se não fornecido)
    if (isNaN(pb)) {
        pb = pp - pv;
    }

    // Calcular o Custo Total do Empréstimo
    var cost = n * pmt - pv;

    // Calcular o Valor Total Pago
    var totalPaid = pv + cost;

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

    // Preencher a tabela com os detalhes mensais
    var resultTable = $("#resultTable tbody");
    resultTable.empty(); // Limpar a tabela anterior, se houver

    var saldoDevedor = pv;

    for (var month = 1; month <= n; month++) {
        var juros = saldoDevedor * i;
        var amortizacao = pmt - juros;
        saldoDevedor -= amortizacao;

        // Adiciona a linha à tabela
        resultTable.append(
            "<tr>" +
            "<td>" + month + "</td>" +
            "<td>$" + pmt.toFixed(2) + "</td>" +
            "<td>$" + juros.toFixed(2) + "</td>" +
            "<td>$" + amortizacao.toFixed(2) + "</td>" +
            "<td>$" + saldoDevedor.toFixed(2) + "</td>" +
            "</tr>"
        );
    }
});
