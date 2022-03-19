var dados = []
// var registro = {}
// registro.ID = 1
// registro.Nome = "Fernando"
// registro.Sobrenome = "Andrade"
// registro.DataNascimento = "08/03/1983"
// registro.Formacao = "Superior"


// dados.push(registro)
// localStorage.setItem("__dados__", JSON.stringify(dados))
// localStorage.getItem("__dados__")

function ApagaRegistro(id) {
  let _confirm = confirm("Deseja realmente apagar os dados desse registro?")
  if (_confirm) {
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }
    PopulaTabela()
  }
}

function EditaRegistro(id) {
  $("#modalRegistro").modal("show")
  dados.forEach(function (item) {
    if (item.ID == id) {
      $("#hdID").val(item.ID)
      $("#txtNome").val(item.Nome)
      $("#txtSobrenome").val(item.Sobrenome)
      $("#txtDataNascimento").val(item.DataNascimento.substr(5, 2) + "-" + item.DataNascimento.substr(8) + "-" + item.DataNascimento.substr(0, 4))
      $("#txtFormacao").val(item.Formacao)
    }
  })
}

function PopulaTabela() {
  if (Array.isArray(dados)) {

    localStorage.setItem("__dados__", JSON.stringify(dados));

    $("#tbldados tbody").html("");

    dados.forEach(function (item) {
      //Template string
      $("#tbldados tbody").append(`<tr>
  <td>${item.ID}</td>
  <td>${item.Nome}</td>
  <td>${item.Sobrenome}</td>
  <td>${item.DataNascimento}</td>
  <td>${item.Formacao}</td>
  <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.ID});"><i class="fa fa-edit" /></button></td>
  <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.ID});"><i class="fa fa-trash" /></button></td>
  </tr>`);
    });
  }
}

$(function () {
  //Executa ao carregar a tela!
  dados = JSON.parse(localStorage.getItem("__dados__"));
  if (dados) {
    PopulaTabela();
  }
  $("#btnSalvar").click(function () {
    //Evento click do botão salvar
    let _id = $("#hdID").val();
    let Nome = $("#txtNome").val();
    let Sobrenome = $("#txtSobrenome").val();
    let DataNascimento = new Date($("#txtDataNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" });
    let Formacao = $("#txtFormacao").val();


    let registro = {};
    registro.Nome = Nome;
    registro.Sobrenome = Sobrenome;
    registro.DataNascimento = DataNascimento;
    registro.Formacao = Formacao;
    if (!_id || _id == "0") {
      registro.ID = dados.length + 1;
      dados.push(registro);
    } else {
      dados.forEach(function (item) {
        if (item.ID == _id) {
          item.Nome = Nome
          item.Sobrenome = Sobrenome
          item.DataNascimento = DataNascimento
          item.Formacao = Formacao
        }
      })
    }


    alert("Registro salvo com sucesso!"); //Exibe uma mensagen
    $("#modalRegistro").modal("hide"); //Fecha a minha modal

    //Limpeza dos campos
    $("#hdID").val("0");//Limpa meu hidden field
    $("#txtNome").val(""); //Limpa o campo Nome da modal
    $("#txtSobrenome").val(""); //Limpa o campo Sobrenome da modal
    $("#txtDataNascimento").val(""); //Limpa o campo DataNascimento da modal
    $("#txtFormacao").val(""); //Limpa o campo Fomaçao da modal

    PopulaTabela();
  });
});
