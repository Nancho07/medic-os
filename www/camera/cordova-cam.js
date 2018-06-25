(function(){
'use strict';
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var imageID;
// Cordova is ready to be used!
function onDeviceReady() {
    if (!navigator.camera) {
      throw new Error('Cordova camera plugin required to access hardware camera.');
    }
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;    
    if (!FileTransfer) {
      throw new Error('Cordova File Transfer required.');
    }
} 
// Wait for Cordova to connect with the device
document.addEventListener("app.Ready", onDeviceReady, false);
// Called when a photo is successfully retrieved (photo taken)
function onPhotoDataSuccess(imageData) {
  var imageNode = $(imageID);
  imageNode.attr('src', imageData);
    function win(r) {
        //console.log("Code = " + r.responseCode);
    }    
    function fail(error) {
        delServidor({mensaje:"An error has occurred: Code = " + error.code,success:false});
    }
    var uri = encodeURI(inputrootUrl);
    var fileURL = imageData;
    var options = new FileUploadOptions();
        options.fileKey="file";
    
    /************** Hernan proceso **************/
    function takeSnapshot(){
        /*var hidden_canvas = document.querySelector('canvas'),
            context = hidden_canvas.getContext('2d');
        var width = (imageNode.width()),
            height = (imageNode.height());
        if (width && height) {            
            // Configuramos el canvas con las mismas dimensiones que el video
            hidden_canvas.width = width;
            hidden_canvas.height = height;
            // Hacemos una copia
            context.drawImage(imageNode, 0, 0, width, height);
            // Convertimos la imagen del canvas en datarurl
            //console.log(hidden_canvas.width ,"&&", hidden_canvas.height);
            return hidden_canvas.toDataURL('image/png');
        }*/        
    } 
    /****************************************************/
    var datosPaciente={};         
        datosPaciente.paciente_k=$("#pre_paciente_k").val();
        datosPaciente.nombres	=$("#pre_nombre").val();
        datosPaciente.apellidos	=$("#pre_apellido").val();
        datosPaciente.num_id	=$("#pre_identidad").val();
        datosPaciente.prefix	=$("#pre_prefix").val();
        datosPaciente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
            ctx.drawImage(imageNode, 10, 10);
        datosPaciente.foto = c.toDataURL('image/png');
        delServidor({mensaje:"Cargando Foto: " + datosPaciente.foto});
        socket.emit("imagenPaciente",datosPaciente); 
    if(datosPaciente.paciente_k != 0){  
        if(datosPaciente.nombres!="" && datosPaciente.apellidos!="" && datosPaciente.num_id!=""){          
        }else{
          delServidor({mensaje:"No se han completado los datos obligatoros",success:false});
    	}
    }else{
        delServidor({mensaje:"Para guardar la foto debe crear el usuario antes.",success:false});
        alertas.contenido="Para guardar la foto debe crear el usuario antes.";
    }
    //$(".app").css("display",true);
    /********************************************/
    /*var params={}; 
        params.paciente_k=$("#pre_paciente_k").val();
        params.nombres	=$("#pre_nombre").val();
        params.apellidos	=$("#pre_apellido").val();
        params.num_id	=$("#pre_identidad").val();
        params.prefix	=$("#pre_prefix").val();
        params.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
        //params.foto =
        options.params = params;
        var FT=fileURL.substr(fileURL.lastIndexOf('/')+1);
        var lastJpg = FT.substr(FT.length - 3);
        if(lastJpg!=="jpg"){
            FT=FT.replace(/%/g,"_");
            options.fileName=FT+".jpg";
        }
        socket.emit("imagenPaciente",options); 
    
    options.mimeType="image/jpeg"; 
    options.directorio="imgPanta"; 
    var headers={'headerParam':'headerValue'};    
    options.headers = headers;
    */
    /*var ft = new FileTransfer();
    ft.onprogress = function(ProgressEvent) {
        if (ProgressEvent.lengthComputable) {
            pbar.setValue(Math.round(ProgressEvent.loaded / ProgressEvent.total*100));
            if(Math.round(ProgressEvent.loaded / ProgressEvent.total*100)==100){
                $('#msg').text('Completado!');
            }else{
                $('#msg').text('Enviando...'+FT);  
                if (Math.round(ProgressEvent.loaded / ProgressEvent.total*100) % 2 == 0){
                    $('#msg').css('bacground-color','red');
                }else{
                    $('#msg').css('bacground-color','blue');
                }
            }
        }else{
          loadingStatus.increment();
        }
    };    
    ft.upload(fileURL, uri, win, fail, options); */    
}

// Called when a photo is successfully retrieved (photo retrieved)
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);
  // Get image handle
  var imageDOM = $(imageID);    
  // Show the captured photo
    //alert(imageURI);
  imageDOM.attr('src', imageURI);    
}

// A button will call this function
function capturePhoto(uib_id) {
  imageID = uib_id || '#imgPre';
  // Take picture using device camera and retrieve image as base64-encoded string
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
    destinationType: destinationType.FILE_URI });//DATA_URI
}
window.capturePhoto = capturePhoto;

// A button will call this function    
/******************************* save *********************************/
function captureAndSavePhoto(uib_id) {
 //$("#nombreImg").empty();
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }
  imageID = uib_id || '#imgPre';
  //desinationType and saveToPhotoAlbum must be set correctly to save the photo to the camera roll
  var cameraOptions = {
    quality: 20,
    destinationType: destinationType.FILE_URI,
    saveToPhotoAlbum: true
  };
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, cameraOptions);
}
window.captureAndSavePhoto = captureAndSavePhoto;

// A button will call this function
function capturePhotoEdit(uib_id) {
  imageID = uib_id || '#imgPre';
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL,sourceType: source });
}
window.capturePhotoEdit = capturePhotoEdit;
// A button will call this function
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });//pictureSource
}
window.getPhoto = getPhoto;
// Called if something bad happens.
function onFail(message) {
  throw new Error('Camera failed: ' + message);
  alert('Error causado por: ' + message);
}
/*********************** Hernan ***********************/
function getImage(source){
  var cameraOptions = {
    quality: 20,
    destinationType: destinationType.FILE_URI,
    sourceType: source,
    saveToPhotoAlbum: false
  };
  navigator.camera.getPicture(onPhotoDataSuccess, onCapturePhotoError,cameraOptions);
    
    /*var cameraOptions1 = {
    quality: 20,
    destinationType: destinationType.DATA_URL,
    sourceType: source,
    saveToPhotoAlbum: false
  };
    navigator.camera.getPicture(onCapturePhotoSuccess, onCapturePhotoError,cameraOptions1);*/
}
window.getImage = getImage;
function onCapturePhotoSuccess(imageURI){ 
  var imageNode = document.getElementById('imgPre');
  var photo = imageURI;
  imageNode.src="data:image/jpeg;base64,"+photo;
}
function onCapturePhotoError(message){
    console.log('Captured Failed because: ' + message); 
}  
})();
