
btn_registro = document.getElementById("registrar")
btn_sair_registro = document.getElementById("sair_registro")
aba_registro = document.getElementById("aba_registros");


btn_excluir = document.getElementById("excluir")
aba_excluir = document.getElementById("aba_excluir");
btn_sair_excluir = document.getElementById("sair_excluir")

btn_editar = document.getElementById("editar")
aba_editar = document.getElementById("aba_editar");
btn_sair_editar = document.getElementById("sair_editar")





btn_registro.addEventListener("click",function(){
    aba_registro.style.display = 'block'
});

btn_sair_registro.addEventListener("click", function(){
    aba_registro.style.display = 'none'
})




btn_excluir.addEventListener("click",function(){
    aba_excluir.style.display = 'block'
});

btn_sair_excluir.addEventListener("click", function(){
    aba_excluir.style.display = 'none'
})





btn_editar.addEventListener("click",function(){
    aba_editar.style.display = 'block'
});

btn_sair_editar.addEventListener("click", function(){
    aba_editar.style.display = 'none'
})



