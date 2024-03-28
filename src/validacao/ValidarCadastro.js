export function validarCadastro(dados, manutencao){

    if (manutencao == "cadastro"){
        if (dados.codigo == ""){
            alert("O código não pode ser nulo");
            return false;
        }
        
        if (dados.nome == ""){
            alert("O nome não pode ser nulo");
            return false;
        }

        if (dados.carro == ""){
            alert("O carro não pode ser nulo");
            return false;
        }

        //VERIFICAR PQ NAO ESTA ENTRANDO
        if (dados.anoAte !== null && dados.anoDe === null) {
            alert("O Ano inicial não pode ser nulo");
            return false;
        }

        if (confirm("Deseja cadastrar?")!=true){
            return false;
        }
    }

    if (manutencao == "deletar"){
        if (dados.codigo == ""){
            alert("O código não pode ser nulo para deletar");
            return false;
        }
        if (confirm("Deseja deletar?")!=true){
            alert("Operacação cancelada")
            return false;
        }
    }

    if (manutencao == "edicao"){
        if (dados.codigo == ""){
            alert("O código não pode ser nulo");
            return false;
        }
        
        if (dados.nome == ""){
            alert("O nome não pode ser nulo");
            return false;
        }

        if (dados.carro == ""){
            alert("O carro não pode ser nulo");
            return false;
        }

        //VERIFICAR PQ NAO ESTA ENTRANDO
        if (dados.anoAte !== null && dados.anoDe === null) {
            alert("O Ano inicial não pode ser nulo");
            return false;
        }

        if (confirm("Deseja salvar as alterações?")!=true){
            return false;
        }
    }

    return true;
}
  