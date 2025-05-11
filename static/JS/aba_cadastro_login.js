function configurarAbas(btn_id, aba_page, btn_sair){
    const btn = document.getElementById(btn_id);
    const aba = document.getElementById(aba_page);
    const sair = document.getElementById(btn_sair);

    btn.addEventListener("click", function(){
        aba.style.display = 'block'
    })

    sair.addEventListener("click", function(){
        aba.style.display = 'none'
    })
}

configurarAbas('cadastrar','aba_login','sair_cadastro');