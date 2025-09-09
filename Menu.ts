import readlineSync = require("readline-sync");

import { colors } from './src/util/Colors';

import { Conta } from "./src/util/model/Conta"

import { ContaCorrente } from "./src/util/model/ContaCorrente"

import { ContaPoupanca } from "./src/util/model/ContaPoupanc"
import { ContaController } from "./src/util/controller/ContaController";

export function main () {

    let contas: ContaController = new ContaController();

    let option, numero, agencia, tipo, saldo, limite, aniversario: number;
    let titular: string;
    const tiposContas = ["Conta Corrente", "Conta Poupanca"];

    console.log("\nCriar Contas\n");

    // testes

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();



    // Objeto da Classe ContaCorrente (Teste)
    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(2000);
    contacorrente.visualizar();
    contacorrente.depositar(1000);
    contacorrente.visualizar();

    // Objeto da Classe ContaPoupanca (teste)
    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    while (true){
        console.log(colors.bg.black, colors.fg.yellow,)
        console.log("*****************************************************************");
        console.log("                                                                 ");
        console.log("                 Banco do Brazil com Z                           ");
        console.log("                                                                 ");
        console.log("*****************************************************************");
        console.log("                                                                 ");
        console.log("                    1 - Criar conta                              ");
        console.log("                    2 - Listar todas as contas                   ");
        console.log("                    3 - Buscar conta por numero                  ");
        console.log("                    4 - Atualizar dados da conta                 ");
        console.log("                    5 - Apagar                                   ");
        console.log("                    7 - Depositar                                ");
        console.log("                    8 - Tranferir valores entre contas           ");
        console.log("                    9 - Sair                                     ");
        console.log("                                                                 ");
        console.log("*****************************************************************");
        console.log("                                                                 ");
        colors.reset;

        option = readlineSync.questionInt("Entre com a opcao desejada: ");
        
        if (option === 9){
            console.log(colors.fg.greenstrong, 
                "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (option) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);
                
                agencia = readlineSync.questionInt("Digite o numero da agencia: ");

                titular = readlineSync.question("Digite o nome do titular da conta: ");

                tipo = readlineSync.keyInSelect(tiposContas, "", {cancel: false}) + 1;

                saldo = readlineSync.questionFloat("Digite o valor do saldo da conta (R$): ");

                switch (tipo){
                    case 1: 
                        limite = readlineSync.questionFloat("Digite o valor do limite da conta (R$): ");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                        break;
                    case 2:
                        aniversario = readlineSync.questionInt("Digite o dia do aniversario da conta poupanca: ");
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break
                }

                keyPress()
                break;
            case 2:
                console.log(colors.fg.whitestrong, "\n\nListar todas as Contas\n\n", colors.reset);

                contas.listarTodas();

                keyPress()
                break;
            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nConsultar dados da Conta - por numero\n\n", colors.reset);

                    numero = readlineSync.questionInt("digite o numero da conta: ");
                    contas.procurarPorNumero(numero);

                keyPress()
                break;
            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar dados da Conta\n\n", colors.reset);

                numero = readlineSync.questionInt("Digite o numero da conta: ");

                let conta = contas.buscarNoArray(numero);

                if(conta != null){

                agencia = readlineSync.questionInt("Digite o numero da agencia: ");

                titular = readlineSync.question("Digite o nome do titular da conta: ");

                tipo = conta.tipo;

                saldo = readlineSync.questionFloat("Digite o valor do saldo da conta (R$): ");

                switch (tipo){
                    case 1: 
                        limite = readlineSync.questionFloat("Digite o valor do limite da conta (R$): ");
                        contas.atualizar(
                            new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                        break;
                    case 2:
                        aniversario = readlineSync.questionInt("Digite o dia do aniversario da conta poupanca: ");
                        contas.atualizar(
                            new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                        break
                }

                }else{
            console.log(colors.fg.red, "A conta numero:" + numero + " nao foi encontrada.", colors.reset)}

                keyPress()
                break;
            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nApagar uma Conta\n\n", colors.reset);

                    numero = readlineSync.questionInt("Digite o numero da conta a ser deletada: ");
                    contas.deletar(numero);

                keyPress()
                break;
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nSaque\n\n", colors.reset);

                keyPress()
                break;
            case 7:
                console.log(colors.fg.whitestrong, 
                    "\n\nDeposito\n\n", colors.reset);

                keyPress()
                break;
            case 8:
                console.log(colors.fg.whitestrong, 
                    "\n\nTransferencia entre Contas\n\n", colors.reset);

                keyPress()
                break;
            default:
                console.log(colors.fg.whitestrong, 
                    "\nOpção Invalida!\n", colors.reset);

                keyPress()
                break;
        }
    }
}

export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlineSync.prompt();
}

main();