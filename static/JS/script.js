function select_notas(){
    fetch("http://127.0.0.1:5000/notas")
    .then(response => response.json())
    .then(data =>{

        console.log(data);

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
    .catch(error => {
        console.error("Erro ao buscar novas notas", error)

        Toastify({
            text: "Erro ao listar as notas",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,rgb(206, 19, 19),rgb(188, 29, 29))"
            },
            onClick: function(){} 
            }).showToast();

    });
}




function registrar_dados(titulo_registro, descricao_registro) {

    fetch('http://127.0.0.1:5000/registrar', {
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
        Toastify({
            text: "Nota registrada com sucesso!",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,rgb(19, 206, 31),rgb(50, 188, 29))"
            },
            onClick: function(){} 
            }).showToast();

        let area_box = document.getElementById("area-notas");
        area_box.innerHTML = "";  

        data.forEach(registro => {

            const box_notas = document.createElement("div");
            box_notas.classList.add("box_notas");


            const area_titulo = document.createElement("div");
            area_titulo.classList.add("area_titulo");

            const titulo = document.createElement("h3");
            titulo.classList.add(".titulo")
            titulo.textContent = registro.titulo;

            const area_descricao = document.createElement("div");
            area_descricao.classList.add("area_descricao");

            const descricao = document.createElement("p");
            descricao.classList.add(".descricao")
            descricao.textContent = registro.descricao;

            area_box.appendChild(box_notas);

            box_notas.appendChild(area_titulo);
            box_notas.appendChild(area_descricao);

            area_titulo.appendChild(titulo);
            area_descricao.appendChild(descricao);

        });
        
    })
    .catch(error => {
        console.error("Erro ao registrar nota: ",error)

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
    fetch('http://127.0.0.1:5000/excluir', {
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
        Toastify({
            text: "Nota deletada com sucesso!",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,rgb(19, 206, 31),rgb(50, 188, 29))"
            },
            onClick: function(){} 
            }).showToast();
    })
    .catch(error => {
        console.error("Erro ao excluir registro", error)

        Toastify({
                text: "Erro ao deletar nota",
                duration: 2000,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right,rgb(206, 19, 19),rgb(188, 29, 29))"
                },
                onClick: function(){} 
                }).showToast();
    })
            
    };

document.getElementById("form-excluir").addEventListener("submit", function(event){
    event.preventDefault();

    const id = document.getElementById("id_excluir").value;

    console.log(id);

    deletar_registros(id);

    document.getElementById('form-excluir').reset()
});


function deletar_all(){
    fetch('http://127.0.0.1:5000/excluir_all', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.mensagem)
        select_notas();
        Toastify({
            text: "Todas as notas foram deletadas com sucesso!",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,rgb(19, 206, 31),rgb(50, 188, 29))"
            },
            onClick: function(){} 
            }).showToast();
    })
    .catch(error => {
        console.error("Erro ao excluir registro", error);
        Toastify({
            text: "Erro ao deletar todas as notas",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, rgb(206, 19, 19), rgb(188, 29, 29))"
            },
            onClick: function(){} 
        }).showToast();
    });

           
    };


document.getElementById("btn_excluir_all").addEventListener("click", function(){
    deletar_all();
})

function editar_registros(id_editar,novo_titulo,nova_descricao){
    fetch('http://127.0.0.1:5000/editar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            id: id_editar,
            titulo: novo_titulo,
            descricao: nova_descricao
        })
        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensagem);
        select_notas();

        Toastify({
            text: "Nota editada com sucesso",
            duration: 2000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right,rgb(19, 206, 31),rgb(50, 188, 29))"
            },
            onClick: function(){} 
            }).showToast();

        const titulo = document.querySelector(".titulo");
        const descricao = document.querySelector(".descricao");

        titulo.textContent = novo_titulo;
        descricao.textContent = nova_descricao
    })
    .catch(error => console.log("Erro ao editar registro", error))
}

document.getElementById('form_editar').addEventListener('submit', function(event){
    event.preventDefault();

    const id_registro_editar = document.getElementById("id_edit").value;
    const titulo_registro_editar = document.getElementById("titulo_edit").value
    const descricao_registro_editar = document.getElementById("descricao_edit").value

    console.log(id_registro_editar);

    editar_registros(id_registro_editar, titulo_registro_editar, descricao_registro_editar);

    document.getElementById('form_editar').reset()

})





select_notas();