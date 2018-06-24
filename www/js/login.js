$(document).ready(function(){
    $("#inputEmail").keypress(function(){
        var usuario = $("#inputEmail").val();
        //console.log(usuario.trim());
        socket.emit('identify', usuario.trim());
    });
    $("#menu0").fadeTo(0000,1,function(){});
    $("#inicio").click();

    $("#pacientes").on("click",function(e){
    $("#menu0").fadeTo(1000,0,
      function(){
        $("#menu0").css("display","none");
        $("#c_navbar").fadeTo(1000,1,function(){});
        $("#c_navbar").css("display","");
        $("#admin_pacientes_app").fadeTo(1000,1,function(){});
      });
    });

    $("#inicio").on("click",function(e){
    $("#admin_pacientes_app").fadeTo(1000,1,
      function(){
        $("#admin_pacientes_app").css("display","none");
        $("#c_navbar").fadeTo(0,0,function(){});
        $("#c_navbar").css("display","none");
        $("#menu0").fadeTo(1000,1,function(){});
      });
    });    
});

function foto_usuario(datos){
  //console.log("message: ",datos);
  $(".user-image_m").attr("src",datos.url_user);

}
function btnMenu(data){    
    console.log("BTN Menu-> ",data);
    usuario.cod = $(data).attr("id");
    usuario.aplicacion_parent_k = $(data).attr("data-app");
    usuario.pagina = $(data).attr("data-name");
    socket.emit("solicitudAcceso",usuario); 
}
/*function btnAccion(data){
  usuario.accion = $(data).attr("data-nombre");
  usuario.cod_ac = $(data).attr("data-accion");
  usuario.cod = $(data).attr("id");
  socket.emit("solicitudAcceso",usuario);
}*/

function bloquearDatos(tab){
	//console.log("Bloqueando datos: ",tab);
	$.each($(tab+" input"),function(item,index){
		$(index).attr("disabled",true);
	});
	$.each($(tab+" dir_textarea"),function(item,index){
		//$(index).attr("disabled",true);
    if($(index).data("wysihtml5")){
      $(index).data("wysihtml5").editor.composer.disable();
    }else{
      $(index).attr('disabled','disabled');
    }
	});
	$.each($(tab+" select"),function(item,index){
		$(index).attr("disabled",true);
	});
}
function liberarDatos(tab){
	//console.log("Liberando campos");
	$.each($(tab+" input"),function(item,index){
		$(index).attr("disabled",false);
	});
	$.each($(tab+" dir_textarea"),function(item,index){
		$(index).data("wysihtml5").editor.composer.enable();
	});
	$.each($(tab+" select"),function(item,index){
		$(index).attr("disabled",false);
	});
}
function validarMenu(data){
	var tab = $(data).attr("href");
	bloquearDatos(tab);
	/*if($("#femenino").prop("checked")==true){
		$("#femeninof").prop("checked",true);
		$("#masculinof").prop("checked",false);
		$("#antecedentes_femeninos").css("display","");
	}else if($("#femenino").prop("checked")!=true){
		$("#masculinof").prop("checked",true);
		$("#femeninof").prop("checked",false);
		$("#antecedentes_femeninos").css("display","none");
	}*/

	usuario.menu	= $(data).attr("name");
	usuario.cod 	= $(data).attr("id");
	usuario.pagina	= $(data).attr("data-pagina");
    //console.log("Validar Menu-> ",usuario);
	socket.emit("validarMenu",usuario);
}
