function select_notas(){
    fetch("/notas")
    .then(response => response.json())
    .then(data =>{

        let area_box = document.getElementById("area-notas");

        area_box.innerHTML="";

        data.forEach(nota => {
            const box_notas = document.createElement("div");
            box_notas.classList.add("box_notas");

            const area_titulo = document.createElement("div");
            area_titulo.classList.add("area_titulo"); 

            const id = document.createElement("p");
            id.classList.add("id");
            id.textContent = nota.id;

            const titulo = document.createElement("h3");
            titulo.classList.add("titulo");
            titulo.textContent = nota.titulo;


            const area_descricao = document.createElement("div");
            area_descricao.classList.add("area_descricao"); 

            const descricao = document.createElement("p");
            descricao.classList.add("descricao");
            descricao.textContent = nota.descricao;

            const area_data = document.createElement("div");
            area_data.classList.add("footer");

            const data = document.createElement("span");
            data.classList.add("datetime");
            data.textContent = nota.data;

            area_titulo.appendChild(id);
            area_titulo.appendChild(titulo);
            area_descricao.appendChild(descricao);
            area_data.appendChild(data);

            box_notas.appendChild(area_titulo);
            box_notas.appendChild(area_descricao);
            box_notas.appendChild(area_data);

            area_box.appendChild(box_notas);
        });
    })
    .catch(error => console.error("Erro ao buscar novas notas", error));
}




function registrar_dados(titulo_registro, descricao_registro) {

    fetch('/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo_registro,
            descricao: descricao_registro
        })
    })
    .then(response => response.json())
    .then(data => {
        select_notas();

        let area_box = document.getElementById("area-notas");
        area_box.innerHTML = "";  

        data.forEach(registro => {

            const box_notas = document.createElement("div");
            box_notas.classList.add("box_notas");


            const area_titulo = document.createElement("div");
            area_titulo.classList.add("area_titulo");

            const titulo = document.createElement("h3");
            titulo.textContent = registro.titulo;

            const area_descricao = document.createElement("div");
            area_descricao.classList.add("area_descricao");

            const descricao = document.createElement("p");
            descricao.textContent = registro.descricao;

            area_box.appendChild(box_notas);

            box_notas.appendChild(area_titulo);
            box_notas.appendChild(area_descricao);

            area_titulo.appendChild(titulo);
            area_descricao.appendChild(descricao);
        });
    })
}


document.getElementById("form-registro").addEventListener("submit", function(event){
    event.preventDefault();

    const titulo = document.getElementById("titulo_registro").value;
    const descricao = document.getElementById("descricao_registro").value;

    registrar_dados(titulo,descricao);

    document.getElementById('form-registro').reset()
});

function deletar_registros(id_excluir){
    fetch('/excluir', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            id: id_excluir
        })
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.mensagem)
        select_notas();
    })
    .catch(error => console.error("Erro ao excluir registro", error));
}

document.getElementById("form-excluir").addEventListener("submit", function(event){
    event.preventDefault();

    const id = document.getElementById("id_excluir").value;

    console.log(id);

    deletar_registros(id);

    document.getElementById('form-excluir').reset()
});


function deletar_all(){
    fetch('/excluir_all', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.mensagem)
        select_notas();
    })
    .catch(error => console.error("Erro ao excluir registro", error));
}

document.getElementById("btn_excluir_all").addEventListener("click", function(){
    deletar_all();
})

function editar(id_editar){
    fetch('/editar',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            id: id_editar
        })
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.mensagem);
        select_notas();

        const titulo_editar = document.querySelector(".titulo");
        const descricao_editar = document.querySelector(".descricao");

        const new_titulo = document.getElementById("titulo_edit");
        const new_descricao = document.getElementById("descricao_edit");

        titulo_editar.textContent = new_titulo.textContent;
        descricao_editar.textContent = new_descricao.textContent;

    })
    .catch(error => console.error("Erro ao editar registro", error));
}

document.getElementById("btn_editar").addEventListener("submit", function(event){
    event.preventDefault();

    const id_registro_editar = document.getElementById("id_edit").value;

    console.log(id_registro_editar);

    editar(id);

    document.getElementById('form_editar').reset()
})


select_notas();