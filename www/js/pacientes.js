function enfoque(){
	document.getElementById("direccion").style="display:none;width:100%;height:70px;font-size:14px;line-height:18px;border:1px solid rgb(221,221,221); padding:10px;";
}
function setName() {
	var datos={};
	console.log("Estoy en Pacientes l-6");
	if(usuario.atencion){
		$("#buscar").val(usuario.atencion);
	};
	usuario.fecha_operacion = moment(new Date()).format('YYYY-MM-DD');
	if($("#paciente_k").val()!=0){
		datos.paciente_k	= $("#paciente_k").val();
		datos.num_id		= $("#identidad").val();
		datos.nombre		= $("#nombres").val().trim();
		datos.apellido	= $("#apellidos").val().trim();
		datos.nombres		= datos.nombre+" "+datos.apellido;
		datos.pagina		= "Datos";
		datos.prefix		= usuario.prefix;
	}else{
		datos.paciente_k	= $("#paciente_k").val();
	}
	$("#expediente_k").val(0);
	$("#pre_k").val(0);
	if(usuario.usuario && usuario.usuario!=undefined){
		socket.emit('identificacion', usuario);
		if(datos.paciente_k && datos.paciente_k != 0){
			socket.emit("buscarPaciente",datos);
		}
	  document.location.href="#1b";
	}else{
	  document.location.href="index.html";
	}
}
function updateClases(){
	$('.fc-time-grid-event').css('height','17px');
	$('.fc-time-grid-event').css('left','0');
	$('.fc-time-grid-event').css('right','0');
	$('.fc-time-grid-event').css('margin-right','0');
}
var previousPoint = null, previousLabel = null;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                var color = item.series.color;
                var month = new Date(x).getMonth();

                //console.log(item);

                if (item.seriesIndex == 0) {
                    showTooltip(item.pageX,
                    item.pageY,
                    color,
                    "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(USD)");
                } else {
                    showTooltip(item.pageX,
                    item.pageY,
                    color,
                    "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(%)");
                }
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 120,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}
var id = "consulta";
$(document).ready(function ($) {
	$("#d_fijo").click();
	$("#d_fijo").prop("checked",true);
	//$("#panel_usuario").text(getCookie('usuario_medicall'));
	//$(".panel-header-usuario").text(getCookie('usuario_medicall_name'));
		$(".menu-panel a").click(function(){
			$("#item_paciente").text($(this).text());
				$(this).tab('show');
				$($(this)[0].hash).css('opacity', '1');
				$($(this)[0].hash).animate({
						opacity: "1"
					}, 300);
				$('body, html').animate({
					scrollTop: '0px'
				}, 300);
				$.each($(".menu-panel a"),function(index, value){
					$(this).removeClass( "active");
				});
		});
		$('#datePickerFechaUr').bootstrapMaterialDatePicker({
			setDate: moment(new Date()).format('DD/MM/YYYY'),
			time: false,
			format:'DD/MM/YYYY',
			clearButton: true,
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true
		});
		$('#fecha_nacimiento').bootstrapMaterialDatePicker({
			setDate: moment(new Date()).format('DD/MM/YYYY'),
			time: false,
			format:'DD/MM/YYYY',
			clearButton: true,
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true
		});

		$('#fecha_nacimiento_contacto').bootstrapMaterialDatePicker({
			setDate: moment(new Date()).format('DD/MM/YYYY'),
			time: false,
			format:'DD/MM/YYYY',
			clearButton: true,
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true
		});

		$('#horaCita').bootstrapMaterialDatePicker({
			date: false,
			shortTime: false,
			format: 'HH:mm',
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true
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
		$('#f_actual').bootstrapMaterialDatePicker({
			time: false,
			setDate: moment(new Date()).format('DD/MM/YYYY'),
			format:'DD/MM/YYYY',
			clearButton: true,
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true
		});
		$('#f_ingreso').bootstrapMaterialDatePicker({
			time: false,
			setDate: moment(new Date()).format('DD/MM/YYYY'),
			format:'DD/MM/YYYY',
			clearButton: false,
			cancelText:"Cancelar",
			okText:"Aceptar",
			nowText:"Hoy",
			lang : 'es',
			nowButton: true,
			switchOnClick : true
		});

		$(window).scroll(function(){
			if( $(this).scrollTop() > 0 ){
				$('.ir-arriba').slideDown(300);
			} else {
				$('.ir-arriba').slideUp(300);
			}
		});
	//});
	accordion.init({ speed: 300, oneOpen: true });
	/*socket.on('disconnect', function() {
	    alertas.contenido='El servidor se ha desconectado a las...'+moment(new Date()).format('DD/MM/YYYY HH:ss:mm');
        alertas.btnConfirma="No";
        alertas.funcionConfirma="";
        alertas.funcionCancela="";
        mensaje.tema = 'supervan';
        alertas.icono="fa fa-thumbs-down";
	    alerta(alertas);
	});*/
	$('body').keyup(function(e) {
	    if(e.keyCode == 113) {
	        buscar_paciente_btn();
	    }
	});
	bloquearDatos("#1b");
	socket.on("obtenerAccion", function(datos){
		//console.log("PERMISOS: ",datos);
		/* Datos */
		if(datos.cod_ac == "buscar_datos" && datos.pagina=="pacientes" && datos.success == true){
			limpiarDatos();
			limpiarContacto();
			if($("#buscarPacientes .modal-title").text()=="Lista de Personal"){
				$("#buscar_paciente").val("");
			}
			$("#buscarPacientes .modal-title").text("Lista de Pacientes");
			$('#buscarPacientes').modal('toggle');
			if(datos.menu==""){
				datos.menu = "1b";
			}
			buscar_paciente_btn();
			/*bloquearDatos("#"+datos.menu);*/
		}
		if(datos.cod_ac == "guardar_datos" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1b";
			}
			if($("#item_paciente").text() == "Datos"){
				guardarPacientes();
			}else{
				console.log($("#item_paciente").text());
			}
			bloquearDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "eliminar_datos" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1b";
			}
			if($("#paciente_k").val()!=0){
				eliminarPacientes();
			}else{
				mensaje.mensaje = "No ha seleccionado ning&uacute;n registro que borrar";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "nuevo_datos" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1b";
			}
			nuevoPaciente();
			desabilitar();
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "imprimir_datos" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1b";
			}
			printDatos();
			bloquearDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "editar-datos" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1b";
			}
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "nuevo_contacto" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1c";
			}
			liberarDatos("#"+datos.menu);
		}
		/* Expedientes */
		if(datos.cod_ac == "guardar_expediente" && datos.pagina=="pacientes" && datos.success == true){
			var i = 0;
			if($("#padece").val()!=""){
				var contiene = $("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")");
				if(contiene[0]!== undefined && $(contiene[0]).length !== 0){
					$("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")").css("background-color", "yellow");
					validarExpediente();
				}else{
					i=i+1;
					//console.log("Guardar Expediente2: ",i);
					guardarExpediente();
				}
				bloquearDatos("#"+datos.menu);
			}else{
				mensaje.mensaje = "El campo de padecimiento actual esta vacio y es un campo obligatorio";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "eliminar_expediente" && datos.pagina=="pacientes" && datos.success == true){
			if($("#expediente_k").val()==0){
				mensaje.mensaje = "No a seleccinado ning&uacute;n registro para eliminar";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}else{
				eliminarExpediente();
				bloquearDatos("#"+datos.menu);
			}
		}
		if(datos.cod_ac == "nuevo_expediente" && datos.pagina=="pacientes" && datos.success == true){
			nuevoExpediente();
			liberarDatos("#"+datos.menu);
			nuevoRegistro = 0;
		}
		if(datos.cod_ac == "editar-expediente" && datos.pagina=="pacientes" && datos.success == true){
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "nuevo_fisico" && datos.pagina=="pacientes" && datos.success == true){
			nuevoRegistro = 0;
			nuevosRegistrosPreclinica();
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "editar_fisico" && datos.pagina=="pacientes" && datos.success == true){
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "guardar_fisico" && datos.pagina=="pacientes" && datos.success == true){
			var i = 0;
			if($("#presoLb").val()!=0 && $("#presionArterial").val()!="0/0"){
				var contiene = $("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")");
				if(contiene[0]!== undefined && $(contiene[0]).length !== 0){
					$("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")").css("background-color", "yellow");
					validarFisico("fisico");
				}else{
					i=i+1;
					console.log("Guardar Pre: ",i);
					btnGuardarPre();
				}
				bloquearDatos("#"+datos.menu);
			}else{
				mensaje.mensaje = "Campos obligatorios como peso y presion arterial se encuentran vacios";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "eliminar_fisico" && datos.pagina=="pacientes" && datos.success == true){
			if($("#pre_k").val()!=0){
				mensaje.mensaje="¿Esta seguro de eliminar este registro?";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma=eliminarPreclinica;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}else{
				mensaje.mensaje = "No ha seleccionado ning&uacute;n registro que eliminar";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "nueva_consulta" && datos.pagina=="pacientes" && datos.success == true){
			nuevosRegistrosConsulta();
			liberarDatos("#"+datos.menu);
			nuevoRegistro = 0;
		}
		if(datos.cod_ac == "eliminar_consulta" && datos.pagina=="pacientes" && datos.success == true){
			if($("#consulta_k").val()!=0){
				mensaje.mensaje="¿Esta seguro de eliminar este registro?";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma=eliminarConsulta;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}else{
				mensaje.mensaje = "No ha seleccionado ning&uacute;n registro que eliminar";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "editar_consulta" && datos.pagina=="pacientes" && datos.success == true){
			//console.log(datos.menu);
			liberarDatos("#"+datos.menu);
		}
		if(datos.cod_ac == "guardar_consulta" && datos.pagina=="pacientes" && datos.success == true){
			var i = 0;
			if($("#diagnostico").val()!="" && $("#plan").val()!=""){
				var contiene = $("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")");
				if(contiene[0]!== undefined && $(contiene[0]).length !== 0){
					$("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")").css("background-color", "yellow");
					validarFisico("consulta");
				}else{
					i=i+1;
					console.log("Guardar Consulta: ",i);
					guardarConsulta();
				}
				bloquearDatos("#"+datos.menu);
			}else{
				mensaje.mensaje = "Campos obligatorios como Diagnostico, plan y examenes se encuentran vacios";
	 			mensaje.success = false;
	 			mensaje.btnConfirma = "No";
	 			mensaje.tema = 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = "";
	 			delServidor(mensaje);
			}
		}
		if(datos.cod_ac == "guardar_contacto" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1c";
			}
			var item = $("#item_paciente").text();
			if( item.trim() == "Contacto"){
				guardarContacto();
			}else{
				console.log(item);
			}
			bloquearDatos("#"+datos.menu);
		}
		/************************* Contactos ******************/
		/*if(datos.cod_ac == "nuevo_contacto" && datos.pagina=="pacientes" && datos.success == true){
			if(datos.menu==""){
				datos.menu = "1c";
			}
			if($("#item_paciente").text() == "Datos"){
				//guardarPacientes();
			}else{
				console.log($("#item_paciente").text());
			}
			bloquearDatos("#"+datos.menu);
		}*/

	});
	$("#buscar_paciente_btn").on("click",function(){
		buscar_paciente_btn();
	});
	function buscar_paciente_btn(){
		if($("#buscar_paciente").val()!==""){
			var bnombre=$("#buscar_paciente").val();
			var data = {init:data_ini.init,end:data_ini.end,bnombre:bnombre};
		}else{
			var data = {init:data_ini.init,end:data_ini.end};
		}
		usuario.buscarPersonal = data;
		if($("#buscarPacientes .modal-title").text()=="Lista de Pacientes"){
			socket.emit("buscarPacientes",usuario);
		}else if($("#buscarPacientes .modal-title").text()=="Lista de Personal"){
			socket.emit("buscarPersonal",usuario);
		}
	}
	function printDatos() {
		 var fotos = document.getElementById("imagenPaciente");
		 var cln = fotos.cloneNode(true);
		 document.getElementById("direccion").style="width: 100%; height: 70px; font-size: 14px; line-height: 18px; border: 1px solid rgb(221, 221, 221); padding: 10px; display:;";
		 //document.getElementsByClassName("wysihtml5-sandbox").style="display:none";
		 //document.getElementsByTagName("iframe")[0].style="display:none;background-color:rgb(255, 255, 255);border-collapse:separate;border-color:rgb(221, 221, 221);border-style:solid;border-width:1px;clear:none;float:none;margin:0px;outline:rgb(85,85,85) none 0px;outline-offset:0px;padding:10px;position:static;top:auto;left:auto;right:auto;bottom:auto;z-index:auto;vertical-align:baseline;text-align:start;box-sizing:border-box;box-shadow:none;border-radius:0px;width:100%;height:70px;";
		 document.getElementsByTagName("iframe")[0].classList.add("noprint");
	 	 cln.querySelectorAll('[id="photo"]')[0].style.height= "120px";
		 cln.querySelectorAll('[id="photo"]')[0].style.width = "140px";
		 cln.querySelectorAll('[id="photo"]')[0].style.margin="0px -100px opx 0px";
		 cln.querySelectorAll('[id="photo"]')[0].style.float="left";

		 var elaborado = $("#elaborado_por").val();
		 var bottom ='<div id="separarInputPie" align="left" class="col-xs-12" style="float:left;width:100%;">'+
		          	    '<div class="col-xs-12" style="float:left;width:100%"><p> Elaborado por: '+elaborado+'</p></div>'+
		          	 '</div>';
		 var header ='<div align="center" class="col-xs-12" style="height:100px;margin:40px 0px 0px 0px;">'+
		 							'<img id="tituloLogo" src="/img/titulo0.png">'+
									'<div><h2>DATOS GENERALES DEL PACIENTE</h2></div>'+
		          	 '</div>';
		    //  console.log("Fotos Node: ",header);
        $("#1b").print({
            globalStyles 	: false,
            mediaPrint 		: true,
            stylesheet :	"../css/printer.css",
            title	:	"",
            iframe : true,
						pagina:"pacientes",
            noPrintSelector : ".noprint",
            titleUnoSelector : ".pacienteFoto",
            prepend :	header,
            append	: 'bottom',
            titleUno:	cln,
            footerUno:	bottom,
            footerUnoSelector : ".footer_datos"
        });
  }
	socket.on("buscarPaciente",function(datos){
		//console.log(datos);
		document.location.href="#1b";
		if(datos.successData === true && (datos.pagina=="datos" || datos.pagina=="Datos")){
			bloquearDatos("#1b");
			habilitar();
			if(datos.data.length){
				$("#paciente_k").val(datos.data[0].paciente_k);
				$("#division").val(datos.data[0].descrip);
				$("#identidad").val(datos.data[0].num_id);
				$("#nombres").val(datos.data[0].nombre);
				$("#apellidos").val(datos.data[0].apellido);
				$(".nombrePaciente").text(datos.data[0].nombre.trim());
				$(".apellidoPaciente").text(datos.data[0].apellido.trim());
				$("#profesion").val(datos.data[0].profesion);
				$("#edad").val(datos.data[0].edad);
				if(datos.data[0].estado_civil!==null){
					var estado = datos.data[0].estado_civil.toLowerCase();
					$("#estadoCivil").val(estado);
					$("#estadoCivil option[value="+estado+"]").attr('selected', true);
				}else{
					var estado = "no";
				}
				$("#f_ingreso").val(moment(datos.data[0].fecha_ingreso).format('DD/MM/YYYY'));
				$("#fecha_nacimiento").val(moment(datos.data[0].fecha_nacimiento).format('DD/MM/YYYY'));
				$("#email_paciente").val(datos.data[0].email);
				if(datos.data[0].sexo.toLowerCase()=="m" || datos.data[0].sexo.toLowerCase()=="masculino"){
					$("#masculino").prop("checked",true);
					$("#masculinof").prop("checked",true);
					$("#femenino").prop("checked",false);
					$("#femeninof").prop("checked",false);

					$("#masculino").parent().children("span").children('b').removeClass().addClass("text-warning");
					$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-warning");
					$("#femenino").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-primary");
				}else if(datos.data[0].sexo.toLowerCase()=="f" || datos.data[0].sexo.toLowerCase()=="femenino"){
					$("#masculino").prop("checked",false);
					$("#masculinof").prop("checked",false);
					$("#femenino").prop("checked",true);
					$("#femeninof").prop("checked",true);

					$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#masculino").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femenino").parent().children("span").children('b').removeClass().addClass("text-warning");
					$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-warning");
				}else if(datos.data[0].sexo==""){
					$("#masculino").prop("checked",false);
					$("#masculinof").prop("checked",false);
					$("#femenino").prop("checked",false);
					$("#femeninof").prop("checked",false);

					$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#masculino").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femenino").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-primary");
				}
				$("#tipo_sangre").val(datos.data[0].tipo_sangre);
				$("#catego_paciente").val(datos.data[0].tipo_paciente);
				$("#telefono").val(datos.data[0].teleca);
				$("#celular").val(datos.data[0].celular);
				$('#direccion').data("wysihtml5").editor.setValue(datos.data[0].direc1);

				$("#cantidad_consultas").empty();
				$("#cantidad_consultas").text(datos.data[0].cantidad);
				//console.log(datos.data[0]);
				$("#fecha1").empty();
				//console.log("FECHA 1: ",moment(datos.data[0].date1).format('DD/MM/YYYY'));
				$("#fecha1").text(moment(datos.data[0].date1).format('DD/MM/YYYY'));

				$("#fecha2").empty();
				//console.log("FECHA 2: ",moment(datos.data[0].date2).format('DD/MM/YYYY'));
				$("#fecha2").text(moment(datos.data[0].date2).format('DD/MM/YYYY'));

				$("#fechas_expedientes").empty();

				$("#pais").val(datos.data[0].pais);
				$("#pais option[value="+datos.data[0].pais_contacto+"]").attr('selected', true);
				filterSelect();
				$("#departamentos").val(datos.data[0].departamento);
				$("#departamentos option[value="+datos.data[0].departamento+"]").attr('selected', true);
				filterSelectMuni();
				$("#municipalidad").val(datos.data[0].municipalidad);
				$("#municipalidad option[value="+datos.data[0].municipalidad+"]").attr('selected', true);
				$("#ciudad").val(datos.data[0].ciudad);
				$("#elaborado_por").val($.trim(datos.data[0].usuario));

				if(datos.data[0].foto!==null && datos.data[0].foto!==""){
					var url = "img/"+usuario.prefix+"/pacientes/"+datos.data[0].foto;//+".png";
					$("#photo").attr("src",url);
				}else{
					var url = "img/usuario.jpg";
					$("#photo").attr("src",url);
				}
				//$(".app").css("display","none");
				estadoVideo=false;

				if($('#buscarPacientes').hasClass('show')){
					$('#buscarPacientes').modal('toggle');
				}
				dadoAlta=datos.data[0].eliminado;
				eliminado(dadoAlta);
				buscarContacto(datos.contacto);
			}else{
				alertas.contenido='Regitro sin expediente';
		        alertas.btnConfirma="No";
		        alertas.funcionConfirma="";
		        alertas.funcionCancela="";
		        alertas.icono="fa fa-ravelry";
		        alerta(alertas);
			}
		}
		if(datos.successData === true && datos.pagina=="Expediente"){
			expedientes=[];
			$("#fechas_expedientes").empty();
			for(var i=0; i<datos.data.length;i++){
				expedientes[datos.data[i].expediente_k]= datos.data[i];
				var fechas = '<tr>'+
		          '<td class="tb_pre_k text-primary">'+datos.data[i].expediente_k+'</td>'+
		          '<td class="btnFecha">'+
		            '<div class="col-sm-10">'+
		            	'<a data-expediente_k="'+datos.data[i].expediente_k+
		            		'" data-menu="'+datos.menu+
		            		'" id="c_button-outline0" href="#" class="btn pi-draggable btn-outline-primary" '+
		            		'draggable="true" onclick="buscarExpediente(this)">'+
		            		moment(datos.data[i].fecha_expediente).format('DD/MM/YYYY')+
		            	'</a><div>'+
		          '</td>'+
		        '</tr>';
	            $("#fechas_expedientes").append(fechas) ;
			}
		}
		if(datos.successPreclinica === true && datos.pagina=="Examen Fisico" ){
			//console.log("Examen Fisico",datos);
			$("#fechas_expedientes").empty();
			nuevosRegistrosPreclinica();
			if(datos.data[0].sexo.toLowerCase()=="m" || datos.data[0].sexo.toLowerCase()=="masculino"){
				$("#masculinof").prop("checked",true);
				$("#femeninof").prop("checked",false);
				$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-warning");
				$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-primary");
			}else if(datos.data[0].sexo.toLowerCase()=="f" || datos.data[0].sexo.toLowerCase()=="femenino"){
				$("#masculinof").prop("checked",false);
				$("#femeninof").prop("checked",true);
				$("#femeninof").prop("checked",true);
				$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-primary");
				$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-warning");
			}else if(datos.data[0].sexo==""){
				$("#masculinof").prop("checked",$("#masculino").prop("checked"));
				$("#femeninof").prop("checked",$("#femenino").prop("checked"));
				$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-primary");
				$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-primary");
			}

			preclinica=[];
			for(var i=0; i<datos.data.length;i++){
				preclinica[datos.data[i].pre_k]= datos.data[i];

				var a = i+1;
				var fechas = '<tr>'+
		          '<td class="tb_pre_k text-primary">'+datos.data[i].pre_k+'</td>'+
		          '<td class="btnFecha">'+
		            '<div class="col-sm-10">'+
		            	'<a data-pre_k="'+datos.data[i].pre_k+
		            		'" data-menu="'+datos.menu+
		            		'" id="c_button-outline0" href="#" class="btn pi-draggable btn-outline-primary" '+
		            		'draggable="true" onclick="buscarPreclinica(this)">'+
		            		moment(datos.data[i].fecha).format('DD/MM/YYYY')+
		            	'</a><div>'+
		          '</td>'+
		        '</tr>';
		        $("#fechas_expedientes").append(fechas);
			}
		}
		if(datos.successPadece === true ){
			for(var i=0; i<datos.padece.length;i++){
				padecimientos[i]= datos.padece[i].pad;
			}
		}
		if(datos.successTenido === true ){
			for(var i=0; i<datos.tenido.length;i++){
				tenido[i]= datos.tenido[i].pad;
			}
		}
		if(datos.successData === true && datos.pagina=="Consulta"){
			$("#fechas_expedientes").empty();
			expedientes=[];
			for(var i=0; i<datos.data.length;i++){
				expedientes[datos.data[i].consulta_k]= datos.data[i];
			 var fechas = '<tr>'+
                  '<td class="tb_pre_k text-primary">'+datos.data[i].consulta_k+'</td>'+
		          '<td class="btnFecha">'+
		            '<div class="col-sm-10"><a'+
		             ' data-consulta_k="'+datos.data[i].consulta_k+
		             '" data-menu="'+datos.menu+
		             '" id="c_button-outline0" href="#" class="btn pi-draggable btn-outline-primary" '+
		             'draggable="true" onclick="buscarConsulta(this)">'+moment(datos.data[i].fecha_consulta).format('DD/MM/YYYY')+'</a><div>'+
		          '</td>'+
		        '</tr>';
              $("#fechas_expedientes").append(fechas) ;
			}
		}
	});

	function buscarContacto(datos){
		console.log(datos.length);
			bloquearDatos("#1c");
			habilitar();
			if(datos.length){
				$("#contacto_k").val(datos[0].contacto_k);
				$("#division_contacto").val(datos[0].descrip);
				$("#identidad_contacto").val(datos[0].num_id);
				$("#nombres_contacto").val(datos[0].nombre.trim());
				$("#apellidos_contacto").val(datos[0].apellido.trim());
				$("#profesion_contacto").val(datos[0].profesion);
				$("#edad_contacto").val(datos[0].edad);
				if(datos[0].estado_civil!==null){
					var estado = datos[0].estado_civil.toLowerCase();
					$("#estadoCivil_contacto").val(estado);
					$("#estadoCivil_contacto option[value="+estado+"]").attr('selected', true);
				}else{
					var estado = "no";
				}
				$("#fecha_nacimiento_contacto").val(moment(datos[0].fecha_nacimiento).format('DD/MM/YYYY'));
				$("#email_contacto").val(datos[0].email);
				if(datos[0].sexo.toLowerCase()=="m" || datos[0].sexo.toLowerCase()=="masculino"){
					$("#masculino_contacto").prop("checked",true);
					$("#femenino_contacto").prop("checked",false);
					$("#masculino_contacto").parent().children("span").children('b').removeClass().addClass("text-warning");
					$("#femenino_contacto").parent().children("span").children('b').removeClass().addClass("text-primary");
				}else if(datos[0].sexo.toLowerCase()=="f" || datos[0].sexo.toLowerCase()=="femenino"){
					$("#masculino_contacto").prop("checked",false);
					$("#femenino_contacto").prop("checked",true);
					$("#masculino_contacto").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femenino_contacto").parent().children("span").children('b').removeClass().addClass("text-warning");
				}else if(datos[0].sexo==""){
					$("#masculino_contacto").prop("checked",false);
					$("#femenino_contacto").prop("checked",false);
					$("#masculino_contacto").parent().children("span").children('b').removeClass().addClass("text-primary");
					$("#femenino_contacto").parent().children("span").children('b').removeClass().addClass("text-primary");
				}
				$("#tipo_sangre_contacto").val(datos[0].tipo_sangre);
				$("#telefono_contacto").val(datos[0].teleca);
				$("#celular_contacto").val(datos[0].celular);
				$('#direccion_contacto').data("wysihtml5").editor.setValue(datos[0].direc1);
				$("#pais_contacto").val(datos[0].pais);
				$("#pais_contacto option[value="+datos[0].pais+"]").attr('selected', true);
				filterSelectContacto();
				$("#departamentos_contatco").val(datos[0].departamento);
				$("#departamentos_contacto option[value="+datos[0].departamento+"]").attr('selected', true);
				filterSelectMuniContacto();
				$("#municipalidad_contacto").val(datos[0].municipalidad);
				$("#municipalidad_contacto option[value="+datos[0].municipalidad+"]").attr('selected', true);
				$("#ciudad_contacto").val(datos[0].ciudad);
			}else{
				alertas.contenido='No hay registro de contactos';
		        alertas.btnConfirma="No";
		        alertas.funcionConfirma="";
		        alertas.funcionCancela="";
		        alertas.icono="fa fa-ravelry";
		        alerta(alertas);
			}
	}
	function limpiarContacto(datos){
		bloquearDatos("#1c");
	//deshabilitar();
		$("#contacto_k").val(0);
		$("#division_contacto").val("");
		$("#identidad_contacto").val("");
		$("#nombres_contacto").val("");
		$("#apellidos_contacto").val("");
		$("#profesion_contacto").val("");
		$("#edad_contacto").val(0);
		$("#estadoCivil_contacto").val("so");
		$("#estadoCivil_contacto option[value='estado']").attr('selected', true);
		$("#fecha_nacimiento_contacto").val(moment(new Date()).format('DD/MM/YYYY'));
		$("#email_contacto").val("@");
		$("#tipo_sangre_contacto").val("");
		$("#telefono_contacto").val("");
		$("#celular_contacto").val("");
		$('#direccion_contacto').data("wysihtml5").editor.setValue("");
		$("#paisLocalContcto").click();
	}
	function limpiarDatos(){
		$("#paciente_k").val(0);
		$("#division").val("");
		$("#identidad").val("");
		$("#nombres").val("");
		$("#apellidos").val("");
		$(".nombrePaciente").text("");
		$(".apellidoPaciente").text("");
		$("#profesion").val("");
		$("#edad").val("");
		$("#estadoCivil").val("");
		$("#estadoCivil option[value='no']").attr('selected', true);
		$("#f_ingreso").val(moment(new Date()).format('DD/MM/YYYY'));
		$("#fecha_nacimiento").val(moment(new Date()).format('DD/MM/YYYY'));
		$("#email_paciente").val("");
		$("#femenino").prop("checked",false);
		$("#masculino").prop("checked",false);
		$("#tipo_sangre").val("");
		$("#catego_paciente").val("Normal");
		$("#catego_paciente option[value="+$("#catego_paciente").val()+"]").attr('selected', true);
		$("#telefono").val("");
		$("#celular").val("");
		$('#direccion').data("wysihtml5").editor.setValue("");
		$("#cantidad_consultas").empty();
		$("#cantidad_consultas").text(0);
		$("#fecha1").empty();
		$("#fecha1").text(moment(new Date()).format('DD/MM/YYYY'));
		$("#fecha2").empty();
		$("#fecha2").text(moment(new Date()).format('DD/MM/YYYY'));
		$("#fechas_expedientes").empty();
		$("#paisLocal").click();

		$("#ciudad").val("");
		$("#elaborado_por").val("");
		var url = "img/usuario.jpg";
		$("#photo").attr("src",url);
	}

	socket.on("pacientesGuardados",function(datos){
		if(datos.id){
			$("#paciente_k").val(datos.id);
		}
		datos.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 		datos.funcionConfirma="";
 		datos.btnConfirma="No";
		delServidor(datos);
	});
	socket.on("contactosGuardados",function(datos){
		if(datos.id){
			$("#contacto_k").val(datos.id);
		}
		datos.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 		datos.funcionConfirma="";
 		datos.btnConfirma="No";
		delServidor(datos);
	});
	socket.on("delServidor",function(data){
		if(data.error == 911){
			dadoAlta=1;
			eliminado(1);
		}
	});
	socket.on("preclinica",function(data){
		data.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 		data.funcionConfirma="";
 		data.btnConfirma="No";
		delServidor(data);
		if(data.pre_k){
			$("#pre_k").val(data.pre_k);
		}
		usuario.num_id=$("#identidad").val();
		usuario.paciente_k=$("#paciente_k").val();
		usuario.pagina = "Examen Fisico";
		$("#fechas_expedientes").empty();
		//console.log("preclinica: ",data,usuario);
		socket.emit("getPreclinica",usuario);
	});
	socket.on("cargarCitas",function(data){
		//console.log("Cargar Citas: ", data);
		/************ restablecer los botones de programar citas ****************/
		$("#admin_citas").attr('class','btn pi-draggable btn-outline-primary');
		/***********************************************************************/
		var eventos = [];
		if(data.success2==true){
          for(var i = 0; i<data.parent2.length;i++){
            if(data.periodo_citas=="mes"){
              if(data.parent2[i].cantidad){
                data.parent2[i].title = data.parent2[i].title +data.parent2[i].cantidad;
              }
            }else if(data.periodo_citas!="mes"){
              for(var i = 0; i<data.parent2.length;i++){
                  //data.parent2[i].title = data.parent2[i].title +' - '+ data.parent2[i].time;

                  data.parent2[i].title =data.parent2[i].time+' - '+data.parent2[i].paciente;
              }
            }
          }
		}
    eventos["events"]=data.parent2;
		$("#calendario_modal-"+id).fullCalendar( 'removeEvents');
		$("#calendario_modal-"+id).fullCalendar( 'addEventSource', eventos);
		$("#calendario_modal-"+id).fullCalendar( 'refetchEvents' );
    updateClases();
  });
	socket.on("actualizarFoto",function(foto){
		console.log(foto);
		var url = "../../"+foto;
		$("#photo").attr("src",url);
		$('.modal-photo').modal('toggle');
		estadoVideo=false;
	});
	socket.on("citasProgramadas",function(data){
		//console.log("CITAS PRGRAMADAS-> "+data);
		usuario.citas.cancelar = 0;
		if(data.success==true){
			agenda(data);
		}
		data.tema= 'supervan';
 		data.funcionConfirma="";
 		data.btnConfirma="No";
		delServidor(data);
	});
	socket.on("validarMenu",function(data){
		if(data.success_accesos==true){
			data.paciente_k=$("#paciente_k").val();
			data.num_id=$("#identidad").val();
			$("#fechas_expedientes").empty();
			if(usuario.cambio==1){
				usuario.cambio = 0;
			}
		}
		if(data.pagina=="Expediente"){
			socket.emit("tenido",data);
			socket.emit("buscarPaciente",data);
			nuevoExpediente();
			openAnt("null", "Patologicos");
		}
		if(data.pagina=="Examen Fisico"){
			openExamen("null", "Patologicos");
			nuevosRegistrosPreclinica();
			socket.emit("getPreclinica",data);
			usuario.paciente_k=$("#paciente_k").val();
			socket.emit("historialGlucosa",usuario);
		}
		if(data.pagina=="Consulta"){
			nuevosRegistrosConsulta();
			socket.emit("getConsulta",data);
		}
	});
	socket.on("obtenerTenido",function(datos){
		//console.log("obtenerTenido",datos.tenido);
		if(datos.tenido){
			limpiarChecks();
			var tenido = datos.tenido;
			var total = tenido.length;
			var i=1;
			var j=1;
			$.each(tenido,function(key,data){
				if(data.valor!=null){
					var value = data.valor;
				}else{
					var value = 0;
				}
				if(data.grupo_k==1){
					//console.log("data: ",data);
					if(i < 5){
						var check = '<div class="col-sm-12 col-md-12 checkbox checkbox-danger">'+
	                                  '<input id="'+data.tenido_k+'" data-despad = '+data.des_pad+'  data-pad = '+data.pad+' type="checkbox" value='+value+' onclick="$(this).val(this.checked ? 1 : 0)"disabled>'+
	                                  '<label for="'+data.tenido_k+'" class="mx-auto control-label">'+data.des_pad+'</label>'+
	                                '</div>';
						$("#col_apnp"+i).append(check);
						i=i+1;
						if(i==5){
							i=1;
						}
					}
				}
				if(data.grupo_k==2){
					//console.log(data);
					if(j < 4){
						var check = '<div class="col-sm-12 col-md-12 checkbox checkbox-danger">'+
	                                  '<input id="'+data.tenido_k+'" data-despad = '+data.des_pad+'  data-pad = '+data.pad+' type="checkbox" value='+value+' onclick="$(this).val(this.checked ? 1 : 0)" disabled>'+
	                                  '<label for="'+data.tenido_k+'" class="mx-auto control-label text-size">'+data.des_pad+'</label>'+
	                                '</div>';
						$("#col_ahf"+j).append(check);
						j=j+1;
						if(j==4){
							j=1;
						}
					}
				}
				if(data.valor==1){
					$("#"+data.tenido_k).attr( "checked", true );
				}else{
					$("#"+data.tenido_k).attr( "checked", false );
				}
			});
		}
	});
	socket.on('areasClinicas',function(datos){
	//	console.log('tablaPerfiles: ',listCookies('usuario_medicall'));
		if(datos.success!=false){
	    $("#bEspecialidad").empty();
	    var total = datos.data.length;
	    for(var i=0; i<=total;i++){
	        if(i<total){
	            var areas = '<option id="area_"'+datos.data[i].area_k+' value="'+datos.data[i].area_k+'">'+datos.data[i].nombre+'</option>';
	            $("#bEspecialidad").append(areas);
	        }else{
	            var areas = '<option id="all" value=0>TODOS</option>';
	            $("#bEspecialidad option:first").before(areas);
							//console.log("PACIENTES-> "+$("#bEspecialidad").val()," GETCOOKIES-> "+getCookie('usuario_medicall_area_k'));
	            //$("#bEspecialidad").val(getCookie('usuario_medicall_area_k'));
				//			usuario.citas.especialidad_k=getCookie('usuario_medicall_area_k');
	            //$("#bEspecialidad option[value='"+getCookie('usuario_medicall_area_k')+"']").attr('selected', true);
				//			usuario.citas.doctor_k=getCookie('usuario_medicall_doctor_k');
	            //$("#pais option[value='all']").prop('selected', true);
	        }
	    }
		}
	});
	socket.on("buscarPersonal",function(data){
		console.log("BUSCAR PERSONAL-> "+data)
		if(data.success == false){
			$('#buscarPacientes').modal('toggle');
			mensaje.mensaje="No tiene acceso a buscar datos";
      mensaje.success=false;
      mensaje.tema= 'supervan';
 			mensaje.funcionConfirma="";
 			mensaje.btnConfirma="No";
	    delServidor(mensaje);
		}else{
			$("#tablaPacientes").empty();
			$("#totalPacientes").empty();
			$("#totalPacientes").append(data.total);

			var total_personal = Math.ceil(data.total/data_ini.end);

			$('.paginacionBuscador').bootpag({
			    total: total_personal,
	    		maxVisible: 5,
			    leaps: true,
			    firstLastUse: true,
			    first: '←',
			    last: '→',
			    wrapClass: 'pagination',
			    activeClass: 'active',
			    disabledClass: 'disabled',
			    nextClass: 'next',
			    prevClass: 'prev',
			    lastClass: 'last',
			    firstClass: 'first'
			});

			var i = 0;
			for(i=0;i < data.datos.length;i++){
				var datos = {
					id:data.datos[i].usuario_k,
					datos:data.datos[i]
				}
				var num =data.ini+i+1;
				var personal = '<li class="list-group-item-medic">'+
								'<div class="checkbox" style="margin-right:5px;float:left">'+
								num+
								'</div>'+
                '<!--<div class="checkbox">'+
                    '<input type="checkbox" id="checkbox'+i.toString()+'" />-->'+
                    '<label for="checkbox'+i.toString()+'" style="float:left">'+
                        data.datos[i].nombre+" "+data.datos[i].apellido+
                    '</label>'+
                '<!--</div>-->'+
                '<div class="pull-right action-buttons">'+
                    '<a href="#" id="'+data.datos[i].usuario_k+
                    '" data-area_k="'+data.datos[i].area_k+
                    '" data-num_id="'+data.datos[i].num_id+
                    '" data-apellido="'+data.datos[i].apellido+
                    '" data-nombre="'+data.datos[i].nombre+'" onclick="editarPersonal(this)" ><span class="fa d-inline fa-lg fa fa-pencil"></span></a>'+
                    '<!--<a href="#" class="trash"><span class="fa d-inline fa-lg fa fa-trash"></span></a>'+
                    '<a href="#" class="flag"><span class="fa d-inline fa-lg fa fa-flag"></span></a>-->'+
                '</div>'+
            '</li>';
            $("#tablaPacientes").append(personal);
			};
		}
	});
	socket.on("preclinicaEliminado",function(datos){
		console.log("Preclinica Eliminado",datos);
		delServidor(datos);
		bloquearDatos("#"+datos.menu);
		nuevosRegistrosPreclinica();
		datos.num_id=$("#identidad").val();
		datos.paciente_k=$("#paciente_k").val();
		$("#fechas_expedientes").empty();
		socket.emit("getPreclinica",datos);
	});
	$('#startTime').bootstrapMaterialDatePicker({
  		time: true,
  		container:'#eventContentModCita .modal-body',
  		date:false,
  		setDate: moment(new Date()).format('HH:mm:ss'),
  		format:'HH:mm:ss',
  		clearButton: false,
  		cancelText:"Cancelar",
  		okText:"Aceptar",
  		nowText:"Hoy",
  		lang : 'es',
  		nowButton: false,
  		switchOnClick : true
  	});

  	socket.on("historialGlucosa",function(data){
	    //console.log(data);
	    function gd(dat) {
  			var date = dat.split('/');
            return new Date(date[2], date[1]-1, date[0]).getTime();
        }
		var peso = [], glucosa = [];
	    for (var i = 0; i < data.historia.length ; i++) {
	    	var fecha = gd(data.historia[i].fechag);//toTimestamp
			peso.push([fecha, data.historia[i].peso_lbs, data.historia[i].fechagt]);
			glucosa.push([fecha, data.historia[i].glucometria, data.historia[i].fechagt]);
	    }
	    var line_data1 = {
          data: peso,
          color: "#3c8dbc",
          label:'Peso'
        };
        var line_data2 = {
          data: glucosa,
          color: "#00c0ef",
          label:'Glucosa'
        };
        var options1 = {
          grid: {
            hoverable: true,
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
          },
          series: {
	          	shadowSize: 0,
	            lines: {
	                show: true
	            },
	            points: {
	                radius: 3,
	                fill: true,
	                show: true
	            }
            },
          lines: {
            fill: false,
            color: ["#3c8dbc", "#f56954"]
          },
          yaxis: {
            show: true,
          },
          xaxis: {
            show: true,
            mode: "time",
            tickSize: [1, "month"]
          },
          legend: {
                noColumns: 0,
                labelBoxBorderColor: "#000000",
                position: "nw"
            }
        };
        $.plot("#glucosa-chart", [line_data1, line_data2],options1);
        //$("#glucosa-chart").UseTooltip();
        //Initialize tooltip on hover
        $('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
          position: "absolute",
          display: "none",
          opacity: 0.8
        }).appendTo("body");
        $("#glucosa-chart").bind("plothover", function (event, pos, item) {
          if (item) {
          	//console.log();
          	var f = item.series.data[item.dataIndex][2];
            var x = item.datapoint[0],//item.datapoint[0].toFixed(2),
                y = item.datapoint[1];

            $("#line-chart-tooltip").html(item.series.label + "<br> Tomado " + f + " = " + y)
                    .css({top: item.pageY + 5, left: item.pageX + 5})
                    .fadeIn(200);
          } else {
            $("#line-chart-tooltip").hide();
          }
		});

        /* END LINE CHART */
	});
	socket.on("consultaGuardada",function(datos){
		console.log(datos);
		if(datos.id){
			$("#consulta_k").val(datos.id);
		}
		usuario.num_id=$("#identidad").val();
		usuario.paciente_k=$("#paciente_k").val();
		usuario.pagina = "Consulta";
		$("#fechas_expedientes").empty();
		socket.emit("getConsulta",usuario);
	});
  	$('#startDate').bootstrapMaterialDatePicker({
  		time: false,
  		container:'#eventContentModCita .modal-body',
  		date:true,
  		setDate: moment(new Date()).format('DD/MM/YYYY'),
  		format:'DD/MM/YYYY',
  		clearButton: false,
  		cancelText:"Cancelar",
  		okText:"Aceptar",
  		nowText:"Hoy",
  		lang : 'es',
  		nowButton: false,
  		switchOnClick : true
  	});
		/*nuevoPaciente();*/
		desabilitar();
});
$("#modal_photo").click(function(){
    MediaStream.stop();
		estadoVideo=false;
});
$(".modal-photo").click(function(){
    MediaStream.stop();
		estadoVideo=false;
});
$("#span_f_ingreso").click(function(){
	$("#f_ingreso").click();
});
$("#span_f_ingreso_citas").click(function(){
	$("#btnGuardarCita").click();
});
$("#span_f_gluco").click(function(){
	$("#datePickerGlucosa").click();
});
$("#span_fecha_nacimiento").click(function(){
	$("#fecha_nacimiento").click();
});
$("#span_fecha_nacimiento_contacto").click(function(){
	$("#fecha_nacimiento_contacto").click();
});
function nuevosRegistrosPreclinica(){
	$("#pre_k").val(0);
	$("#pesoLb").val(0);
	$("#pesoKg").val(0);
	$("#alturaMts").val(0);
	$("#alturaPies").val(0);
	$("#medidaCintura").val(0);
	$("#presionArterial").val("0/0");
	$("#glucometria").val(0);
	$("#antes").prop("checked",true);
	$("#despues").prop("checked",false);

	//$("#jornada").val(preclinica[$(data).attr("data-pre_k")].jornada);
	$("#datePickerGlucosa").val(moment(new Date()).format('DD/MM/YYYY  hh:mm:ss a'));
	$("#temperatura").val(0);
	$("#pulso").val(0);
	$("#indicadorFisico").html("");
	$("#obser1").data("wysihtml5").editor.setValue("");
	$("#obser2").data("wysihtml5").editor.setValue("");
	$("#obser3").data("wysihtml5").editor.setValue("");
	$("#obser4").data("wysihtml5").editor.setValue("");
	$("#obser5").data("wysihtml5").editor.setValue("");
	$("#obser6").data("wysihtml5").editor.setValue("");
}
function nuevosRegistrosConsulta(){
	$("#consulta_k").val(0);
	$("#diagnostico").data("wysihtml5").editor.setValue("");
	$("#plan").data("wysihtml5").editor.setValue("");
	$("#examenes").data("wysihtml5").editor.setValue("");

	$("#f_actual").val(moment(new Date()).format('DD/MM/YYYY'));
}
function buscarPreclinica(data){
	bloquearDatos("#"+$(data).attr("data-menu"));
	//console.log("PRE CLINICA: ",data);
	bloquearDatos("#"+$(data).attr("data-menu"));
	//console.log(moment(preclinica[$(data).attr("data-pre_k")].fecha).format('DD/MM/YYYY').toString()+" "+(preclinica[$(data).attr("data-pre_k")].hora));
	var fecha_hora = moment(preclinica[$(data).attr("data-pre_k")].fecha).format('DD/MM/YYYY').toString()+" "+(preclinica[$(data).attr("data-pre_k")].hora);
	$("#pre_k").val(preclinica[$(data).attr("data-pre_k")].pre_k);
	$("#pesoLb").val(preclinica[$(data).attr("data-pre_k")].peso_lbs);
	$("#pesoKg").val(preclinica[$(data).attr("data-pre_k")].peso_kg);
	$("#alturaMts").val(preclinica[$(data).attr("data-pre_k")].alt_mts);
	$("#alturaPies").val(preclinica[$(data).attr("data-pre_k")].alt_pies);
	$("#medidaCintura").val(preclinica[$(data).attr("data-pre_k")].cintura);
	$("#presionArterial").val(preclinica[$(data).attr("data-pre_k")].sistole+"/"+preclinica[$(data).attr("data-pre_k")].diastole);
	$("#glucometria").val(preclinica[$(data).attr("data-pre_k")].glucometria);
	if(preclinica[$(data).attr("data-pre_k")].toma=="A"){
		$("#antes").prop("checked",true);
		$("#despues").prop("checked",false);
	}else{
		$("#antes").prop("checked",false);
		$("#despues").prop("checked",true);
	}
	$("#jornada").val(preclinica[$(data).attr("data-pre_k")].jornada);
	$("#datePickerGlucosa").val(fecha_hora);
	$("#temperatura").val(preclinica[$(data).attr("data-pre_k")].temperatura);
	$("#pulso").val(preclinica[$(data).attr("data-pre_k")].pulso);
	$("#indicadorFisico").html(preclinica[$(data).attr("data-pre_k")].indicador);

	$("#obser1").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser1);
	$("#obser2").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser2);
	$("#obser3").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser3);
	$("#obser4").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser4);
	$("#obser5").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser5);
	$("#obser6").data("wysihtml5").editor.setValue(preclinica[$(data).attr("data-pre_k")].obser6);
}

function cambiarHora(datos){
    socket.emit("programaConsulta",datos);
}

function buscarExpediente(data){
	bloquearDatos("#"+$(data).attr("data-menu"));
	if(dadoAlta==0){
		var fecha_ex = $(data).attr("data-expediente_k");
		$("#expediente_k").val(expedientes[fecha_ex].expediente_k);

		$("#app").data("wysihtml5").editor.setValue(expedientes[fecha_ex].alergias_medic);
		$("#eym").data("wysihtml5").editor.setValue(expedientes[fecha_ex].enfe_medic);
		$("#padece").data("wysihtml5").editor.setValue(expedientes[fecha_ex].padecimiento_actual);

		$("#apnp").val(expedientes[fecha_ex].ant_no_patologicos);
		$("#ahf").val(expedientes[fecha_ex].ant_heredo_fam);

		$("#abortos").val(expedientes[fecha_ex].abortos);
		$("#partos").val(expedientes[fecha_ex].partos);
		$("#gestas").val(expedientes[fecha_ex].gestas);
		$("#fecha_ur").val(expedientes[fecha_ex].datePickerFechaUr);
	}else{
		eliminado(1);
	}
}
function buscarConsulta(data){
	bloquearDatos("#"+$(data).attr("data-menu"));
	var fecha_ex = $(data).attr("data-consulta_k");
	$("#consulta_k").val(expedientes[fecha_ex].consulta_k);

	$("#diagnostico").data("wysihtml5").editor.setValue(expedientes[fecha_ex].diagnostico);
	$("#plan").data("wysihtml5").editor.setValue(expedientes[fecha_ex].plan);
	$("#examenes").data("wysihtml5").editor.setValue(expedientes[fecha_ex].examenes);

	$("#fecha_consulta").val(expedientes[fecha_ex].fecha_consulta);
}
function buscarPadecimientos(){
	for(var i=0; i<tenido.length;i++){
		$("#"+tenido[i]).css({"background-color":"inherit","color":"white"});
		$("#"+tenido[i]).attr( "checked", true );
		$("#"+tenido[i]).attr( "checked", false );
	}
	for(var i=0; i<padecimientos.length;i++){
		$("#"+padecimientos[i]).css({"background-color":"yellow","color":"black"});
		$("#"+padecimientos[i]).attr( "checked", true );
	}
}

/******************************************************Fin Buscar Paciente *****************************************************/
function guardarPacientes(){
	var datosPaciente={};
	datosPaciente.paciente_k		= $("#paciente_k").val();
	datosPaciente.tipo_paciente		= $("#catego_paciente").val();
	datosPaciente.fecha_ingreso		= $("#f_ingreso").val();
	datosPaciente.nombres			= $("#nombres").val();
	datosPaciente.apellidos			= $("#apellidos").val();
	datosPaciente.num_id			= $("#identidad").val();
	datosPaciente.division			= $("#division").val();
	datosPaciente.profesion			= $("#profesion").val();
	datosPaciente.edad				= $("#edad").val();
	datosPaciente.estado_civil		= $("#estadoCivil").val();
	if($("#masculino").prop('checked')==true){
		datosPaciente.sexo				=$("#masculino").val();
	}else{
		datosPaciente.sexo				=$("#femenino").val();
	}
	datosPaciente.fecha_nacimiento= $("#fecha_nacimiento").val();
	datosPaciente.telefono		=$("#telefono").val();
	datosPaciente.celular		=$("#celular").val();

	datosPaciente.pais			=$("#pais").val();
	datosPaciente.departamento	=$("#departamentos").val();
	datosPaciente.municipalidad	=$("#municipalidad").val();
	datosPaciente.ciudad		=$("#ciudad").val();

	datosPaciente.direccion		= $('#direccion').data("wysihtml5").editor.getValue();//$("#direccion").val();
	datosPaciente.email			=$("#email_paciente").val();

	datosPaciente.tipo_sangre	=$("#tipo_sangre").val();
	//datosPaciente.usuario_k		= getCookie('usuario_medicall_k');

	datosPaciente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
	datosPaciente.prefix = usuario.prefix;
	if(datosPaciente.nombres!="" && datosPaciente.apellidos!="" && datosPaciente.num_id!=""){
		socket.emit("guardarPaciente",datosPaciente);
	}else{
	    mensaje.mensaje="No se han completado los datos obligatoros";
        mensaje.success=false;
        mensaje.btnConfirma="No";
 		mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
        delServidor(mensaje);
	}
}
/****************** CONTACTOS ***************************/
function guardarContacto(){
	var datosContacto={};
	datosContacto.paciente_k		= $("#paciente_k").val();
	datosContacto.contacto_k		= $("#contacto_k").val();
	//datosContacto.tipo_contacto		= $("#catego_contatco").val();
	//datosContacto.fecha_ingreso		= $("#f_ingreso_contacto").val();
	datosContacto.nombres			= $("#nombres_contacto").val();
	datosContacto.apellidos			= $("#apellidos_contacto").val();
	datosContacto.num_id			= $("#identidad_contacto").val();
	datosContacto.division			= $("#division_contacto").val();
	datosContacto.profesion			= $("#profesion_contacto").val();
	datosContacto.edad				= $("#edad_contacto").val();
	datosContacto.estado_civil		= $("#estadoCivil_contacto").val();
	if($("#masculino_contacto").prop('checked')==true){
		datosContacto.sexo				=$("#masculino_contacto").val();
	}else{
		datosContacto.sexo				=$("#femenino_contacto").val();
	}
	datosContacto.fecha_nacimiento= $("#fecha_nacimiento_contacto").val();
	datosContacto.telefono		=$("#telefono_contacto").val();
	datosContacto.celular		=$("#celular_contacto").val();

	datosContacto.pais			=$("#pais_contacto").val();
	datosContacto.departamento	=$("#departamentos_contacto").val();
	datosContacto.municipalidad	=$("#municipalidad_contacto").val();
	datosContacto.ciudad		=$("#ciudad_contacto").val();

	datosContacto.direccion		= $('#direccion_contacto').data("wysihtml5").editor.getValue();//$("#direccion").val();
	datosContacto.email			=$("#email_contacto").val();

	datosContacto.tipo_sangre	=$("#tipo_sangre_contacto").val();
	//datosContacto.usuario_k		= getCookie('usuario_medicall_k');

	datosContacto.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
	datosContacto.prefix = usuario.prefix;
	if(datosContacto.nombres!="" && datosContacto.apellidos!="" && datosContacto.num_id!=""){
		socket.emit("guardarContacto",datosContacto);
	}else{
	    mensaje.mensaje="No se han completado los datos obligatoros";
        mensaje.success=false;
        mensaje.btnConfirma="No";
 		mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
        delServidor(mensaje);
	}
}
/********************************************************/
function eliminarPacientes(){
	var datosPaciente={};
	datosPaciente.paciente_k	=$("#paciente_k").val();
	datosPaciente.prefix = usuario.prefix;
	datosPaciente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');

	if(datosPaciente.paciente_k!=0){
		socket.emit("eliminarPaciente",datosPaciente);
	}else{
		mensaje.mensaje="No selecciono ningun paciente";
        mensaje.success=false;
        delSerisor(mensaje);
	}
}
function eliminarConsulta(){
	var datosPaciente={};
	datosPaciente.paciente_k	=$("#paciente_k").val();
	datosPaciente.consulta_k	=$("#consulta_k").val();
	datosPaciente.prefix = usuario.prefix;
	datosPaciente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');

	if(datosPaciente.paciente_k!=0 && datosPaciente.consulta_k!=0 ){
		socket.emit("eliminarConsulta",datosPaciente);
	}else{
		mensaje.mensaje="No selecciono ninguna consulta";
        mensaje.success=false;
        delSerisor(mensaje);
	}
	usuario.num_id=$("#identidad").val();
	usuario.paciente_k=$("#paciente_k").val();
	usuario.pagina = "Consulta";
	$("#fechas_expedientes").empty();
	socket.emit("getConsulta",usuario);
}
$("#btnGuardarCita").on("click",function(){
	// guardarCita
	if($("#paciente_k").val()!=0){
		socket.emit("cargarAreas",usuario);
		var droot = document.createElement("div");
		var calendar = citasCalendar(id,{
			title: "CITAS",
			width: 900,
			height: 60,
	    	content: droot
			},['Salir',function(){
	    	}],['Ordenar',function(){
	    	}],
	    	{nombre:"Hernan"});
				if(usuario.citas.doctor_k==0){
					//usuario.citas.doctor_k = getCookie('usuario_medicall_doctor_k');
				}
				if(usuario.citas.especialidad_k==0){
					//usuario.citas.especialidad_k = getCookie('usuario_medicall_especialidad_k');
				}
	    $("#doctor_k").val(usuario.citas.doctor_k);
	  	agenda(usuario);
			//console.log(getCookie('usuario_medicall_area_k'));
	}else{
		mensaje.mensaje="No ha selecionado ningun paciente";
		mensaje.success=false;
		mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 		mensaje.funcionConfirma="";
 		mensaje.btnConfirma="No";
		delServidor(mensaje);
	}
});

$("#crearCita").click(function(){
	$("#eventContentCrearCita").modal('toggle');
	usuario.citas.doctor_k=$("#send_doctor_k").val();
	usuario.citas.especialidad_k=$("#send_especialidad_k").val();
	usuario.citas.paciente_k=$("#send_paciente_k").val();
	usuario.citas.identidad=$("#identidad").val();
	usuario.citas.hora=$("#startTimeCita").val();
	usuario.citas.dia=$("#dateCita").val();
	usuario.citas.tipo = $("#catego_paciente").val();
	usuario.citas.cita_k=0;
	//console.log(usuario);
	programarConsulta();
});
function programarConsulta(){
	if(usuario.citas.paciente_k==0){
		alertas.contenido="Campos insuficientes";
	  alertas.btnConfirma="No";
	  alertas.funcionConfirma="";
	  alertas.funcionCancela="";
	  alertas.color="red";
	  alertas.btnColor="red";
	  alertas.icono="fa fa-ravelry";
	  alerta(alertas);
	}else{
		socket.emit("programaConsulta",usuario);
	}

}
function nuevoPaciente(){
	$("#expediente_k").val(0);
	$("#paciente_k").text(0);
	$("#division").val("");
	$("#identidad").val("");
	$("#nombres").val("");
	$("#apellidos").val("");
	$(".nombrePaciente").text("");
	$("#profesion").val("");
	$("#edad").val(0);
	$("#estadoCivil").val("no");
	$("#fecha_nacimiento").val(moment(new Date()).format('DD/MM/YYYY'));
	$("#email_paciente").val("");
	$("#femenino").prop("checked",false);
	$("#masculino").prop("checked",false);
	$("#tipo").val("");
	$("#telefono").val("");
	$("#celular").val("");
	//$("#direccion").val("");
	//$('#direccion').data("wysihtml5").editor.clear();
	$('#direccion').data("wysihtml5").editor.setValue("");
	$("#cantidad_consultas").empty();
	$("#cantidad_consultas").text(0);

	$("#fecha1").empty();
	$("#fecha1").text(moment(new Date()).format('DD/MM/YYYY'));

	$("#fecha2").empty();
	$("#fecha2").text(moment(new Date()).format('DD/MM/YYYY'));

	$("#fechas_expedientes").empty();

	$("#paisLocal").click();
	$("#ciudad").val("");
	var url = "img/usuario.jpg";
	$("#photo").attr("src",url);

	//$(".app").css("display","none");
	 $("#fechas_expedientes").empty();
	var fechas = '<tr>'+
      '<td class="text-white"></td>'+
      '<td class="text-white btnFecha">'+
        '<div class="col-sm-10"><a data-fecha_ex="" id="c_button-outline0" href="#" class="btn pi-draggable btn-outline-warning" draggable="true" onclick="buscarExpediente(this)">  /  /  </a><div>'+
      '</td>'+
    '</tr>';
  $("#fechas_expedientes").append(fechas) ;

	$("#app").data("wysihtml5").editor.setValue("");
	$("#eym").data("wysihtml5").editor.setValue("");
	$("#padece").data("wysihtml5").editor.setValue("");

	$("#obser1").data("wysihtml5").editor.setValue("");
	$("#obser2").data("wysihtml5").editor.setValue("");
	$("#obser3").data("wysihtml5").editor.setValue("");
	$("#obser4").data("wysihtml5").editor.setValue("");
	$("#obser5").data("wysihtml5").editor.setValue("");
	$("#obser6").data("wysihtml5").editor.setValue("");
	$("#diagnostico").data("wysihtml5").editor.setValue("");
	$("#plan").data("wysihtml5").editor.setValue("");
	$("#examenes").data("wysihtml5").editor.setValue("");

	$("#apnp").val("");
	$("#ahf").val("");
	$("#partos").val(0);
	$("#gestas").val(0);
	$("#abortos").val(0);
	$("#fur").val(moment(new Date()).format('DD/MM/YYYY'));


	$("#fum").attr("checked",false);
	$("#alc").attr("checked",false);
	$("#dro").attr("checked",false);
	$("#otros").attr("checked",false);

	$("#hta").attr("checked",false);
	$("#cardiacos").attr("checked",false);
	$("#dm").attr("checked",false);
	$("#asmaticos").attr("checked",false);
	$("#pulmonares").attr("checked",false);
	$("#alergicos").attr("checked",false);
}
$("#admin_citas").on("click",function(){
	$("#admin_citas").attr('class','btn pi-draggable btn-outline-primary disabled');
	usuario.citas.paciente_k	= 0;
	usuario.citas.pagina	= "citas";
	//usuario.citas.name	= getCookie('usuario_medicall');
});

$("#masculino").click(function(){
	if($("#masculino").prop('checked')==true){
		$("#masculino").parent().children("span").children('b').removeClass().addClass("text-warning");
		$("#femenino").parent().children("span").children('b').removeClass().addClass("text-primary");

		$("#masculinof").prop('checked',true);
		$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-warning");
		$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-primary");
	}
});
$("#femenino").click(function(){
	if($("#femenino").prop('checked')==true){
		$("#femenino").parent().children("span").children('b').removeClass().addClass("text-warning");
		$("#masculino").parent().children("span").children('b').removeClass().addClass("text-primary");

		$("#femeninof").prop('checked',true);
		$("#femeninof").parent().children("span").children('b').removeClass().addClass("text-warning");
		$("#masculinof").parent().children("span").children('b').removeClass().addClass("text-primary");
	}
});
$("#buscar").focusout(function(){
	$("#buscar_btn").click();
});
$("#buscar_btn").click(function(e){
	e.preventDefault();
	var datos={};
	datos.num_id=$("#buscar").val();
	datos.prefix=usuario.prefix;
	datos.pagina = "datos";
	socket.emit("buscarPacienteIdentidad",datos);
});
$("#identidad").focusout(function(e){
	e.preventDefault();
	var datos={};
	datos.num_id=$(this).val();
	datos.prefix=usuario.prefix;
	datos.pagina = "datos";
	socket.emit("buscarPacienteIdentidad",datos);
});
$("#identidad_contacto").focusout(function(e){
	e.preventDefault();
	var datos={};
	datos.num_id=$(this).val();
	datos.prefix=usuario.prefix;
	datos.pagina = "datos";
	socket.emit("buscarContactoIdentidad",datos);
});
function nuevoExpediente(){
	$("#app").data("wysihtml5").editor.setValue("");
	$("#eym").data("wysihtml5").editor.setValue("");
	$("#padece").data("wysihtml5").editor.setValue("");

	$("#apnp").val("");
	$("#ahf").val("");
	$("#expediente_k").val(0);
	$("#datePickerFechaUr").val("01/01/1999");
}
function validarExpediente (){
 	$.each($("#fechas_expedientes a"),function(item,index){
 		if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#expediente_k").val()==$(index).attr("data-expediente_k")){
			mensaje.mensaje="Ya existe un registro con esta fecha y Expediente, procedera a reemplazar el registro actual";
 			mensaje.success=false;
 			mensaje.btnConfirma="Si";
 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 			mensaje.funcionConfirma=guardarExpediente;
 			mensaje.funcionCancela=resetRegistro;
 			delServidor(mensaje);
		}else if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#expediente_k").val() == 0 && nuevoRegistro==0){
 			mensaje.mensaje="Ya existe un registro con esta fecha, procedera a crear un nuevo registro con la misma fecha";
 			mensaje.success=false;
 			mensaje.btnConfirma="Si";
 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
 			mensaje.funcionConfirma=guardarExpediente;
 			nuevoRegistro = 1;
 			mensaje.funcionCancela=resetRegistro;
 			delServidor(mensaje);
		}
 	});
}
function validarFisico (data){
	var contiene = $("a:contains("+moment(new Date()).format('DD/MM/YYYY')+")");
	/*if(contiene){
		console.log("validarFisico",contiene, contiene.length);
	}else{
		console.log("validarFisico","No contiene", contiene.length);
	}	*/
 	$.each($("#fechas_expedientes a"),function(item,index){
 		if(data=="fisico"){
			if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#pre_k").val() == $(index).attr("data-pre_k")){
	 			mensaje.mensaje="Ya existe un registro con esta fecha y Registro, procedera a reemplazar el registro actual";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = btnGuardarPre;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}else if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#pre_k").val() == 0 && nuevoRegistro==0){
	 			mensaje.mensaje="Ya existe un registro con esta fecha, procedera a crear un nuevo registro con la misma fecha";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = btnGuardarPre;
	 			nuevoRegistro = 1;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}
		}else if(data=="consulta"){
			if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#consulta_k").val() == $(index).attr("data-consulta_k")){
	 			mensaje.mensaje="Ya existe un registro con esta fecha y Registro, procedera a reemplazar el registro actual";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = guardarConsulta;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}else if($(index).text() === moment(new Date()).format('DD/MM/YYYY') && $("#pre_k").val() == 0 && nuevoRegistro==0){
	 			mensaje.mensaje="Ya existe un registro con esta fecha, procedera a crear un nuevo registro con la misma fecha";
	 			mensaje.success=false;
	 			mensaje.btnConfirma="Si";
	 			mensaje.tema= 'supervan'; // 'material', 'bootstrap','light','dark','modern','supervan'
	 			mensaje.funcionConfirma = guardarConsulta;
	 			nuevoRegistro = 1;
	 			mensaje.funcionCancela=resetRegistro;
	 			delServidor(mensaje);
			}
		}
 	});
}
function resetRegistro(){
	nuevoRegistro = 0;
}
function eliminarExpediente (){
	usuario.pagina			= "Expediente";
	usuario.paciente_k 		= $("#paciente_k").val();
	usuario.num_id			= $("#identidad").val();
	var expediente = {
		expediente_k		: $("#expediente_k").val(),
		paciente_k			: $("#paciente_k").val()
	}
	expediente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
	usuario.expediente = expediente;
	//console.log("Eliminar Expediente: ",usuario);
	socket.emit("eliminarExpediente",usuario);
}
function guardarExpediente (){
	usuario.pagina			= "Expediente";
	var expediente_checks	= {};
	var checks	= [];
	var expediente = {
		padecimiento_actual : $("#padece").data("wysihtml5").editor.getValue(),//$("#padece").val(),
		ant_per_pat				: $("#app").data("wysihtml5").editor.getValue(),//$("#app").val(),
		enf_medicamentos	: $("#eym").data("wysihtml5").editor.getValue(),//$("#eym").val(),
		ant_per_no_pat		: $("#apnp").val(),
		ant_her_fam			: $("#ahf").val(),
		expediente_k		: $("#expediente_k").val(),
		paciente_k			: $("#paciente_k").val(),
		num_id				: $("#identidad").val(),
		fecha_ur			: $("#datePickerFechaUr").val(),
		partos				: $("#partos").val(),
		abortos				: $("#abortos").val(),
		gestas				: $("#gestas").val()
	};
	expediente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
	expediente.hora = moment(new Date()).format('HH:mm:ss');
	usuario.expediente = expediente;

	/* Cargar padecimientos */
	$.each($("#apnp_div input"),function(){
		expediente_checks	= {};
		expediente_checks.tenido_k = $(this).attr("id");
		expediente_checks.des_pad = $(this).attr("data-despad");
		expediente_checks.pad = $(this).attr("data-pad");
		expediente_checks.valor = $(this).attr("value");
		expediente_checks.num_id = $("#identidad").val();
		expediente_checks.paciente_k = $("#paciente_k").val();

		checks.push(expediente_checks);
	});
	$.each($("#ahf_div input"),function(){
		expediente_checks	= {};
		expediente_checks.tenido_k = $(this).attr("id");
		expediente_checks.des_pad = $(this).attr("data-despad");
		expediente_checks.pad = $(this).attr("data-pad");
		expediente_checks.valor = $(this).attr("value");
		expediente_checks.num_id = $("#identidad").val();
		expediente_checks.paciente_k = $("#paciente_k").val();
		checks.push(expediente_checks);
	});
	usuario.padece = checks;

	socket.emit("guardarExpediente",usuario);
}
function eliminarPreclinica(data){
	usuario.preclinica={};
	usuario.preclinica.pre_k=$("#pre_k").val();
	usuario.preclinica.paciente_k = $("#paciente_k").val();
	usuario.preclinica.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
	//console.log("Eliminar Peclinica: ",usuario);
	socket.emit("eliminarPreclinica",usuario);
}
function btnGuardarPre(){
	if($("#femeninof").prop("checked")==true){
		var sexo = "F";
	}else if($("#masculinof").prop("checked")==true){
		var sexo = "M";
	}
	if($("#antes").prop("checked")==true){
		var cuando= "A";
	}else if($("#despues").prop("checked")==true){
		var cuando = "D";
	}

	var pre_clinica = {
		paciente_k	: $("#paciente_k").val(),
		identidad	: $("#identidad").val(),
		data_accion	: $(this).attr("data-accion"),
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
		toma		: cuando,
		jornada		: $("#jornada").val(),
		hora		: $("#datePickerGlucosa").val(),
		temperatura	: $("#temperatura").val(),
		pulso		: $("#pulso").val(),
		indicador	: $("#indicadorFisico").html(),
		obser1		: $("#obser1").data("wysihtml5").editor.getValue(),//$("#obser1").val(),
		obser2		: $("#obser2").data("wysihtml5").editor.getValue(),//$("#obser2").val(),
		obser3		: $("#obser3").data("wysihtml5").editor.getValue(),//$("#obser3").val(),
		obser4		: $("#obser4").data("wysihtml5").editor.getValue(),//$("#obser4").val(),
		obser5		: $("#obser5").data("wysihtml5").editor.getValue(),//$("#obser5").val(),
		obser6		: $("#obser6").data("wysihtml5").editor.getValue(),//$("#obser6").val(),
		fecha_creacion : fechaHoy()
	};
	usuario.preclinica	= pre_clinica;
	usuario.pagina		= "preclinica";
	socket.emit("preclinica",usuario);
}
function guardarConsulta(data){
	var consulta = {
		paciente_k	: $("#paciente_k").val(),
		num_id	: $("#identidad").val(),
		data_accion	: $(data).attr("data-accion"),
		consulta_k	: $("#consulta_k").val(),
		diagnostico	: $("#diagnostico").data("wysihtml5").editor.getValue(),//$("#diagnostico").val(),
		plan		: $("#plan").data("wysihtml5").editor.getValue(),//$("#plan").val(),
		examenes	: $("#examenes").data("wysihtml5").editor.getValue(),//$("#examenes").val(),
		fecha_creacion : moment(new Date()).format('YYYY-MM-DD'),
		fecha_consulta : $("#f_actual").val(),
		costo : 0
	};
	usuario.consulta	= consulta;
	usuario.pagina		= "Consulta";
	console.log(usuario);
	socket.emit("guardarConsulta",usuario);
}
function limpiarChecks(){
	$("#col_apnp1").empty();
	$("#col_apnp2").empty();
	$("#col_apnp3").empty();
	$("#col_apnp4").empty();

	$("#col_ahf1").empty();
	$("#col_ahf2").empty();
	$("#col_ahf3").empty();
}
function limpiarExpediente(){

}
function buscarPersonal(){
	if($(".modal-title").text()=="Lista de Pacientes"){
		$("#buscar_paciente").val("");
	}
	$('#buscarPacientes').modal('toggle');
	$(".modal-title").text("Lista de Personal");
	var bespecialidad = $("#bEspecialidad").val();
	if($("#buscar_paciente").val()!==""){
		var bnombre=$("#buscar_paciente").val();
		var data = {init:data_ini.init,end:data_ini.end,bnombre:bnombre,bespecialidad:bespecialidad};
		usuario.buscarPersonal = data;
	}else{
		var data = {init:data_ini.init,end:data_ini.end,bespecialidad:bespecialidad};
		usuario.buscarPersonal = data;
	}
	//console.log("bespecialidad-> "+usuario.buscarPersonal);
	socket.emit("buscarPersonal",usuario);
}
function editarPersonal(data){
	var nombre		= $.trim($(data).attr("data-nombre"));
	var apellido	= $.trim($(data).attr("data-apellido"));
	var doctor_k	= $.trim($(data).attr("id"));
	var especialidad_k = $(data).attr("data-area_k");
	$("#nombreDr").val(nombre+" "+apellido);
	//$("#bEspecialidad").val(getCookie('usuario_medicall_area_k'));
	//$("#bEspecialidad option[value="+getCookie('usuario_medicall_area_k')+"]").attr('selected', true);
	$("#doctor_k").val(doctor_k);
	$("#send_especialidad_k").val(especialidad_k);
	$('#buscarPacientes').modal('toggle');
	usuario.citas.doctor_k=doctor_k;
	usuario.citas.especialidad_k =especialidad_k;
	agenda(usuario);
}
function limpiarPersonal(data){
	$("#nombreDr").val("");
	$("#doctor_k").val(0);
	//usuario.citas.especialidad_k=$("#especialidad_k").val();
	usuario.citas.especialidad_k=0;
	//usuario.citas.doctor_k = getCookie('usuario_medicall_doctor_k');
	agenda(usuario);
}
function cambioEspecialidad(data){
	var especialidad_k	= $.trim($(data).val());
	$("#especialidad_k").val(especialidad_k);
	usuario.citas.especialidad_k=especialidad_k;
	usuario.citas.doctor_k=$("#doctor_k").val();
	agenda(usuario);
}
function editarPaciente(data){
	if($('#buscarPacientes').hasClass('show')){
		$('#buscarPacientes').modal('toggle');
	}
			expedientes = [];
			padecimientos = [];
			tenido = [];
	var id = $(data).attr("id");
	var num_id=$(data).attr("data-num_id");
	var nombre=$(data).attr("data-nombre");
	var apellido=$(data).attr("data-apellido");
	var nombres = nombre.trim()+" "+apellido.trim();
	var datos = {
			paciente_k:$(data).attr("id"),
			num_id:$(data).attr("data-num_id"),
			nombre:$(data).attr("data-nombre"),
			apellido:$(data).attr("data-apellido"),
			nombres:nombres,
			prefix : usuario.prefix,
			pagina :"Datos"
		};
	socket.emit("buscarPaciente",datos);
}
function delivery(){}
function loadImage() {
	var input, file, fr, img;
	if (typeof window.FileReader !== 'function') {
	    alert("El archivo API No soporta este navegador.");
	    return;
	}
	input = document.getElementById('imgfile');
	if (!input) {
	    alert("Um, No se ha podido encontrar el elemento imagen.");
	}else if (!input.files) {
	    alert("Este navegador no parece ser compatible con la propiedad `file` de las entradas de archivos.");
	}else if (!input.files[0]) {
	    alert("Seleccione un archivo antes de hacer clic en 'Cargar'");
	}else {
	    file = input.files[0];
	    fr = new FileReader();
	    fr.onload = createImage;
	    fr.readAsDataURL(file);
	}
	function createImage() {
	    img = new Image();
	    img.onload = imageLoaded;
	    img.src = fr.result;
	    $("#photo").attr('src',fr.result);
	}
	function imageLoaded() {
	    var canvas = document.getElementById("canvas");
					context = canvas.getContext('2d');
	    context.width = img.width;
	    context.height = img.height;
	    context.drawImage(img,0,0);
	    canvas.toDataURL("image/png",0.5);
	}
}
function cargarImagenLocal(){
	document.getElementById("imgfile").click();
}
$('#imgfile').change(function(){
    loadImage();
});
$("#btn_load_0").click(function(){
    upload_photo_snap("local");
});
$("#download-photo-snap").click(function(){
    upload_photo_snap("server");
});
function desabilitar(){
	$("#navbarPacientes a").each(function(item,index){
		if($(index).attr('id')!="inicio"){
			$(index).addClass("disabled");
		}
  });
}
function habilitar(){
	 $("#navbarPacientes a").each(function(item,index){
			$(index).removeClass("disabled");
   });
}
function validarMenu(data){
	var tab = $(data).attr("href");
	bloquearDatos(tab);
	if($("#femenino").prop("checked")==true){
		$("#femeninof").prop("checked",true);
		$("#masculinof").prop("checked",false);
		$("#antecedentes_femeninos").css("display","");
	}else if($("#femenino").prop("checked")!=true){
		$("#masculinof").prop("checked",true);
		$("#femeninof").prop("checked",false);
		$("#antecedentes_femeninos").css("display","none");
	}
/*Examen Fisico*/
	var fecha = $("#fecha_nacimiento").val();
	var edad = calcular_edad(fecha);
	$("#edadf").val(edad);
	if(usuario.menu!=$(data).attr("name")){
		usuario.cambio=1;
	}else{
		usuario.cambio=0;
	}
	usuario.menu	= $(data).attr("name");
	usuario.cod 	= $(data).attr("id");
	usuario.pagina	= $(data).attr("data-pagina");
	socket.emit("validarMenu",usuario);
}


function openAnt(evt, antName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("antecedentes");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-blue", "");
  }
  document.getElementById(antName).style.display = "block";
	if(evt!="null"){
		evt.currentTarget.firstElementChild.className += " w3-border-blue";
	}else{
		document.getElementById("pato").firstElementChild.className += " w3-border-blue";
	}
}

function openExamen(evt, exaName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("examen");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinke");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-border-blue", "");
  }
  document.getElementById(exaName).style.display = "block";
	if(evt!="null"){
		evt.currentTarget.firstElementChild.className += " w3-border-blue";
	}else{
		document.getElementById("cabezat").firstElementChild.className += " w3-border-blue";
	}
}
var accordion = (function(){
	var $accordion = $('.js-accordion');
	var $accordion_header = $accordion.find('.js-accordion-header');
	var $accordion_item = $('.js-accordion-item');
	// default settings
	var settings = {
		// animation speed
		speed: 400,

		// close all other accordion items if true
		oneOpen: false
	};
	return {
	// pass configurable object literal
		init: function($settings) {
			$accordion_header.on('click', function() {
				accordion.toggle($(this));
			});
			$.extend(settings, $settings);
			// ensure only one accordion is active if oneOpen is true
			if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
				$('.js-accordion-item.active:not(:first)').removeClass('active');
			}
			// reveal the active accordion bodies
			$('.js-accordion-item.active').find('> .js-accordion-body').show();
		},
		toggle: function($this) {

			if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
				$this.closest('.js-accordion')
			       .find('> .js-accordion-item')
			       .removeClass('active')
			       .find('.js-accordion-body')
			       .slideUp()
			}
		  // show/hide the clicked accordion item
			$this.closest('.js-accordion-item').toggleClass('active');
			$this.next().stop().slideToggle(settings.speed);
		}
	}
})();
