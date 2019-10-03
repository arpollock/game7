var playing = false;

function jump() {
    alert("JUMP!!!");
}

function duck() {
    alert("DUCK!!!");
}

function handleKeydown(event) {
    if(event && event.keyCode) {
        switch(event.keyCode){
            case 38: // up
                event.preventDefault(); // keep page from scrolling
                if(playing) {
                    jump();
                }
                break;
            case 40: // down
                event.preventDefault(); // keep page from scrolling
                if(playing) {
                    duck();
                }
                break;
            case 32: // space
                event.preventDefault(); // keep page from scrolling
                if(!playing) {
                    playing = true;
                    $('#before_play').hide();
                } else {
                    jump();
                }
                break;
            default: // ignore all other keys
                break;
        }
    }
}

$(document).ready( function() {
    $(this).keydown(handleKeydown);
});
