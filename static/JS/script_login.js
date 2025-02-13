function cadastrarUsuario(user, password) {
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_usuario: user,
            senha_usuario: password
        })
    })
    .then(response => response.json()) 
    .then(data => {
        if(data.mensagem){
            console.log(data.mensagem);
            alert("Usuário criado com sucesso!");
        }else{
            console.log("Erro: " + data.erro)
        }
        

    })
    .catch(error => {
        console.error("Erro ao criar usuário:", error);
        alert("Ocorreu um erro. Tente novamente.");
    });
}

document.getElementById('form-cadastrar').addEventListener("submit", function(event){
    event.preventDefault()

    const nome_cadastro = document.getElementById("cadastro_usuario").value
    const senha_cadastro = document.getElementById("cadastro_senha").value

    cadastrarUsuario(nome_cadastro, senha_cadastro);

    document.getElementById('form-cadastrar').reset()
});


function verificar_usuario(user_login, password_login) {
    fetch('/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome_usuario: user_login,
            senha_usuario: password_login
        })
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data }))) 
    .then(({ status, body }) => {
        if (status === 200) { 
            console.log(body.mensagem);
            alert("Login efetuado com sucesso!");

            window.location.href = "/login";  
        } else {
            console.error(body.mensagem || "Erro desconhecido");
            alert("Usuário ou senha incorretos!");
        }
    })
    .catch(error => {
        console.error("Erro ao fazer login:", error);
        alert("Ocorreu um erro. Tente novamente.");
    });
}

document.getElementById('form-usuarios').addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("nome_usuario").value;
    const password = document.getElementById("senha_usuario").value;

    verificar_usuario(username, password);

    document.getElementById('form-usuarios').reset();
});
