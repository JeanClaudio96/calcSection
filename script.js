const tabela = {"secao":[1.5,2.5,4,6,10,16,25,35,50,70,95,120,150,185,240,300,400,500,630,800,1000],"A1":{"cc2":[14.5,19.5,26,34,46,61,80,99,119,151,182,210,240,321,367,438,502,578,669,767],"cc3":[13.5,18,24,31,42,56,73,89,108,136,164,188,216,245,286,328,390,447,514,593,679]},"A2":{"cc2":[14,18.5,25,32,43,57,75,92,110,139,167,192,219,248,291,334,398,456,526,609,698],"cc3":[13,17.5,23,29,39,52,68,83,99,125,150,172,196,223,261,298,355,406,467,540,618]},"B1":{"cc2":[17.5,24,32,41,57,76,101,125,151,192,232,269,309,353,415,477,571,656,758,881,1012],"cc3":[15.5,21,28,36,50,68,89,110,134,171,207,239,275,314,370,426,510,587,678,788,906]},"B2":{"cc2":[16.5,23,30,38,52,69,90,111,133,168,201,232,265,300,351,401,477,545,626,723,827],"cc3":[15,20,27,34,46,62,80,99,118,149,179,206,236,268,313,358,425,486,559,645,738]},"C":{"cc2":[19.5,27,36,46,63,85,112,138,168,213,258,299,344,392,461,530,634,729,843,978,1125],"cc3":[17.5,24,32,41,57,76,96,119,144,184,223,259,299,341,403,464,557,642,743,865,996]},"D":{"cc2":[22,29,38,47,63,81,104,125,148,183,216,246,278,312,361,408,478,540,614,700,792],"cc3":[18,24,31,39,52,67,86,103,122,151,179,203,230,258,297,336,394,445,506,577,652]}}

function prosseguir(){
    var select_estado = document.getElementById("estado");
    var tensao = select_estado.options[select_estado.selectedIndex].value;
    sessionStorage.setItem("tensao", tensao);

    var select_unidade = document.getElementById("unidade");
    var unidade = select_unidade.options[select_unidade.selectedIndex].value;
    sessionStorage.setItem("unidade", unidade);
    
    if(tensao != "" && unidade!= ""){
        open("dados.html", "_self");   
    }
    else{
        alert("Preencha os campos abaixo");
    }
}

function onLoad(){
    var unidade = sessionStorage.getItem("unidade");
    if(unidade == "va"){
        document.getElementById("fp").style.display = "none";
        document.getElementById("fp_label").style.display = "none";
        document.getElementById("fp").value = "1";
    }
}

function voltar(){
    open("inicio.html", "_self");
}

function calcular(){

    var carga = new cabo(document.getElementById("carga").value, selectopt("tipo"), selectopt("alimentacao"), document.getElementById("fp").value, selectopt("metodo"), selectopt("fca"), selectopt("fct"), document.getElementById("distancia").value);

    var correnteCorrigida = carga.corrente_corrigida().toFixed(2);

    var secao = search(carga.metodo(), carga.alimentacao(), correnteCorrigida);
    alert("O condutor que deve ser utilizado para alimentar sua carga é de " + secao + "mm²");
    sessionStorage.setItem("carga", {"carga": carga._carga, "tipo": carga._tipo});
}

class cabo{
    constructor(carga, tipo, alimentacao, fp, metodo, fca, fct, trecho){
        this._carga = carga;
        this._tipo = tipo;
        this._alimentacao = alimentacao;
        this._fp = fp;
        this._metodo = metodo;
        this._fca = fca;
        this._fct = fct;
        this._trecho = trecho;
    }

    corrente_projeto(){
        if(this._alimentacao == 1){
            return this._carga/(sessionStorage.getItem("tensao")*this._fp); 
        }
        else if(this._alimentacao == 3){    
            return this._carga/(sessionStorage.getItem("tensao")*3*this._fp);
        }
    }

    corrente_corrigida(){
        return this.corrente_projeto()/(this._fca*this._fct);
    }

    metodo(){
        return this._metodo;
    }

    alimentacao(){
        return this._alimentacao;
    }
}

function selectopt(selectoption){
    var select_opt = document.getElementById(selectoption);
    var opt = select_opt.options[select_opt.selectedIndex].value;
    return opt;
}

function search(metodo, alimentacao, corrente_Corrigida){
    if(metodo == "A1"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.A1.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.A1.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }

    if(metodo == "A2"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.A2.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.A2.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }

    if(metodo == "B1"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.B1.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.B1.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }
    
    if(metodo == "B2"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.B2.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.B2.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }

    if(metodo == "C"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.C.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.C.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }

    if(metodo == "D"){
        if(alimentacao == 1){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.D.cc2[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }

        else if(alimentacao == 3){
            for(var i=0; i<=tabela.secao.length; i++){
                var correnteSecao = tabela.D.cc3[i];
                var secao = tabela.secao[i];
                if(correnteSecao>=corrente_Corrigida){
                    break;
                }
            }
        }
    }

    return secao;
}

function onLoadHistorico(){
    let historico = sessionStorage.getItem("carga");
    document.getElementsByClassName("historico") = historico;
}