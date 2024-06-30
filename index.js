function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharTarefa(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas") //É UMA PROMESSA, ELE IRÁ BUSCAR
    .then(res => res.json()) // AQUI TRATAMOS O QUE FOI RETORNADO. RECEBE E TRANSFORMA A REQUISIÇÃO EM UM JSON
    .then(res => {//PEGANDO O SUCESS 
        inserirTarefas(res)
    })
} buscarTarefas();

function inserirTarefas(listaTarefas){
    if(listaTarefas.length > 0){
        lista.innerHTML = ""
        listaTarefas.map(tarefa => {
            lista.innerHTML += 
                 `<li>
                     <h5>${tarefa.titulo}</h5>
                          <p>${tarefa.descricao}</p>
                            <div class="actions">
                               <box-icon type='solid' name='trash' size="sm" onclick="excluirTarefa(${tarefa.id})"></box-icon>
                            </div>
                 </li>`; 
        })
    }
    else{
        lista.innerHTML += `<h6 text-align: center;">Nenhuma tarefa registrada! :( </h6>`
    }
}

function novaTarefa(){
    event.preventDefault();//ELE RESETA O COMPORTAMENTO PADRÃO DE QUALQUER ELEMENTO. NO CASO NÃO QUEREMOS QUE O     BANCO ENVIE INFORMAÇÕES PARA O BANCO

    let tarefa = { //CRIANDO OBJETO
        titulo: titulo.value, //PEGANDO O VALOR INSERIDO DO CAMPO INPUT COM O ID TITULO
        descricao: descricao.value
    }

    fetch("http://localhost:3000/tarefas", {
        method: "POST", //INFORMANDO QUE O TIPO DE REQUISIÇÃO É POST - CRIAR UMA NOVAS INFORMAÇÕES NO BANCO
        
        headers: {//OBJETO - CABEÇALHO DA REQUISIÇÃO DO TIPO DE REQUISIÇÃO
            "Content-type": "application/json"  
        },
        body: JSON.stringify(tarefa) //CORPO DA REQUISIÇÃO. //O STRINGFY TRANSFORMA O JSON EM HYPERTEXT QUE É O QUE TRAFEGA NA INTERNET - POIS O JSON NÃO PODE SER RODADO COMO INFORMAÇÃO NA INTERNET - PARA CHEGAR NA API
    })
    .then(res => res.json())//TRATAR O RETORNO, SABER SE FUNCIONOU A INSERÇÃO DOS DADOS
    .then(res => {
        fecharTarefa();
        buscarTarefas();
    })
}

function excluirTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res =>{
        alert("Tarefa excluída com sucesso!");
        buscarTarefas();
    })
}