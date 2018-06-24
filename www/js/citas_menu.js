$(document).ready(function(){
	/*************************/
	$('#calendar').fullCalendar({
		customButtons: {
			/*print: {
			  text: 'Imprimir',
			  click: function() {
			  	  printDatos();
			  }
			},
			paciente: {
			  text: 'Paciente',
			  click: function() {
			  	if($("#buscarPacientes .modal-title").text()=="Lista de Personal"){
					$("#buscar_paciente").val("");
				}
				$("#buscarPacientes .modal-title").text("Lista de Pacientes");
				$('#buscarPacientes').modal('toggle');
				buscar_paciente_btn();
			  }
			},*/
			limpiar: {
			  text: 'Todos',
			  click: function() {
			      limpiarPersonal();
			  }
			}
		},
		height: 320,
		header: {
			left: 'prev,next today limpiar ',
			center: 'title',
			right: 'year,month,agendaDay',//'year,month,agendaWeek,agendaDay,listWeek',
			abajo: 'print,paciente'
		},
		eventOverlap: false,
		editable: false,
		nowIndicator: false,
		defaultTimedEventDuration: '00:20:00',
		scrollTime: '06:00:00',
		minTime: '06:00:00',
		maxTime: '16:00:00',
		defaultDate: moment(new Date()).format('YYYY-MM-DD'),
		slotDuration:"00:20:00",
		navLinks: true, // can click day/week names to navigate views
		eventLimit: true, // allow "more" link when too many events
		locale: 'es',
		events: [{}],
		eventRender: function(event, element) {
		  element.attr('href', 'javascript:void(0);');
		  if(event.paciente){
			element.text(event.hora+" - "+event.paciente+" (Medico: "+event.doctor+" Area: "+event.especialidad+")");
		  }else{
		  	element.text(event.title);
		  }
		},
		loading: function(bool) {
			$('#loading').toggle(bool);
		},
		eventClick: function(calEvent, jsEvent, view) {
		  //console.log("calEvent: ",calEvent)
		  var titulo = calEvent.title;
		  if(titulo.substring(0,6)!=="Citas:"){
		      $("#startDate").val(calEvent.fecha);
		      $("#startTime").val(calEvent.time);
		      $("#eventInfo").text(calEvent.cita_k);
		      $("#pacienteList2").text(calEvent.paciente);
		      $("#send_doctor_nombre").val(calEvent.doctor);
		      $("#doctorList2").text(calEvent.doctor);
		      $("#especialidadList2").text(calEvent.especialidad);
		      $("#horaList2").text(calEvent.time);
		      $("#fechaList2").text(calEvent.fecha);
		      $("#send_doctor_k").val(calEvent.doctor_k);
		      $("#send_especialidad_k").val(calEvent.area_k);
		      if(event.url){
		        $("#eventLink").attr('href', "#");
		      }
		      $('#eventContentModCita').modal('toggle');
		  }
		}
  	}).on('click', '.fc-month-button', function() {
        usuario.periodo_citas = "mes";
        agenda(usuario);
    }).on('click', '.fc-agendaWeek-button, .fc-agendaDay-button, .fc-listWeek-button', function() {
        usuario.periodo_citas = "semana";
        agenda(usuario);
    }).on('click', '.fc-next-button, .fc-prev-button, .fc-today-button', function() {
        agenda(usuario);
        updateClases();
    });

    var especialidad_k = '<div class="col-xs-3 col-sm-2 col-md-1 col-lg-1" style="float:left;padding: 0px;display:none">'+
                        '<input value = "0" type="text" class="border border-primary text-primary" id="especialidad_k" style="border-radius:5px;height:35px; width:100%;padding-left:5px;" readonly>'+
                      '</div>';
    var doctor_k = '<div class="col-xs-3 col-sm-2 col-md-1 col-lg-1" style="float:left;padding: 0px;display:none">'+
                        '<input type="number" value="0" class="border border-primary text-primary" id="doctor_k" style="border-radius:5px;height:35px; width:100%;padding-left:5px;" readonly>'+
                      '</div>';
    var paciente_k = '<div class="col-xs-3 col-sm-2 col-md-1 col-lg-1" style="float:left;padding: 0px;display:none">'+
                        '<input type="number" value="0" class="border border-primary text-primary" id="paciente_k" style="border-radius:5px;height:35px; width:100%;padding-left:5px;" readonly>'+
                      '</div>';
    var num_id = '<div class="col-xs-3 col-sm-2 col-md-2 col-lg-2" style="float:left;padding: 0px;display:none">'+
                        '<input type="text" value="" class="border border-primary text-primary" id="num_id" style="border-radius:5px;height:35px; width:100%;padding-left:5px;" readonly>'+
                      '</div>';
    var categoria = '<div class="col-xs-3 col-sm-2 col-md-1 col-lg-1" style="float:left;padding: 0px;display:none">'+
                        '<input type="number" value="0" class="border border-primary text-primary" id="categoria" style="border-radius:5px;height:35px; width:100%;padding-left:5px;" readonly>'+
                      '</div>';
  	$(".fc-center h2").css("font-size","20px");
  	$(".fc-abajo").css("margin-top","20px");
  	$(".fc-abajo").append(especialidad_k);
  	$(".fc-abajo").append(doctor_k);
  	$(".fc-abajo").append(paciente_k);
  	$(".fc-abajo").append(categoria);
  	$(".fc-abajo").append(num_id);
  	$("#nombreDr").val(usuario.usuario_nombre);

    $("#unlockCita").click(function(){
        $("#startDate").removeAttr("readonly");
        $("#startTime").removeAttr("readonly");
    });

    $("#modificarCita").click(function(){
        if($("#startDate").attr("readonly")!="readonly"){
            $("#startDate").attr("readonly",true);
            $("#startTime").attr("readonly",true);

            usuario.citas.nuevaFecha = $("#startDate").val();
            usuario.citas.nuevaHora = $("#startTime").val();
            usuario.citas.cita_k = $("#eventInfo").text();
            usuario.citas.cancelar = 0;
            usuario.citas.paciente_k="update";
            if(usuario.citas.doctor_k==0){
            	usuario.citas.doctor_k=$("#send_doctor_k").val();
            }
            if(usuario.citas.doctor_k==0){
            	mensaje.mensaje="No ha seleccionado un medico, por favor seleccione uno";
            	mensaje.success=false;
            	delServidor(mensaje);
            }else{
              programarConsulta();
            }

        }else{
            mensaje.mensaje = "No tiene autorizacion para realizar esta operacion";
            mensaje.success=false;
            delServidor(mensaje);
        }
        $("#eventContentModCita").modal("toggle");
    });
    $("#delCita").click(function(){
        if($("#startDate").attr("readonly")!="readonly"){
            $("#startDate").attr("readonly",true);
            $("#startTime").attr("readonly",true);

            usuario.citas.nuevaFecha = $("#startDate").val();
            usuario.citas.nuevaHora = $("#startTime").val();
            usuario.citas.cita_k = $("#eventInfo").text();
            usuario.citas.cancelar = 1;
            usuario.citas.paciente_k="update";
            programarConsulta();
        }else{
            usuario.citas.cancelar = 0;
            mensaje.mensaje = "No tiene autorizacion para realizar esta operacion";
            mensaje.success=false;
            delServidor(mensaje);
        }
    });
	//socket.emit('cargarCitas',usuario);
	socket.on('cargarCitas',function(data){
		//console.log("CARGAR CITAS MENU",data);
		var eventos = [];
		if(data.parent2){
			for(var i = 0; i<data.parent2.length;i++){
			  if(data.periodo_citas=="mes"){
			    if(data.parent2[i].cantidad){
			      data.parent2[i].title = data.parent2[i].title +data.parent2[i].cantidad;
			    }else{
			      data.parent2[i].end = data.parent2[i].end;
			    }
			  }else if(data.periodo_citas!="mes"){
			    for(var i = 0; i<data.parent2.length;i++){
			        data.parent2[i].title = data.parent2[i].title +' - '+ data.parent2[i].time;
			    }
			  }
			}
		}
		eventos["events"]=data.parent2;
		$('#calendar').fullCalendar( 'removeEvents');
		$('#calendar').fullCalendar( 'addEventSource', eventos);
		$('#calendar').fullCalendar( 'refetchEvents' );
		updateClases();
  	});

  	/*$(".fc-month-button").click(function(){
    	usuario.periodo_citas = "mes";
        agenda(usuario);
    });*/
    /*$(".fc-agendaWeek-button").click(function(){
    	usuario.periodo_citas = "semana";
        agenda(usuario);
    });*/
    /*$(".fc-agendaDay-button").click(function(){
    	usuario.periodo_citas = "dia";
        agenda(usuario);
	});*/
	/*$(".fc-listWeek-button").click(function(){
    	usuario.periodo_citas = "agenda";
    	agenda(usuario);
	});
	$(".fc-next-button").click(function(){
		 updateClases();
	});*/
	/*$(".fc-prev-button").click(function(){
		 updateClases();
	});*/
	/*$(".fc-today-button").click(function(){
		 updateClases();
	});*/

	/*socket.on('areasClinicas',function(datos){
	    $("#bEspecialidad").empty();
	    var total = datos.data.length;
	    for(var i=0; i<=total;i++){
	        if(i<total){
	            var areas = '<option id="area_'+datos.data[i].area_k+'" value="'+datos.data[i].area_k+'">'+datos.data[i].nombre+'</option>';
	            $("#bEspecialidad").append(areas);
	        }else{
	            var areas = '<option id="all" value=0>TODOS</option>';
	            $("#bEspecialidad option:first").before(areas);
	            $("#bEspecialidad").val(0);
	            $("#bEspecialidad option[value=0]").attr('selected', true);
	            //$("#bEspecialidad option[value='all']").prop('selected', true);
	        }

	    }
	});*/
	socket.on("buscarPersonal",function(data){
		if(data.success == false){
			mensaje.mensaje="No tiene acceso a buscar datos";
	        mensaje.success=false;
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
				if(usuario.buscar==0){
					var buscar = "editarPersonal(this)";
				}else{
					var buscar = "modificarPersonal(this)";
				}
				var personal = '<li class="list-group-item">'+
								'<!--<div class="checkbox" style="margin-right:5px;">'+
								num+
								'</div>-->'+
	                            '<!--<div class="checkbox">'+
	                                '<input type="checkbox" id="checkbox'+i.toString()+'" />-->'+
	                                '<label for="checkbox'+i.toString()+'">'+
	                                    data.datos[i].nombre+" "+data.datos[i].apellido+" - <span style='font-size:12px;'>"+data.datos[i].especialidad+"</span>"+
	                                '</label>'+
	                            '<!--</div>-->'+
	                            '<div class="pull-right action-buttons">'+
	                                '<a href="#" id="'+data.datos[i].usuario_k+
	                                '" data-area_k="'+data.datos[i].area_k+
	                                '" data-especialidad="'+data.datos[i].especialidad+
	                                '" data-num_id="'+data.datos[i].num_id+
	                                '" data-apellido="'+data.datos[i].apellido+
	                                '" data-nombre="'+data.datos[i].nombre+
	                                '" onclick="'+buscar+'" ><span class="fa d-inline fa-lg fa fa-pencil"></span></a>'+
	                                '<!--<a href="#" class="trash"><span class="fa d-inline fa-lg fa fa-trash"></span></a>'+
	                                '<a href="#" class="flag"><span class="fa d-inline fa-lg fa fa-flag"></span></a>-->'+
	                            '</div>'+
	                        '</li>';
	                        $("#tablaPacientes").append(personal);
			};
		}
	});
	socket.on("citasProgramadas",function(data){
		usuario.citas.cancelar = 0;
		if(data.success==true){
			agendaMenu();
		}else{
			delServidor(data);
		}
	});
	socket.on("buscarPaciente",function(data){
		console.log("Cita guardada: ",data);
		usuario.citas.cancelar = 0;
		if(data.success==true){
			agenda(data);
		}else{
			delServidor(data);
		}
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
		document.getElementsByClassName("fc-limpiar-button")[0].hidden=true;
});
$("#send_doctor_nombre").click(function(){
	usuario.buscar=1;
	buscarPersonal();
});
$("#nombreDr").click(function(){
    usuario.buscar=0;
	buscarPersonal();
});

$("#paciente").click("",function(){
	if($("#buscarPacientes .modal-title").text()=="Lista de Personal"){
		$("#buscar_paciente").val("");
	}
	$("#buscarPacientes .modal-title").text("Lista de Pacientes");
	$('#buscarPacientes').modal('toggle');
	buscar_paciente_btn();
});


function clickDia(data){
	if(data.periodo){
	    if(data.fecha != undefined)
	    console.log("Fecha: ",data.fecha);
	}else{
	    if(data != undefined && $("#paciente").val()!==""){
	    	//console.log("DATA: ",data);
	        var hora = $(data).attr('data-time');
	        var fecha = $(data).attr('data-feha');
	        var date = $(data).attr('data-date');
	        var especialidad = $(data).attr('data-especialidad');
	        //console.log("Especialidad: ",especialidad)
	        $("#startTimeCita").val(hora);
	        $("#dateCita").val(date);
	        $("#send_doctor_k").val(usuario.citas.doctor_k);

	        $("#especialidadList").text($("#bEspecialidad option:selected").text());
	        $("#doctorList").text($("#nombreDr").val());
	        $("#pacienteList").text($("#paciente").val());

	        if(usuario.citas.doctor_k==0){
	            $("#send_doctor_k").val(usuario.doctor_k);
	            $("#send_especialidad_k").val(usuario.especialidad_k);
	            $("#doctorList").text("");
	        }
	        if(usuario.citas.especialidad_k>0){
	            $("#send_especialidad_k").val(usuario.citas.especialidad_k);
	        }else{
	            $("#send_especialidad_k").val(0);
	        }
	        $("#send_paciente_k").val($("#paciente_k").val());
	        if(usuario.citas.periodo=="dia"){
	            $('#eventContentCrearCita').modal('toggle');
	        }
	    }else if($("#paciente").val()===""){
	    	mensaje.mensaje="No ha seleccionado un paciente para realizar la cita";
	    	mensaje.success=false;
	    	delServidor(mensaje);
	    }
	}
}
function updateClases(){
	$('.fc-time-grid-event').css('height','17px');
	$('.fc-time-grid-event').css('left','0');
	$('.fc-time-grid-event').css('right','0');
	$('.fc-time-grid-event').css('margin-right','0');
}
function buscarPersonal(){
	if($(".modal-title").text()=="Lista de Pacientes"){
		$("#buscar_paciente").val("");
	}
	$('#buscarPacientes').modal('toggle');
	$(".modal-title").text("Lista de Personal");
	if($("#buscar_paciente").val()!==""){
		var bnombre=$("#buscar_paciente").val();
		var data = {init:data_ini.init,end:data_ini.end,bnombre:bnombre};
		usuario.buscarPersonal = data;
	}else{
		var data = {init:data_ini.init,end:data_ini.end};
		usuario.buscarPersonal = data;
	}
	socket.emit("buscarPersonal",usuario);
}

function limpiarPersonal(data){
	$("#nombreDr").val("");
	$("#doctor_k").val(0);
	$("#paciente_k").val(0);
	$("#num_id").val(0);
	$("#categoria").val(0);
	$("#paciente").val("");
	$("#nombreDr").val("");
	$("#especialidad_k").val(0);
	$("#bEspecialidad").val(0);
	$("#bEspecialidad option[value="+0+"]").attr('selected', true);
	usuario.citas.especialidad_k=0;
	usuario.citas.doctor_k=0;
	usuario.citas.paciente_k=0;
	agenda(usuario);
}
function cambioEspecialidad(data){
	var especialidad_k	= $.trim($(data).val());
	$("#especialidad_k").val(especialidad_k);
	usuario.citas.especialidad_k=especialidad_k;
	usuario.citas.doctor_k=$("#doctor_k").val();
	agenda(usuario);
}
function agenda(datos){
	//console.log("AGENDA DATOS-> ",datos)
	usuario.citas.pagina	= "citas";
	usuario.citas.name	= "";
    usuario.citas.periodo	= "mes";
	usuario.citas.doctor_k=usuario.usuario_k;
	usuario.citas.especialidad_k=usuario.especialidad_k;
	usuario.citas.paciente_k=0;
	usuario.citas.identidad=$("#num_id").val();
	usuario.citas.hora=$("#startTimeCita").val();
	usuario.citas.dia=$("#dateCita").val();
	usuario.citas.tipo=$("#categoria").val();
	usuario.citas.cita_k=0;
  socket.emit("cargarCitas",usuario);
}
function editarPaciente(data){
	var nombre		= $.trim($(data).attr("data-nombre"));
	var apellido	= $.trim($(data).attr("data-apellido"));
	$("#paciente").val(nombre+" "+apellido);
	var paciente_k	= $.trim($(data).attr("id"));
	$("#paciente_k").val($.trim($(data).attr("id")));
	$("#send_doctor_k").val(doctor_k);
	$("#num_id").val($(data).attr("data-num_id"));
	if($(data).attr("data-tipo")=="undefined"){
		var categoria = 0;
	}else{
		var categoria = $(data).attr("data-tipo");
	}
	$("#categoria").val(categoria);
	$("#tipo").val(categoria);
	$("#tipo option[value="+categoria+"]").attr('selected', true);

	$('#buscarPacientes').modal('toggle');
	usuario.citas.paciente_k = paciente_k;
	usuario.citas.doctor_k = 0;
	console.log("USUARIO: ",usuario);
	agenda(usuario);
}
function editarPersonal(data){
	var id = $(data).attr("id");
	var num_id=$(data).attr("data-num_id");
	var nombre=$(data).attr("data-nombre");
	var apellido=$(data).attr("data-apellido");

	$("#especialidad_k").val($(data).attr("data-area_k"));
	$("#doctor_k").val(id);
	var nombres = nombre.trim()+" "+apellido.trim();
	$("#nombreDr").val(nombres);

	$("#bEspecialidad").val($(data).attr("data-area_k"));
	$("#bEspecialidad option[value="+$(data).attr("data-area_k")+"]").attr('selected', true);

	$('#buscarPacientes').modal('toggle');

	usuario.citas.doctor_k=id;
	agenda(usuario);
}
function modificarPersonal(data){
	var id = $(data).attr("id");
	var num_id=$(data).attr("data-num_id");
	var nombre=$(data).attr("data-nombre");
	var apellido=$(data).attr("data-apellido");
	var nombres = nombre.trim()+" "+apellido.trim();
	if($(data).attr("data-area_k")!=="null"){
		usuario.citas.especialidad_k = $(data).attr("data-area_k");
	}else{
		usuario.citas.especialidad_k = 0;
	}
		usuario.citas.doctor_k = id;
	$("#send_doctor_nombre").val(nombres);
	$('#buscarPacientes').modal('toggle');
	console.log("USUARIOS: ",usuario);
}
function buscar_paciente_btn(data){
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
function programarConsulta(){
	if(usuario.citas.paciente_k==0){
		mensaje.mensaje="Campos insuficientes";
	    mensaje.success=false;
	    delServidor(mensaje);
	}else{
		console.log("USUARIO: ",usuario);
		socket.emit("programaConsulta",usuario);
	}
}
function cambioTipo(data){
	$("#categoria").val($(data).val());
}
$("#crearCita").click(function(){
	usuario.citas.doctor_k=$("#doctor_k").val();
	usuario.citas.especialidad_k=$("#especialidad_k").val();
	usuario.citas.paciente_k=$("#paciente_k").val();
	usuario.citas.identidad=$("#num_id").val();
	usuario.citas.hora=$("#startTimeCita").val();
	usuario.citas.dia=$("#dateCita").val();
	usuario.citas.cita_k=0;
	usuario.citas.tipo=$("#categoria").val();
	programarConsulta();
	$("#eventContentCrearCita").modal("toggle");
});

function printDatos() {
   //var fotos = document.getElementById("imagenPaciente");
   var elaborado = "";//$("#elaborado_por").val();
   var bottom ='<div class="separarInputPie">'+
            	    '<div type="text" id="separarInputPie" class="border-top">Elaborado por: '+elaborado+'</div>'+
            	 '</div>';
   //var cln = fotos.cloneNode(true);
      $("#calendar").print({
          globalStyles : true,
          mediaPrint : false,
          //stylesheet :"../css/printer.css",
          title:"MEDIC-OS",
          iframe : true,
          noPrintSelector : ".noprint",
          //titleUnoSelector : ".pacienteFoto",
          prepend :'',//Titulo,
          append : 'bottom',
          titleUno:"Prueba",
          footerUno:bottom,
          footerUnoSelector : ".footer_datos"
      });
}
