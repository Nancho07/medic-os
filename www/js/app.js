/*
 * Please see the included README.md file for license terms and conditions.
 */
var registro={};

var data_ini = {init:0,end:25};
var total_pacientes = 0;
var total_usuarios = 0;
var dadoAlta = 0;
var nuevoRegistro=0;
var expedientes = [];
var preclinica = [];
var padecimientos = [];
var tenido = [];

var vresp_imc=0;
var vresp_cint=0;
var vresp_ica=0;
var vresp_igc=0;
var imcf=0;

var socket;
var messages = [];
var mensaje={};
var roster = [];
var name = '';
var email = '';
var usuario ={};
var text = '';
var alertas = {};
var permisos;
var resp_sistole = 0;
var resp_sistole_text="";
var resp_diastole = 0;
var resp_diastole_text="";
var inicio = "",rootUrl="";
var programaConsulta ={};
    //usuario.prefix="inadi";
    usuario.citas = {};
    usuario.buscarPersonal={};
    usuario.periodo_citas="mes";
    usuario.menu="";
    usuario.menus={};
    usuario.menus.seleccionar=false;

function ImprimirObjeto(o,text) {
    var salida = "";
    for (var p in o) {
      salida += p + '\n';
    }
};
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
function cargarMedicos(datos){
	usuario.cambioArea = datos;
	//agendaMenu();
	socket.emit("buscarMedicos",usuario); 
}
function cargarMedicosData(datos){
	usuario.citas.doctor_k = datos;    
	agendaMenu();
}
function agendaMenu(){
	$(".pacientes-list").empty();
	$(".pacientes-list0").empty();
	$(".pacientes-list1").empty();
	$("#p_cancelados").text(0);
	$("#p_atendidos").text(0);
	$("#p_hoy").text(0);
	usuario.citas.pagina	= "menu";
	usuario.periodo_citas = "dia";
	usuario.citas.especialidad_k=$("#areas").val();
	usuario.citas.doctor_k=$("#nombreDr").val();
	usuario.citas.fecha = {};
	usuario.citas.fecha.start=moment(new Date()).format('YYYY-MM-DD');
	usuario.citas.fecha.end=moment(new Date()).format('YYYY-MM-DD');
	usuario.citas.cita_k=0;
	usuario.fecha_hoy=moment(new Date()).format('YYYY-MM-DD');
    //console.log(usuario);
	socket.emit("cargarCitasMenu",usuario);
}
function buscarAtencionMedica(){
 	 usuario.citas.pagina	= "menu";
 	 usuario.periodo_citas = "dia";
 	 //usuario.citas.name	= getCookie('usuario_medicall');
	 if(usuario.changeDoctor == 1){

	 }else{
         /* usuario doctor_k es para las enfermeras puedan seleccionar el doctor */
		 usuario.citas.doctor_k=usuario.config_k;
	 }
	 //usuario.email=getCookie('usuario_medicall_email');
 	 usuario.citas.fecha = {};
 	 usuario.citas.fecha.start=moment(new Date()).format('YYYY-MM-DD');
 	 usuario.citas.fecha.end=moment(new Date()).format('YYYY-MM-DD');
 	 //usuario.prefix=getCookie('usuario_medicall_prefix');
 	 usuario.citas.cita_k=0;
	 usuario.fecha_hoy=moment(new Date()).format('YYYY-MM-DD');
	 //console.log("Agenda Menu2: ",usuario);
 	 socket.emit("buscarAtencionMedica",usuario);
}
function guardarOrden(){
    var data=[];
    $.each($(".pacientes-list span"),function(item,index){
        if($(index).hasClass("text")==true){
            var datos = {}
            var texto = $(index).text();
            var hora = texto.trim();
            var hora_ant = $(index).attr("data-time");
            var cita_k = $(index).parent().parent().parent().parent().attr("id");
            datos.hora_ant= hora_ant;
            datos.hora= hora;
            datos.cita_k=cita_k;
            //console.log(datos);
            if(hora!=hora_ant){
                data.push(datos);
            }
        }
    });
    usuario.reordenarCitas = data;
    //console.log(usuario)
    socket.emit("reOrdenarCitas",usuario);
}
function calcular_edad(fecha){
  var nace = fecha.split("/");

  var dia = parseInt(nace[0]);
  var mes = parseInt(nace[1]);
  var ano = parseInt(nace[2]);
  //console.log("Nacimiento: ",dia," / ",mes," / ",ano);
  var fecha_hoy = new Date();
  var ahora_ano = fecha_hoy.getYear();
  var ahora_mes = fecha_hoy.getMonth();
  var ahora_dia = fecha_hoy.getDate();
  var edad = (ahora_ano + 1900) - ano;

    if ( ahora_mes < (mes - 1)){
      edad--;
    }
    if (((mes - 1) == ahora_mes) && (ahora_dia < dia)){
      edad--;
    }
    if (edad > 1900){
        edad -= 1900;  
    }
    return edad;
    //alert("¡Tienes " + edad + " años!");
}
function crearBotones(data,callback){
    if(data.valor=='true'){
      var vclass = "btn btn-info btn-flat menuPersonal";// btn btn-light text-primary menuPersonal
      var sugest = data.sugest;
    }else{
      var vclass = "btn disabled btn-info btn-flat menuPersonal";//"btn disabled btn-light text-primary menuPersonal";
      var sugest="";
    }
    if(data.nombreac == 'Guardar'){

    }else if(data.nombreac == 'Buscar'){

    }else if(data.nombreac == 'Eliminar'){
      if(data.valor=='true'){
        var vclass = "btn btn-light text-danger elim menuPersonal";
        var sugest = data.sugest;
      }else{
        var vclass = "btn disabled btn-light text-danger menuPersonal";
        var sugest="";
      }
    }else if(data.nombreac == 'Nuevo'){

    }else if(data.nombreac == 'Imprimir'){

    }
    var button='<a type="button" id="'+sugest+
               '" data-app="'+data.aplicacion_k+
               '" class="'+vclass+
               '" data-nombre="'+data.nombreac+
               '" data-accion="'+data.cod_ac+
               '" style="margin:0px 5px 0px 5px" data-toggle="modal">'+data.nombreac.toProperCase()+'</a>';
    if(data.cod_ac == "buscar_datos"){
      $("#"+data.sugest).attr("data-toggle","modal");
    } 
    callback(null,button);
}
//rootUrl="http://medic-os.softtek.hn/"; 
//rootUrl="http://35.225.110.101:3000";
//rootUrl="http://192.168.80.1:3000";
//socket = io.connect(rootUrl);  
function coneccion(){
    usuario.pass = MD5($("#inputPassword").val());
    usuario.usuario = $("#inputUsuario").val();
    usuario.email = $("#inputEmail").val();
    usuario.pagina  = "loggin";    
    rootUrl=$("#inputrootUrl").val();
    socket = io.connect(rootUrl);  
    socket.on('connect', function() { 
       socket.emit('loggin',usuario);
    }); 
    socket.on('disconnect', function() { 
        conneccion="no";
        alertas.contenido='El servidor se ha desconectado a las...'+moment(new Date()).format('DD/MM/YYYY HH:ss:mm');
        alertas.btnConfirma="No";
        alertas.funcionConfirma=""; 
        alertas.funcionCancela=""; 
        mensaje.tema = 'supervan'; 
        alertas.icono="fa fa-thumbs-down";
        alerta(alertas); 
    }); 
    socket.on("loggin",function(datos){
        if(datos.success==true){
          usuario.usuario = datos.usuario;
          usuario.email_usuario = datos.email_usuario;
          usuario.config_k = datos.config_k;          
          usuario.nombre = datos.nombre;

          usuario.usuario_k = datos.usuario_k;
          usuario.area_k = datos.area_k;
          usuario.especialidad_k = datos.area_k;
          usuario.especialidad = datos.especialidad;
          usuario.foto = datos.foto;

          usuario.prefix = datos.prefix;
          usuario.clinica = datos.clinica;          
          usuario.pagina="menu";
          usuario.aplicacion_parent_k = 6;
          activate_page("#menu");  
          //$("#btns_carusel_menu").empty(); 
          //$("#btns_citas_menu").empty();
          //$("#btns_pacientes_menu").empty();
          socket.emit('identificacion', usuario); 
          //return false;
        }else{          
          mensaje = {mensaje:"No Tiene Autorización",success:false};
          delServidor(mensaje); 
          activate_page("#mainpage"); 
            return false;
        } 
    });
    socket.on("buscarMedicos",function(data){
        var total = data.data.length;
        $("#nombreDr").empty();
        for(var i = 0; i<data.data.length;i++){
            var medicos = '<option value="'+data.data[i].usuario_k+'">'+data.data[i].nombre+'</option>';
            $("#nombreDr").append(medicos);
            if(i+1 == total){
                $("#restablecerOrden").click();
            }
            usuario.changeDoctor = 0;            
        }
        $("#nombreDr option[value="+usuario.usuario_k+"]").attr('selected', true);
        $(".fc-month-button").click();
    });
    /*$("#restablecerOrden").click(function(){
        alert("yo");
        agendaMenu();*/
        /*$.each($(".pacientes-list span"),function(item,index){
            if($(index).hasClass("text")==true){
                var texto = $(index).text();
                var array = texto.split('-');
                var fin_texto = $(index).attr("data-time")+" -"+array[1]+" -"+array[2];
                $(index).text(fin_texto);
            }
        });*/
    //});
    socket.on("cargarCitasMenu",function(data){    
        //console.log("Cargar Citas Menu",data); 
        var p_cancelados = 0;
        if(data.success2==true){
                if(data.periodo_citas=="dia"){
                    $("#pacientes_hoy").empty();
                    $("#pacientes_hoy").val(data.parent2.length);

                    if(data.parent2.length>0){
                        $(".pacientes-list").empty();
                        $(".pacientes-list0").empty();
                        $(".pacientes-list1").empty();
                        for(var i = 0; i<data.parent2.length;i++){
                            if(data.parent2[i].cancelado===0){
                                var vclase = "";
                            }else{
                                var vclase = "text-danger";
                            }
                            if(data.parent2[i].foto!==null && data.parent2[i].foto!==""){
                                var imagen = rootUrl+"/img/"+usuario.prefix+"/pacientes/"+data.parent2[i].foto;
                            }else{
                                if(data.parent2[i].sexo=="F"){
                                    data.parent2[i].tipo_sexo = "Femenino";
                                    var imagen = "images/femenino.png";
                                }if(data.parent2[i].sexo=="M"){
                                    data.parent2[i].tipo_sexo = "Masculino";
                                    var imagen = "images/masculino.png";                                    
                                }else if(data.parent2[i].sexo==""){
                                    data.parent2[i].tipo_sexo = "";
                                    var imagen = "images/salud.png";                                     
                                }
                            }
                            if(data.parent2[i].sexo=="F"){
                                    data.parent2[i].tipo_sexo = "Femenino";
                            }if(data.parent2[i].sexo=="M"){
                                data.parent2[i].tipo_sexo = "Masculino";                                 
                            }else if(data.parent2[i].sexo==""){
                                data.parent2[i].tipo_sexo = "";                             
                            }
                            var fecha_nacimiento = moment(data.parent2[i].fecha_nacimiento).format('DD/MM/YYYY');
                            var edadReal = calcular_edad(fecha_nacimiento);
                            var texto2="Edad: "+edadReal+' años, '+data.parent2[i].tipo_sexo;

                            if($(".display_pre").hasClass("disabled")){
                                var boton_preClinica ='';                                 
                            } else{
                                var boton_preClinica ='<div align="left" class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="padding:0px;float:left;">'+
                                            '<button type="button" class="btn-primary btn-form display-4 btn_p_c" style="border-radius:30px;width:100%;margin-top: 15px;" data-expediente="'+data.parent2[i].expediente_k+'" data-identidad="'+data.parent2[i].identidad+'" data-nombre="'+data.parent2[i].pnombre+'" data-apellido="'+data.parent2[i].papellido+'" data-prefix="'+data.prefix+
                                            '" data-texto2="'+texto2+'" data-sexo="'+data.parent2[i].sexo+'" data-edad="'+edadReal+'">Pre-C</button>'+
                                        '</div>';
                            }

                            var texto_list = '<li id="'+data.parent2[i].cita_k+'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="/*height:80px;*/padding:0px;overflow:auto">'+
                                '<span class="handle">'+
                                    '<div align="left" class="col-xs-2 col-sm-3 col-md-3 col-lg-3" style="float:left;margin-top: 10px;/*width:20%;padding:0px;height:100%;*/">'+
                                        '<img src='+imagen+' width="75%" style="border-radius: 30px;"/>'+
                                    '</div>'+
                                    '<div align="left" class="col-xs-8 col-sm-7 col-md-7 col-lg-7" style="padding:0px;height:100%;float:left;width:80%">'+
                                    '<h5 class="list-group-item-heading text-white data-nombres" style="margin-top:5px;">'+data.parent2[i].paciente+'</h5>'+
                                        '<H6 class=" text-white" style="padding: 0px;margin: 0px;"> Hora: <span data-time = "'+data.parent2[i].time+'" class="text">'+
                                            data.parent2[i].time+'</span>'+' - Edad: '+edadReal+' años'+
                                        '</H6>'+
                                    '</div>'+boton_preClinica+                                    
                                    '<input type="checkbox" value="" name="" id="'+data.parent2[i].expediente_k+'" style="display:none"/>'+
                                '</span>'+                                
                            '</li>';

                            if(data.parent2[i].cancelado===0){
                                $(".pacientes-list").append(texto_list);
                                $(".btn_p_c").bind("click",function(){
                                    if($("#btn_menu_preClinica")){
                                        activate_page("#3b"); 
                                        location.href="#3b";
                                    }else{

                                    }

                                    $("#buscar").val($(this).attr("data-identidad")); 
                                    $("#pre_identidad").val($(this).attr("data-identidad"));
                                    $("#pre_paciente_k").val($(this).attr("data-expediente"));
                                    $("#pre_nombre").val($(this).attr("data-nombre"));
                                    $("#pre_apellido").val($(this).attr("data-apellido"));
                                    $("#pre_prefix").val($(this).attr("data-prefix"));

                                    var pre_data = $(this).parent().parent().parent().clone();
                                    $(pre_data).attr("id","id_pre");
                                    $(pre_data).find("img").attr("id","imgPre");
                                    $(pre_data).find("H5").attr("id","pre_nombres");
                                    $(pre_data).find("input").remove();
                                    $(pre_data).find("button").removeClass("btn_p_c");
                                    $(pre_data).find("button").attr("id","btn_p_c");
                                    $(pre_data).find("button").text("Citas");
                                    $(pre_data).find("H6").text($(this).attr("data-texto2"));
                                    //console.log();
                                    $("#pre_data").empty();
                                    $("#pre_data").append(pre_data);
                                    $("#btn_p_c").bind("click",function(){
                                        activate_page("#citas_hoy"); 
                                        location.href="#citas_hoy";
                                    });
                                    $("#imgPre").bind("click",function(){                                            
                                        capturePhoto();
                                    });
                                    /********************** fondo *****************/
                                    $.each($(".pacientes-list li"),function(item,index){
                                        if($(index).hasClass("seleccionado")==true){
                                            $(index).removeClass("seleccionado");    
                                        }
                                    });
                                    $(this).parent().parent().parent().addClass("seleccionado");
                                    /********************** SEXO *****************/
                                    if($(this).attr("data-sexo").toLowerCase()=="m" || $(this).attr("data-sexo").toLowerCase()=="masculino"){
                                        $("#masculinof").prop("checked",true);
                                        $("#femeninof").prop("checked",false);
                                    }else if($(this).attr("data-sexo").toLowerCase()=="f" || $(this).attr("data-sexo").toLowerCase()=="femenino"){
                                        $("#masculinof").prop("checked",false);
                                        $("#femeninof").prop("checked",true);
                                    }else if($(this).attr("data-sexo")==""){
                                        $("#masculinof").prop("checked",false);
                                        $("#femeninof").prop("checked",false);
                                    }
                                    /************** /SEXO ************************/
                                    /********************** EDAD *****************/
                                    $("#edadf").val($(this).attr("data-edad"));
                                    /********************** /EDAD *****************/

                                    return false;
                                });
                            }else{
                                p_cancelados++;
                                $("#p_cancelados").text(p_cancelados);
                                $(".pacientes-list1").append(texto_list);
                                //$("#quitar_"+data.parent2[i].cita_k).remove();
                            }
                            if(i+1==data.parent2.length){
                                buscarAtencionMedica();
                            }
                        }
                    }
                }
        }else{
            $("#pacientes_hoy").val(0);
            $("#total_pacientes").val(0);
            $("#p_atendidos").val(0);
            $("#p_hoy").text(0);
            $(".pacientes-list").empty();
            $(".pacientes-list0").empty();
            $(".pacientes-list1").empty();
            var texto_list = '<li>'+
                '<span class="handle">'+
                    '<i class="fa fa-ellipsis-v"></i>'+
                    '<i class="fa fa-ellipsis-v"></i>'+
                '</span>'+
                '<input type="checkbox" value="" name="" id="" style="display:none"/>'+
                '<span class="text">'+data.mensaje2+'</span>'+
            '</li>';
            $(".pacientes-list").append(texto_list);
        }
        $(".pacientes-list").todolist({
            onCheck: function (ele) {
                //console.log("El registro ha sido chequeado")
            },
            onUncheck: function (ele) {
                //console.log("El registro ha sido liberado")
            }
        });
    });
    socket.on("cargarSinCitasMenu",function(data){
        var p_cancelados = 0;
        if(data.success2==true){
                if(data.periodo_citas=="dia"){
                    $("#p_sin_citas").text(0);
                    //$("#pacientes_hoy").val(data.parent2.length);
                    if(data.parent2.length>0){
                        $(".pacientes-list2").empty();
                        var atend =0;
                        for(var i = 0; i<data.parent2.length;i++){
                            if(data.parent2[i].cancelado===0){
                                var vclase = "";
                            }else{
                                var vclase = "text-danger";
                            }
              data.parent2[i].title =data.parent2[i].time+' - '+data.parent2[i].paciente+' - Edad: '+data.parent2[i].edadReal+" -> NO TENIA CITA";                            
                            //console.log(data.parent2[i].sexo)
                            if(data.parent2[i].sexo=="F"){
                                var imagen = "images/femenino.png";
                            }if(data.parent2[i].sexo=="M"){
                                var imagen = "images/masculino.png";
                            }else if(data.parent2[i].sexo==""){ 
                                var imagen = "images/salud.png";
                            }
                            var texto_list = '<li id="l2'+data.parent2[i].cita_k+'" class="" style="height:70px;">'+
                                '<span class="handle">'+
                                    '<div align="left" class="col-xs-2 col-sm-3 col-md-3 col-lg-3" style="padding:0px;height:100%;float:left;width:20%">'+
                                        '<img src='+imagen+' width="60%" />'+
                                    '</div>'+
                                    '<div align="left" class="col-xs-10 col-sm-9 col-md-9 col-lg-9" style="padding:0px;height:100%;float:left;width:80%">'+
                                    '<h5 class="list-group-item-heading text-white" style="margin-top:5px;">'+data.parent2[i].paciente+'</h5>'+
                                        '<H6 class=" text-white" style="padding: 0px;margin: 0px;"> Hora: <span data-time = "'+data.parent2[i].time+'" class="text">'+
                                            data.parent2[i].time+'</span>'+' - Edad: '+data.parent2[i].edadReal+' años'+
                                        '</H6>'+
                                    '</div>'+
                                '</span>'+
                                '<input type="checkbox" value="" name="" id="c'+data.parent2[i].expediente_k+'" style="display:none"/>'+
                            '</li>';
                            if(data.parent2[i].cancelado===0){
                                atend++;
                                //$("#p_sin_citas").text(atend);
                                $(".pacientes-list0").append(texto_list);
                                var id = data.parent2[i].expediente_k;
                                $("#l2"+id).addClass("done");
                                //console.log(parseInt(atendidos)+atend)
                            }else{
                                p_cancelados++;
                                $("#p_cancelados").text(p_cancelados);
                                $(".pacientes-list1").append(texto_list);
                            }
                            if(i+1==data.parent2.length){
                                var total=(i+1);
                                var tp0 = $("#total_pacientes").val();
                                var tp = parseInt(tp0)+parseInt(total);
                                $("#total_pacientes").val(tp);
                                $("#p_atendidos").text(tp);
                            }
                    }
                }
            }
        }
    });
    socket.on("buscarAtencionMedica",function(datos){
        //console.log("Buscar Atencion Medica-->->-> ",datos.parent2);
        var o = 0;
        var total = datos.parent2.length;
        for(var i = 0; i<total;i++){
            $(".pacientes-list input").each(function(item,index){
                var id = $(index).attr("id");                
                $("#total_pacientes").val(o);
                $("#p_atendidos").text(o);
                if(datos.parent2[i].expediente_k == id){
                    if(datos.parent2[i].cita_expediente!=null){
                        o=o+1;
                        $("#"+id).click();
                        $("#quitar_"+id).remove();
                        var liNuevo = $("#"+id).parent().clone();
                        $("#"+id).parent().remove();
                        $(".pacientes-list0").append(liNuevo);
                    }else if(datos.parent2[i].cita_pre!=null){
                        $("#"+id).click();
                    }else if(datos.parent2[i].cita_consulta!=null){
                        $("#"+id).click();
                    }
                }
           });
             if(i+1==total){
                 $("#pacientes_hoy").val($("#pacientes_hoy").val()-o);
                 $("#p_hoy").text(parseInt($("#pacientes_hoy").val())-parseInt($("#p_cancelados").text()));
                 usuario.citas.periodo="dia";
                 usuario.periodo_citas="dia";
                 socket.emit("cargarSinCitasMenu",usuario);
             }
        }
    });
    socket.on("buscarPaciente",function(datos){ 
        //console.log("Buscar Paciente: ",datos);
        if(datos.successData === true && (datos.pagina=="movil")){
            /************ FOTO *******************************/
            if(datos.data[0].foto!==null && datos.data[0].foto!==""){
                var imagen = rootUrl+"/img/"+usuario.prefix+"/pacientes/"+datos.data[0].foto;
            }else{
                if(data.parent2[i].sexo=="F"){
                    data.parent2[i].tipo_sexo = "Femenino";
                    var imagen = "images/femenino.png";
                }if(data.parent2[i].sexo=="M"){
                    data.parent2[i].tipo_sexo = "Masculino";
                    var imagen = "images/masculino.png";                                    
                }else if(data.parent2[i].sexo==""){
                    data.parent2[i].tipo_sexo = "";
                    var imagen = "images/salud.png";                                     
                }
            }
            /*************** /FOTO ***************************/
            $("#imgPre").attr("src",imagen);
            $("#pre_nombres").text(datos.data[0].nombre+" "+datos.data[0].apellido);
            var fecha_nacimiento = moment(datos.data[0].fecha_nacimiento).format('DD/MM/YYYY');
            var edadReal = calcular_edad(fecha_nacimiento);
            var texto2="Edad: "+edadReal+' años, '+datos.data[0].tipo_sexo;        
            /********************** SEXO *****************/
                var sexo = datos.data[0].sexo;
                if(sexo.toLowerCase()=="m" || sexo.toLowerCase()=="masculino"){
                    $("#masculinof").prop("checked",true);
                    $("#femeninof").prop("checked",false);
                }else if(sexo.toLowerCase()=="f" || sexo.toLowerCase()=="femenino"){
                    $("#masculinof").prop("checked",false);
                    $("#femeninof").prop("checked",true);
                }else if(sexo==""){
                    $("#masculinof").prop("checked",false);
                    $("#femeninof").prop("checked",false);
                }
            /************** /SEXO ************************/
            var hora = moment(new Date()).format('HH:mm:ss');
            var edad_sexo = 'Hora: <span data-time = "'+hora+'" class="text">'+hora+'</span>'+' - Edad: '+edadReal+' años';
            $("#pre_edad_sexo").empty();
            $("#pre_edad_sexo").append(edad_sexo);
            $("#edadf").val(edadReal);
            $("#imgPre").bind("click",function(){
                capturePhoto();
            });
        }else{
            alertas.contenido='Regitro sin expediente';
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alertas.icono="fa fa-ravelry";
            alerta(alertas); 
        }        
    });
    socket.on("accesoSolicitado",function(datos){     
      socket.emit('identificacion', usuario);
    });
    /*socket.on("message",function(datos){
    });*/
    socket.on("obtenerAccion", function(datos){
        //console.log("Obtener Accion-> ",datos);
    });
    socket.on("validarMenu",function(data){
        if(data.pagina=="Examen Fisico"){
            activate_page("#3b");  
            location.href="#3b";
            liberarDatos("#3b");
            /*openExamen("null", "Patologicos");
            nuevosRegistrosPreclinica();
            socket.emit("getPreclinica",data);
            usuario.paciente_k=$("#paciente_k").val();
            socket.emit("historialGlucosa",usuario);*/
            return false;
        }
    });
    socket.on("permisosCargados",function(datos){   
        console.log("Permisos Cargados 1-> ",datos);
        $.each(datos,function(i,data){ 
          if(data.pagina=="menu"){            
            if(data.valor=='true'){
              var vclass = "btn pi-draggable btn-outline-primary";
            }else{
              var vclass = "btn disabled pi-draggable btn-outline-primary";
              data.color_icono="text-primary disabled";
            } 
            if(data.name=="citas" && data.valor == 'true'){ 
                if($("#btn_"+data.name)){
                    $("#btn_"+data.name).attr("id", data.sugest);
                    $("#"+data.sugest).attr("data-app", data.aplicacion_k);
                    $("#"+data.sugest).attr("data-name", data.name);
                    $("#"+data.sugest).attr("data-app-prevent-settings", "");
                }
                if($("#"+data.sugest).hasClass("activado")==true){
                      //console.log("Ya esta activo 1");
                }else{
                 $("#"+data.sugest).addClass("activado");
                 $("#"+data.sugest).bind("click",function(){
                    btnMenu(this);
                 }); 
                 $("#btn_menu_citas_hoy").bind("click",function(){                     
                    activate_page("#citas_hoy"); 
                    return false;
                 });      
                }                               
            }
            if(data.name=="pacientes" && data.valor == 'true'){         
                if($("#btn_"+data.name)){
                    $("#btn_"+data.name).attr("id", data.sugest);
                    $("#"+data.sugest).attr("data-app", data.aplicacion_k);
                    $("#"+data.sugest).attr("data-name", data.name);
                    $("#"+data.sugest).attr("data-app-prevent-settings", "");
                }
                if($("#"+data.sugest).hasClass("activado")==true){
                      //console.log("Ya esta activo 2");
                }else{
                    $("#"+data.sugest).addClass("activado");
                    $("#"+data.sugest).bind("click",function(){
                      btnMenu(this);
                    });   
                }  
            }
          }

          if( data.pagina=="pacientes" && data.nombre=="Examen Fisico" && data.nombreac!=null && data.nombreac!='Acceder'){   
            /*console.log("Examen Fisico-> ",data)
            crearBotones(data, function(err, result) {
              if(!err){                
                  if($("#"+data.sugest).hasClass("activado")==true){
                      //console.log("Ya esta activo 3");
                  }else{                      
                     //$("#c_btn-group_fisico").append(result);                     
                     $("#"+data.sugest).addClass("activado");
                     $("#"+data.sugest).bind("click",function(){
                      if(data.menu_href==null || data.menu_href==""){
                        btnAccion(this);
                      }else{
                        location.href=data.menu_href;
                      }
                     });     
                  }                 
              }else{
                //console.log("Error creando boton: ",err)
              }   
            });*/
          }else if( data.pagina=="pacientes" && data.nombre=="Examen Fisico" && data.nombreac!=null && data.nombreac=='Acceder'){

            if($("#"+data.cod_ac)){
              $("#"+data.cod_ac).attr("id", data.sugest);
              $("#"+data.sugest).attr("data-pagina", data.nombre);
              $("#"+data.sugest).attr("href", data.menu_href);
              if(data.valor=="true" ){
                $("#"+data.sugest).removeClass('disabled');
              }else{
                $("#"+data.sugest).addClass('disabled');
              }              
              $("#"+data.sugest+" i").first().removeClass().addClass(data.nombre_icono+" "+data.color_icono); 
              if($("#"+data.sugest).hasClass("activado")==true){

              }else{
                  $("#"+data.sugest).addClass("activado");
                  $("#"+data.sugest).bind("click",function(){
                      validarMenu(this);
                  });
              }
            }
          }
          if( data.pagina=="pacientes" && data.nombre == "Datos" && data.nombreac!=null && data.nombreac!='Acceder'){ 
              //console.log("NO HAY NADA")
            /*crearBotones(data, function(err, result) {
              if(!err){
                  $(".datos_pacientes").append(result);
                  if($("#"+data.sugest).hasClass("activado")==true){
                      //console.log("Ya esta activo 4");
                  }else{
                      $("#"+data.sugest).addClass("activado");
                      $("#"+data.sugest).bind("click",function(){
                      if(data.menu_href==null || data.menu_href==""){
                        btnAccion(this);
                      }else{
                        location.href=data.menu_href;
                      }
                     });
                  }

              }else{
                //console.log("Error creando boton: ",err)
              }
            });*/
          }else if( data.pagina=="pacientes" && data.nombre == "Datos" && data.nombreac!=null && data.nombreac=='Acceder'){
            if($("#"+data.cod_ac)){
              $("#"+data.cod_ac).attr("id", data.sugest);

              $("#"+data.sugest).attr("data-pagina", data.nombre);
              $("#"+data.sugest).attr("href", data.menu_href);
              if(data.valor=="true"){
                $("#"+data.sugest).removeClass('disabled');
              }else{
                $("#"+data.sugest).addClass('disabled');
              }   
              $("#"+data.sugest+" i").first().removeClass().addClass(data.nombre_icono+" "+data.color_icono);
              if($("#"+data.sugest).hasClass("activado")==true){
                    //console.log("Ya esta activo 5");
              }else{
                  $("#"+data.sugest).addClass("activado");
                  $("#"+data.sugest).bind("click",function(){
                      validarMenu(this);
                  });
              }
            }
          }
        });
    });
    /* viene despues de identificar al usuario solicitado desde menú */
    socket.on('validarAccesoMenu', function(datos) {        
        var data = datos.respuesta_acceso,
        total = data.length;
        for(var i=0;i<total;i++){
            var nombre = data[i].cod_ac;
            var acceso = data[i].valor;
            var sugest = data[i].permisos_cod;
            if(nombre=="acceder" && acceso == "false"){
                activate_page(data[i].menu_href); 
            }
            if(nombre == "crear_citas" && acceso=="true"){

            }else if(nombre == "crear_citas" && acceso=="false"){

            }
            if(nombre == "acceso_select" && acceso=="true"){
                $("#seccion_a").empty(); 
                usuario.menus.seleccionar=true;     
                var area_medico = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height:50%;">'+
                                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="float:left;">'+
                                        '<label class="narrow-control label-top-left text-white" style="margin-left: 10px;">Areas</label>'+
                                        '<select style="border-radius:20px;width:100%;padding:10px;" id="areas" class="">'+
                                            "<option data-sugest='"+sugest+"' value="+usuario.area_k+">"+usuario.area+"</option>"+
                                        '</select>'+
                                    '</div>'+
                                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="float:left;height: 90px;">'+
                                        '<label class="narrow-control label-top-left text-white"" style="margin-left: 10px;">Personal</label>'+
                                        '<select style="border-radius:20px;width:100%;padding:10px;" id="nombreDr" class="">'+
                                            "<option data-sugest='"+sugest+"' value="+usuario.config_k+">"+usuario.usuario_nombre+"</option>"+
                                        '</select>'+
                                    '</div>'+
                                   '</div>'+
                                   '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height:100%;">'+
                                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="float:left;height:60px;">'+
                                        '<button class="btn btn-sm btn-primary display-4" id="guardarOrden" style="border-radius:30px;width:95%;margin: 0px;">Guardar</button>'+
                                    '</div>'+
                                    '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="float:left;height:60px;">'+
                                        '<button class="btn btn-sm btn-primary display-4" id="restablecerOrden" style="border-radius:30px;width:95%;margin: 0px;">Restablecer</button> '+
                                    '</div>'+
                                '</div>';

                $("#seccion_a").append(area_medico); 
                $(".fc-month-button").click();
                $("#areas").bind( "change", function() {
                    cargarMedicos($(this).val());
                });
                $("#nombreDr").bind( "change", function() {
                    cargarMedicosData($(this).val());
                    usuario.citas.doctor_k=$(this).val();
                    if($(this).val()==usuario.doctor_k){
                        usuario.changeDoctor = 0;
                    }else {
                        usuario.changeDoctor = 1;
                    }
                    agendaMenu();
                    $(".fc-month-button").click();
                });
                $("#restablecerOrden").bind( "click", function() {
                    agendaMenu();
                });
        //agendaMenu(); 07/06/2018 desactivado
            }else if(nombre == "acceso_select" && acceso=="false"){
                $("#seccion_a").empty();
                usuario.menus.seleccionar=false;
                var area_medico =  '<div class="form-group col-sm-6" style="float:left;">'+
                "<div >"+
                "<label class='text-primary' for='areas'>&Aacute;rea</label>"+
                "<select class='form-control' id='areas' style='width: 100%;'>"+
                "<option value="+usuario.area_k+">"+usuario.area+"</option>"+
                "</select>"+
                "</div>"+
                "</div>"+
                "<div class='form-group col-sm-6' style='float:left;'>"+
                "<label class='text-primary' >M&eacute;dico</label>"+
                "<select class='form-control' id='nombreDr' style='width: 100%;'>"+
                "<option value="+usuario.config_k+">"+usuario.usuario_nombre+"</option>"+
                "</select>"+
                "</div>";
                $("#seccion_a").append(area_medico);
                //agendaMenu();
                $(".fc-month-button").click();
            }
            if(nombre == "cambiar_citas" && acceso=="true"){
                $("#btn_guardarOrden").empty();
                var btn = '<button type="button" id="guardarOrden" style="left:10px;position: absolute;" class="btn btn-light">Guardar</button>';

                var btn = '<button class="btn widget uib_w_56 d-margins btn-default" data-uib="twitter%20bootstrap/button" data-ver="1" id="guardarOrden">Guardar</button>';

                $("#btn_guardarOrden").append(btn);
                $("#guardarOrden").bind("click",function(){
                    guardarOrden();
                });
            }else if(nombre == "cambiar_citas" && acceso=="false"){
                var btn = '<button type="button" style="left:10px;position: absolute;" class="btn btn-light" disabled>Guardar</button>';
                $("#btn_menu0").append(btn);
            }
            if(i+1 == total){
                if(usuario.menus.seleccionar==true){
                    usuario.area_k=0;
                    socket.emit("cargarAreas",usuario);
                }
            }
        }        
    });
    socket.on('areasClinicas',function (data){
        $("#nombreDr").empty();
        $("#areas").empty();
        for(var i = 0; i<data.data.length;i++){
            var area = '<option value="'+data.data[i].area_k+'" style="font-size:1em">'+data.data[i].nombre+'</option>';
            $("#areas").append(area);
            if(i+1 == data.data.length){
                $("#areas option[value='"+usuario.area_k+"']").attr('selected', true);                
                cargarMedicos(usuario.especialidad_k);
            }
        } 
    });
}
function onAppReady(){
    delServidor({mensaje:'<img src="images/trayenta.png">',success:true,ancho:"100%"});
    
    if( navigator.splashscreen && navigator.splashscreen.hide ){   // Cordova API detected
        navigator.splashscreen.hide();
    }  
      
    $("#btn_menu_salir").click(function(){
        var mensaje={mensaje:"Hola"}
        delServidor(mensaje); 
    });
    $('#datePickerGlucosa').bootstrapMaterialDatePicker({
        currentDate:moment(new Date()).format('DD/MM/YYYY'),
        time: true,
        date: true,
        nowButton: true,
        nowText:"Hoy",
        format:'DD/MM/YYYY HH:mm',
        clearButton: false, 
        lang : 'es'
    });
    $("#span_f_gluco").click(function(){
        $("#datePickerGlucosa").click();
    });
    $("#enviar").click(function(){
        coneccion();
    }); 

    $(".pacientes-list").sortable({
        placeholder: "sort-highlight",
        handle: ".handle",
        forcePlaceholderSize: true,
        zIndex: 999999,
        update: function(){
            var horas = [];
            var valores;
            var minutos;
            var z=0;
            $.each($(".pacientes-list span"),function(item,index){
                if($(index).hasClass("text")==true){
                    var hora = moment($(index).attr("data-time"), 'HH:mm:ss');
                    horas.push(hora._d);
                }
            });
            horas.sort();
            var mtotal  = horas.length;
            var minute  = Math.max("1200000");//20minutos en milisegundos
            var result_min  = Math.min.apply(null,horas);
            var result  = moment(Math.min.apply(null,horas)).format('HH:mm:ss');
            var resultm = moment(Math.max.apply(null,horas)).format('HH:mm:ss');
            $.each($(".pacientes-list span"),function(item,index){
                var sumar = minute*z;
                if($(index).hasClass("text")==true){
                    var texto = $(index).text();
                    var fin_texto = moment(result_min+sumar).format('HH:mm:ss');
                    $(index).text(fin_texto);
                    z++;
                }
            });
            var ordenElementos = $(this).sortable("toArray").toString();
            var nuevoOrden = ordenElementos;
                usuario.nuevoOrden=nuevoOrden;
          //socket.emit("reOrdenarCitas",usuario);
        }
    });
    $(".navbar-brand").click(function(){
      activate_page("#menu");
      location.href="#menu";
      return false;
    });
    $(".menu_medic_os").click(function(){
      activate_page("#menu"); 
      location.href="#menu";
      return false;
    });
    $("#btn_fotografia").click(function(){
      activate_page("#fotografia"); 
      location.href="#fotografia";
      return false;
    });  
    $(".btn_p_c").click(function(){
        if(usuario.usuario && usuario.usuario!=undefined){
            activate_page("#3b"); 
            location.href="#3b";
        }else{
          document.location.href="index.html";
        }      
      return false;
    });
    $("#buscar_btn").click(function(){
        var data = {};
        data.prefix = usuario.prefix;
        data.num_id = $("#buscar").val();
        data.pagina = "movil";
        socket.emit("buscarPaciente",data);
    });
    $("#btn_guardar_pre").click(function(){
        if($("#femeninof").prop("checked")==true){
            var sexo = "F";
        }else if($("#masculinof").prop("checked")==true){
            var sexo = "M";
        }
        var pre_clinica = {
            paciente_k	: $("#pre_paciente_k").val(),
            identidad	: $("#pre_identidad").val(),
            //data_accion	: $(this).attr("data-accion"),
            pre_k		: $("#pre_k").val(),
            sexo		: sexo,
            edad		: $("#edadf").val(),
            peso_lb		: $("#pesoLb").val(),
            peso_kg		: $("#pesoKg").val(),
            alt_mts		: $("#alturaMts").val(),
            alt_pies	: $("#alturaPies").val(),
            cintura		: $("#medidaCintura").val(),
            hta			: $("#presionArterial").val(),
            glucometria	: $("#glucometria").val(),
            toma		: $("#cuando").val(),
            jornada		: $("#jornada").val(),
            hora		: $("#datePickerGlucosa").val(),
            temperatura	: $("#temperatura").val(),
            pulso		: $("#pulso").val(),
            /*indicador	: $("#indicadorFisico").html(),
            obser1		: $("#obser1").data("wysihtml5").editor.getValue(),//$("#obser1").val(),
            obser2		: $("#obser2").data("wysihtml5").editor.getValue(),//$("#obser2").val(),
            obser3		: $("#obser3").data("wysihtml5").editor.getValue(),//$("#obser3").val(),
            obser4		: $("#obser4").data("wysihtml5").editor.getValue(),//$("#obser4").val(),
            obser5		: $("#obser5").data("wysihtml5").editor.getValue(),//$("#obser5").val(),
            obser6		: $("#obser6").data("wysihtml5").editor.getValue(),//$("#obser6").val(),*/
            fecha_creacion : fechaHoy()
        };
        usuario.preclinica	= pre_clinica;
        usuario.pagina		= "preclinica";
        socket.emit("preclinica",usuario);
    });
    $('#datePickerGlucosa').bootstrapMaterialDatePicker({
        currentDate:moment(new Date()).format('DD/MM/YYYY'),
        time: true,
        date: true,
        nowButton: true,
        nowText:"Hoy",
        format:'DD/MM/YYYY HH:mm',
        clearButton: true,
        lang : 'es'
    });
    
}
document.addEventListener("app.Ready", onAppReady, false) ;
// document.addEventListener("deviceready", onAppReady, false) ;
// document.addEventListener("onload", onAppReady, false) ;

