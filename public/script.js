document.addEventListener('DOMContentLoaded', function() {
    const img = document.getElementById('uploadedPhoto');
    const changeButton = document.getElementById('changePhoto');
    const URL = 'http://localhost:5600';

    // Sayfa yüklendiğinde mevcut fotoğrafı göster
    fetchCurrentPhoto();

    changeButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(event) {
            const file = event.target.files[0];
            uploadPhoto(file);
        };
        input.click();
    });

    function fetchCurrentPhoto() {
        fetch(`${URL}/api`)
            .then(response => response.json())
            .then(data => {
                if (data.filename) {
                    img.src = `${URL}/images/${data.filename}`;
                } else {
                    console.log('Fotoğraf bulunamadı');
                    img.src = ''; // Varsayılan bir resim yolu da koyabilirsiniz
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function uploadPhoto(file) {
        const formData = new FormData();
        formData.append('myImage', file);

        fetch(`${URL}/api/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.filename) {
                img.src = `${URL}/images/${data.filename}`;
            } else {
                console.log('Fotoğraf bulunamadı');
                img.src = ''; // Varsayılan bir resim yolu da koyabilirsiniz
            }
        })
        .catch(error => console.error('Error:', error));
    }
});