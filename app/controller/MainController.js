Ext.define('test.controller.MainController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            'button#takePicture': {
                tap: 'takePicture'
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        console.log('MainController loaded.');
    },

    takePicture: function(){
        console.log('Taking the picture...');

        var that = this;

        navigator.camera.getPicture(function(imageData){

            // adjusting the size so it gets displayed correctly in the design.
            var img = new Image();
            img.src = "data:image/png;base64," + imageData;

            // 1. after taking the photo. Adjusting it size to fit the current width screen size.
            var adjustment = 80, // <- so the image does not gets glued to the right side of the screen. (it gives a padding to the image.)
            w = Ext.getBody().getSize().width - adjustment,
            h = img.height * w / img.width;
            
            console.log('w',w,'h',h);

            img.width = w;
            img.height = h;

            console.log('width',img.width,'height',img.height);


            // filling up the data into the IMG object.
            // that.getHiddenImageBase64().setValue(imageData);
            // that.getPreviewImage().setSrc("data:image/png;base64," + imageData);
            // that.getPreviewImage().setHidden(false);
            // that.getPreviewImage.setWidth(img.width);
            // that.getPreviewImage.setHeight(img.height);
        }, function(errorMessage){
            if(errorMessage != 'no image selected')
            {
                console.error('Camera failed because: ' + errorMessage);
                alert('Camera failed because: ' + errorMessage);
            }
        }, {
            quality: 40,
            targetWidth: 300,
            targetHeight: 300,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            saveToPhotoAlbum: false,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            cameraDirection: Camera.Direction.FRONT,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

});
