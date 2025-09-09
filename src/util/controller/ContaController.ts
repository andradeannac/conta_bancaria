import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;


    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if(buscaConta != null){
            buscaConta.visualizar();
        }else
        console.log(colors.fg.red, "A conta numero: " + numero + " nao foi encontrada", colors.reset)
    }

    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        };
    }
    
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta numero: " + conta.numero + "foi criada com sucesso", colors.reset)
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
        
        if(buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "A conta numero:" + conta.numero + " foi atualizada com sucesso.", colors.reset)
        }else
            console.log(colors.fg.red, "A conta numero:" + conta.numero + " nao foi encontrada.", colors.reset)
    }
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
        if(buscaConta != null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "A conta numero: " + numero + " foi deletada com sucesso.", colors.reset)
        }else
        console.log(colors.fg.red, "A conta numero: " + numero + " nao foi encontrada", colors.reset)

    }
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }


    //Métodos auxiliares

    // gerar número da conta

    public gerarNumero(): number {
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas){
            if (conta.numero === numero){
                return conta;
            }
        }

        return null;

    }
}