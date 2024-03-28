export function validarCadastro(dados, manutencao) {
    const anoRegex = /^\d{4}$/;

    if (manutencao == "cadastro" || manutencao == "edicao") {
        if (dados.codigo == "") {
            alert("O código não pode ser nulo");
            return false;
        }

        if (dados.nome == "") {
            alert("O nome não pode ser nulo");
            return false;
        }

        if (dados.carro == "") {
            alert("O carro não pode ser nulo");
            return false;
        }

        //VERIFICAR PQ NAO ESTA ENTRANDO
        if (dados.ano == null || dados.ano == "") {
            alert("O Ano não pode ser nulo ou em branco");
            return false;
        }

        if (!anoRegex.test(dados.ano)) {
            alert("O formato do ano deve ser de 4 dígitos. Ex: 2024");
            return false;
        }

        if (manutencao == "cadastro") {
            if (confirm("Deseja cadastrar esta aplicação?") != true) {
                return false;
            }
        } else {
            if (confirm("Deseja editar esta aplicação?") != true) {
                return false;
            }
        }
    }

    if (manutencao == "deletar") {
        if (dados.codigo == "") {
            alert("O código não pode ser nulo para deletar");
            return false;
        }
        if (confirm("Deseja deletar?") != true) {
            alert("Operacação cancelada")
            return false;
        }
    }

    if (manutencao == "pesquisar"){
        if (!anoRegex.test(dados.ano)) {
            alert("O formato do ano deve ser de 4 dígitos. Ex: 2024");
            return false;
        }
    }

    return true;
}
