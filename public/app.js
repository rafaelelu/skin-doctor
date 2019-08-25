const hiddenBtn = document.getElementById('real-file');
const customBtn = document.getElementById('custom-btn');
const sendBtn = document.getElementById('send-btn');
const image = document.getElementById('image');
const title = document.getElementById('title');
var fd;
var file;
var r;

customBtn.addEventListener('click', function () {
    hiddenBtn.click();
});

hiddenBtn.addEventListener('change', function () {
    if (hiddenBtn.value) {
        fd = new FormData();
        file = $('#real-file')[0].files[0];
        fd.append('image', file);
        sendBtn.disabled = false;
    }

    var fr = new FileReader();
    fr.onload = function () {
        image.src = fr.result;
    }
    fr.readAsDataURL(file);
    image.style.visibility = 'visible';
    sendBtn.style.backgroundColor = '#28A745';

});

sendBtn.addEventListener('click', function () {
    swal.showLoading();
    $.ajax({
        url: 'https://warm-coast-15308.herokuapp.com/classifier',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response != 0) {
                console.log(response);
                Swal.fire({
                    html: 'There is a probability of ' + `<strong>${((response.confidence) * 100).toFixed(2)}%</strong>` +
                        ' of you having: ' + `<strong style="color: #ff0000;">${response.tag}</strong>` + '. <br>Please consult with your doctor.',
                    width: window.innerWidth
                });
            } else {
                alert('file not uploaded');
            }
        },
    });
});