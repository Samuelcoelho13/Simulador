var numeroNotaFiscal = 0;

var produtos = [
    { nome: '001 - Computador Desktop Intel Core i5', valor: 3199.00, estoque: 5 },
    { nome: '002 - Laptop Ultrabook Intel Core i7', valor: 4799.00, estoque: 5 },
    { nome: '003 - Monitor LED 24 polegadas Full HD', valor: 799.90, estoque: 5 },
    { nome: '004 - Teclado Mecânico Gamer RGB', valor: 299.00, estoque: 5 },
    { nome: '005 - Mouse Óptico Sem Fio', valor: 79.90, estoque: 5 }
];

var vendas = [];

function visualizarProdutos() {
    var produtosList = 'Produtos disponíveis:\n';
    produtos.forEach(function(produto, index) {
        produtosList += `${index + 1}) ${produto.nome} - R$ ${produto.valor.toFixed(2)} - Estoque: ${produto.estoque}\n`;
    });
    return produtosList;
}

function imprimirNotaFiscal() {
    numeroNotaFiscal++;
    console.log('Nota Fiscal:');
    console.log('------------------------');
    console.log('Empresa: Télos NF');
    console.log('CNPJ: 12.345.678/0001-90');
    console.log('Endereço: Rua das Flores, 123');
    console.log('Cidade: Cidade Exemplo');
    var dataAtual = new Date();
    console.log(`Data: ${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`);
    console.log(`Número: ${numeroNotaFiscal}`);
    console.log('------------------------');
    console.log('Produtos\t\tQuantidade\tPreço Unitário\tSubtotal');
    console.log('------------------------');

    var totalCompra = 0;

    vendas.forEach(function(venda) {
        var subtotal = venda.precoUnitario * venda.quantidade;
        console.log(`${venda.produto}\t\t${venda.quantidade}\t\tR$ ${venda.precoUnitario.toFixed(2)}\t\tR$ ${subtotal.toFixed(2)}`);
        totalCompra += subtotal;
    });

    console.log('------------------------');
    console.log(`Total da compra: R$ ${totalCompra.toFixed(2)}`);
    console.log('------------------------');
}

function iniciarNovaVenda() {
    vendas = [];
    console.log('Nova venda iniciada!');
}

function menu() {
    var escolha = parseInt(prompt(
        'Selecione uma opção:\n' +
        '1) Visualizar produtos cadastrados e lançar venda\n' +
        '2) Lançar venda de produto\n' +
        '3) Imprimir nota fiscal\n' +
        '4) Iniciar uma nova venda\n' +
        '5) Sair'
    ));

    switch (escolha) {
        case 1:
            var produtosList = visualizarProdutos();
            var escolhaProduto = parseInt(prompt(produtosList + 'Selecione o número do produto que deseja vender:'));
            if (!isNaN(escolhaProduto) && escolhaProduto >= 1 && escolhaProduto <= produtos.length) {
                var produtoSelecionado = produtos[escolhaProduto - 1];
                var quantidadeVenda = parseInt(prompt(`Digite a quantidade que deseja vender (Disponível: ${produtoSelecionado.estoque}):`));
                if (quantidadeVenda > 0 && quantidadeVenda <= produtoSelecionado.estoque) {
                    var venda = {
                        produto: produtoSelecionado.nome,
                        quantidade: quantidadeVenda,
                        precoUnitario: produtoSelecionado.valor
                    };

                    produtoSelecionado.estoque -= quantidadeVenda;
                    vendas.push(venda);

                    console.log(`Venda lançada: ${quantidadeVenda}x ${produtoSelecionado.nome} - Total: R$ ${(produtoSelecionado.valor * quantidadeVenda).toFixed(2)}`);
                    console.log('Produto adicionado com sucesso!');
                } else {
                    console.log('Quantidade inválida ou fora de estoque!');
                }
            } else {
                console.log('Opção de produto inválida!');
            }
            break;
        case 2:
            var escolhaProduto = parseInt(prompt('Selecione o número do produto que deseja vender:'));
            if (!isNaN(escolhaProduto) && escolhaProduto >= 1 && escolhaProduto <= produtos.length) {
                var produtoSelecionado = produtos[escolhaProduto - 1];
                var quantidadeVenda = parseInt(prompt(`Digite a quantidade que deseja vender (Disponível: ${produtoSelecionado.estoque}):`));
                if (quantidadeVenda > 0 && quantidadeVenda <= produtoSelecionado.estoque) {
                    var venda = {
                        produto: produtoSelecionado.nome,
                        quantidade: quantidadeVenda,
                        precoUnitario: produtoSelecionado.valor
                    };

                    produtoSelecionado.estoque -= quantidadeVenda;
                    vendas.push(venda);

                    console.log(`Venda lançada: ${quantidadeVenda}x ${produtoSelecionado.nome} - Total: R$ ${(produtoSelecionado.valor * quantidadeVenda).toFixed(2)}`);
                    console.log('Produto adicionado com sucesso!');
                } else {
                    console.log('Quantidade inválida ou fora de estoque!');
                }
            } else {
                console.log('Opção de produto inválida!');
            }
            break;
        case 3:
            if (vendas.length > 0) {
                imprimirNotaFiscal();
            } else {
                console.log('Não há vendas para imprimir nota fiscal.');
            }
            break;
        case 4:
            iniciarNovaVenda();
            break;
        case 5:
            console.log('Saindo...');
            return;
        default:
            console.log('Opção inválida! Por favor, selecione uma opção válida.');
            break;
    }
    menu();
}

menu();
