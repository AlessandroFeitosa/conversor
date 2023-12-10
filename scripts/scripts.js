const caminhoJson="data/unidades.json";var dadosJson="",arrayCoeficientes=[],casasDecimais=3,checkComum=!1,checkSi="",dolar="",euro="",bitcoin="";const idCategoria="selecao-categoria",idTipo="selecao-tipo",idUnidade="selecao-unidade",idUnidade2="selecao-unidade-2",idTextUnidade="text-unidade",idTextUnidade2="text-unidade-2",idRangeDecimais="range-decimais",idTextDecimais="text-decimais",idSelectMoedas="selecao-moeda",objSelectCategoria=document.getElementById(idCategoria),objSelectTipo=document.getElementById(idTipo),objSelectUnidade=document.getElementById(idUnidade),objSelectUnidade2=document.getElementById(idUnidade2),objTextUnidade=document.getElementById(idTextUnidade),objTextUnidade2=document.getElementById(idTextUnidade2),objRangeDecimais=document.getElementById(idRangeDecimais),objTextDecimais=document.getElementById(idTextDecimais),objSelectMoeda=document.getElementById(idSelectMoedas);async function extraiJson(e){return await fetch(e).then((e=>e.json())).then((e=>{try{return e}catch(e){return console.error("Erro ao processar o JSON: "+e),[]}})).catch((e=>alert("Erro ao acessar a base de dados "+e)))}async function funcaoPrincipal(){dadosJson=await extraiJson(caminhoJson)}function verifica(){setTimeout((()=>{""===dadosJson?verifica():extraiCategoria(idCategoria)}),"200")}function extraiCategoria(e){try{let t=dadosJson,o=[];for(let e in t)t[e].categoria&&o.push(t[e].categoria);insereDadosCombobox(removerElementosRepetidos(o),e),extraiTipo(idTipo)}catch(e){return alert("Erro ao acessar a base de dados. "+e),[]}}function removerElementosRepetidos(e){const t={},o=[];for(const a of e)t[a]||(t[a]=!0,o.push(a));return o}function limpaCombobox(e){document.getElementById(e).innerHTML=""}function insereDadosCombobox(e,t){const o=document.getElementById(t);for(let t in e){const a=document.createElement("option");a.text=e[t],o.add(a)}}function extraiTipo(e){try{let t=[],o=dadosJson,a=objSelectCategoria.value;for(let e in o)o[e].categoria===a&&t.push(o[e].tipo);limpaCombobox(e),insereDadosCombobox(removerElementosRepetidos(t),e),extraiUnidade(idUnidade)}catch(e){return alert("Erro ao acessar a base de dados "+e),[]}}function extraiUnidade(e){try{let t=dadosJson,o=[];arrayCoeficientes=[];let a=objSelectTipo.value;if(!1===checkComum)if(""===checkSi)for(let e in t)t[e].tipo===a&&(o.push(t[e].nick),arrayCoeficientes.push(t[e].coeficiente));else for(let e in t)t[e].tipo===a&&t[e].sistema===checkSi&&(o.push(t[e].nick),arrayCoeficientes.push(t[e].coeficiente));else if(""===checkSi)for(let e in t)t[e].tipo===a&&t[e].frequente===checkComum&&(o.push(t[e].nick),arrayCoeficientes.push(t[e].coeficiente));else for(let e in t)t[e].tipo===a&&t[e].sistema===checkSi&&t[e].frequente===checkComum&&(o.push(t[e].nick),arrayCoeficientes.push(t[e].coeficiente));limpaCombobox(e),insereDadosCombobox(removerElementosRepetidos(o),e),limpaCombobox(e+"-2"),insereDadosCombobox(removerElementosRepetidos(o),e+"-2"),calcula()}catch(e){return alert("Erro ao acessar a base de dados. (Extrai unidades)"+e),[]}}function calcula(){if(""===objTextUnidade.value)return void(objTextUnidade2.value="");let e=objSelectUnidade.selectedIndex,t=objSelectUnidade2.selectedIndex;if(-1===e&&(e=0),-1===t&&(t=0),"Temperatura"===objSelectCategoria.value)calculaTemperatura(e,t);else{let o=arrayCoeficientes[e]/arrayCoeficientes[t];objTextUnidade2.value=Math.round(Number(objTextUnidade.value)*o*10**casasDecimais)/10**casasDecimais}ajustaTexto()}function calculaTemperatura(e,t){0===e&&1===t&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)-273.15)*10**casasDecimais)/10**casasDecimais),1===e&&0===t&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)+273.15)*10**casasDecimais)/10**casasDecimais),0===e&&2===t&&(objTextUnidade2.value=Math.round((1.8*Number(objTextUnidade.value)-459.67)*10**casasDecimais)/10**casasDecimais),2===e&&0===t&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)+459.67)/1.8*10**casasDecimais)/10**casasDecimais),1===e&&2===t&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)/5*9+32)*10**casasDecimais)/10**casasDecimais),2===e&&1===t&&(objTextUnidade2.value=Math.round(5*(Number(objTextUnidade.value)-32)/9*10**casasDecimais)/10**casasDecimais),e===t&&(objTextUnidade2.value=objTextUnidade.value)}function decimais(){objTextDecimais.innerHTML=objRangeDecimais.value+" casas decimais",casasDecimais=Number(objRangeDecimais.value),calcula()}function unidadesComuns(){!0===checkComum?(checkComum=!1,extraiUnidade(idUnidade)):(checkComum=!0,extraiUnidade(idUnidade))}function sistemaSi(){""===checkSi?(checkSi="SI",extraiUnidade(idUnidade)):(checkSi="",extraiUnidade(idUnidade))}function trocaUnidades(){let e=objSelectUnidade.selectedIndex;objSelectUnidade.selectedIndex=objSelectUnidade2.selectedIndex,objSelectUnidade2.selectedIndex=e,calcula()}function ajustaTexto(){objTextUnidade.value.length>8&&objTextUnidade.value.length<=11?objTextUnidade.style.fontSize="1.5rem":objTextUnidade.value.length>11?objTextUnidade.style.fontSize="1rem":objTextUnidade.style.fontSize="2rem",objTextUnidade2.value.length>8&&objTextUnidade2.value.length<=11?objTextUnidade2.style.fontSize="1.5rem":objTextUnidade2.value.length>11?objTextUnidade2.style.fontSize="1rem":objTextUnidade2.style.fontSize="2rem"}function getCotacoes(){fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then((e=>e.json())).then((e=>{dolar=e.USDBRL.bid||"Não disponível",euro=e.EURBRL.bid||"Não disponível",bitcoin=e.BTCBRL.bid||"Não disponível",Number(dolar)&&(dolar=Number(dolar).toFixed(2)),Number(euro)&&(euro=Number(euro).toFixed(2)),Number(bitcoin)&&(bitcoin=Number(bitcoin).toFixed(2)),printCotacoes()})).catch((e=>console.error(e)))}function printCotacoes(){"Real"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent="R$ 1,00",document.getElementById("cotacoes-dolar").textContent=`R$ ${dolar}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`R$ ${euro}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`R$ ${bitcoin}`.replace(".",",")):"Dolar"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent=`$ ${(1/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`$ ${(dolar/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`$ ${(euro/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`$ ${(bitcoin/dolar).toFixed(2)}`.replace(".",",")):"Euro"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent=`E$ ${(1/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`E$ ${(dolar/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`E$ ${(euro/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`E$ ${(bitcoin/euro).toFixed(2)}`.replace(".",",")):(document.getElementById("cotacoes-real").textContent=`E$ ${(1/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`E$ ${(dolar/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`E$ ${(euro/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`E$ ${(bitcoin/bitcoin).toFixed(2)}`.replace(".",","))}objTextUnidade.addEventListener("input",(()=>{calcula()})),funcaoPrincipal(),verifica(),decimais(),getCotacoes();