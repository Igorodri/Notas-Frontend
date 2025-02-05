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

        let area_box = document.getElementById("area-notas");
        area_box.innerHTML = "";


        data.forEach(registro => {
            const area_titulo = document.createElement("div");
            area_titulo.classList.add("area_titulo");

            const titulo = document.createElement("h3");
            titulo.textContent = registro.titulo;

            const area_descricao = document.createElement("div");
            area_descricao.classList.add("area_descricao");

            const descricao = document.createElement("p");
            descricao.textContent = registro.descricao;

            area_box.appendChild(area_titulo);
            area_titulo.appendChild(titulo);
            area_box.appendChild(area_descricao);
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



select_notas()