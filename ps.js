document.getElementById('upload').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image_file', file);

            // Tampilkan pesan "Mohon tunggu..."
            const loadingMessage = document.getElementById('loading');
            loadingMessage.style.display = 'block';

            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': 'WUXeGx6zWSNQgdc47A4ojTq5'
                },
                body: formData
            })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const resultImage = document.getElementById('result');
                const downloadLink = document.getElementById('download');

                resultImage.src = url;
                resultImage.style.display = 'block';

                // Set URL untuk link unduhan
                downloadLink.href = url;
                downloadLink.style.display = 'block';

                // Sembunyikan pesan "Mohon tunggu..."
                loadingMessage.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                // Sembunyikan pesan "Mohon tunggu..." jika terjadi kesalahan
                loadingMessage.style.display = 'none';
            });
        });
