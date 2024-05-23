var readline = require('readline');

var produto00 = {
    nome: '001 - Computador Desktop Intel Core i5',
    valor: 3199.00,
    estoque: 5
};
var produto01 = {
    nome: '002 - Laptop Ultrabook Intel Core i7',
    valor: 4799.00,
    estoque: 5
};
var produto02 = {
    nome: '003 - Monitor LED 24 polegadas Full HD',
    valor: 799.90,
    estoque: 5
};
var produto03 = {
    nome: '004 - Teclado Mecânico Gamer RGB',
    valor: 299.00,
    estoque: 5
};
var produto04 = {
    nome: '005 - Mouse Óptico Sem Fio',
    valor: 79.90,
    estoque: 5
};
var produtos = [produto00, produto01, produto02, produto03, produto04];
var vendas = [];
var numeroNotaFiscal = 0;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function visualizarProdutos() {
    console.log('Produtos disponíveis:');
    produtos.forEach(function(produto, index) {
        console.log(`${index + 1}) ${produto.nome} - R$ ${produto.valor.toFixed(2)} - Estoque: ${produto.estoque}`);
    });
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
    console.log('\nSelecione uma opção:');
    console.log('1) Visualizar produtos cadastrados');
    console.log('2) Lançar venda de produto');
    console.log('3) Imprimir nota fiscal');
    console.log('4) Iniciar uma nova venda');
    console.log('5) Sair');
    rl.question('Escolha uma opção: ', function(escolha) {
        escolha = parseInt(escolha);
        switch (escolha) {
            case 1:
                visualizarProdutos();
                menu();
                break;
            case 2:
                rl.question('Selecione o número do produto que deseja vender: ', function(escolhaProduto) {
                    escolhaProduto = parseInt(escolhaProduto);
                    if (!isNaN(escolhaProduto) && escolhaProduto >= 1 && escolhaProduto <= produtos.length) {
                        var produtoSelecionado = produtos[escolhaProduto - 1];
                        rl.question(`Digite a quantidade que deseja vender (Disponível: ${produtoSelecionado.estoque}): `, function(quantidadeVenda) {
                            quantidadeVenda = parseInt(quantidadeVenda);
                            if (quantidadeVenda > 0 && quantidadeVenda <= produtoSelecionado.estoque) {
                                var venda = {
                                    produto: produtoSelecionado.nome,
                                    quantidade: quantidadeVenda,
                                    precoUnitario: produtoSelecionado.valor,
                                    precoTotal: produtoSelecionado.valor * quantidadeVenda
                                };

                                produtoSelecionado.estoque -= quantidadeVenda;
                                vendas.push(venda);

                                console.log(`Venda lançada: ${quantidadeVenda}x ${produtoSelecionado.nome} - Total: R$ ${(produtoSelecionado.valor * quantidadeVenda).toFixed(2)}`);
                                console.log('Produto adicionado com sucesso!');
                                menu();
                            } else {
                                console.log('Quantidade inválida ou fora de estoque!');
                                menu();
                            }
                        });
                    } else {
                        console.log('Opção de produto inválida!');
                        menu();
                    }
                });
                break;
            case 3:
                if (vendas.length > 0) {
                    imprimirNotaFiscal();
                } else {
                    console.log('Não há vendas para imprimir nota fiscal.');
                }
                menu();
                break;
            case 4:
                iniciarNovaVenda();
                menu();
                break;
            case 5:
                console.log('Saindo...');
                rl.close();
                break;
            default:
                console.log('Opção inválida! Por favor, selecione uma opção válida.');
                menu();
                break;
        }
    });
}

menu();
