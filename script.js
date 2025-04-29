document.addEventListener('DOMContentLoaded', () => {

    // --- Fitur 1: Validasi Formulir Kontak ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Ambil elemen input dan error yang ada
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email'); // Tetap ada jika form lain menggunakannya, jika tidak hapus
        const topicInput = document.getElementById('topic');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError'); // Tetap ada jika form lain menggunakannya, jika tidak hapus
        const topicError = document.getElementById('topicError');
        const messageError = document.getElementById('messageError');

        // === TAMBAHKAN GET ELEMENT UNTUK FIELD BARU ===
        const phoneInput = document.getElementById('phone');
        const unitInput = document.getElementById('unit');
        const phoneError = document.getElementById('phoneError');
        const unitError = document.getElementById('unitError');
        // === END TAMBAHAN GET ELEMENT ===

        const generalError = document.getElementById('generalError');
        const formPreview = document.getElementById('formPreview');
        const previewName = document.getElementById('previewName');
        const previewEmail = document.getElementById('previewEmail'); // Tetap ada jika form lain menggunakannya, jika tidak hapus
        const previewTopic = document.getElementById('previewTopic');
        const previewMessage = document.getElementById('previewMessage');

        // === TAMBAHKAN GET ELEMENT PREVIEW BARU ===
        const previewPhone = document.getElementById('previewPhone');
        const previewUnit = document.getElementById('previewUnit');
        // === END TAMBAHAN GET ELEMENT PREVIEW ===

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah submit form bawaan
            let isValid = true;
            generalError.textContent = ''; // Reset general error
            formPreview.style.display = 'none'; // Sembunyikan preview

            // Reset error messages
            nameError.textContent = '';
            if (emailError) emailError.textContent = ''; // Jika elemen ada
            topicError.textContent = '';
            messageError.textContent = '';
            // === TAMBAHKAN RESET ERROR BARU ===
            phoneError.textContent = '';
            unitError.textContent = '';
            // === END TAMBAHAN RESET ERROR ===


            // Validasi Nama
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Nama wajib diisi.';
                isValid = false;
            }

            // === TAMBAHKAN VALIDASI TELEPON ===
            const phonePattern = /^[0-9\s+-]*$/; // Hanya angka, spasi, plus, minus
            if (phoneInput.value.trim() === '') {
                phoneError.textContent = 'No. Telepon wajib diisi.';
                isValid = false;
            } else if (!phonePattern.test(phoneInput.value.trim())) {
                 phoneError.textContent = 'No. Telepon hanya boleh berisi angka, spasi, atau tanda + -.';
                 isValid = false;
            }
            // === END VALIDASI TELEPON ===

            // === TAMBAHKAN VALIDASI UNIT ===
            if (unitInput.value.trim() === '') {
                unitError.textContent = 'No. Unit wajib diisi.';
                isValid = false;
            }
            // === END VALIDASI UNIT ===


            // Validasi Email (Jika masih relevan di form lain)
            // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // if (emailInput && emailInput.value.trim() === '') {
            //     emailError.textContent = 'Email wajib diisi.';
            //     isValid = false;
            // } else if (emailInput && !emailPattern.test(emailInput.value)) {
            //     emailError.textContent = 'Format email tidak valid.';
            //     isValid = false;
            // }

             // Validasi Topik
            if (topicInput.value === '') {
                topicError.textContent = 'Silakan pilih topik pertanyaan.';
                isValid = false;
            }

            // Validasi Pesan
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Pesan wajib diisi.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                 messageError.textContent = 'Pesan terlalu pendek (minimal 10 karakter).';
                isValid = false;
            }

            if (isValid) {
                // Tampilkan preview jika valid
                previewName.textContent = nameInput.value;
                if (previewEmail && emailInput) previewEmail.textContent = emailInput.value; // Jika elemen ada
                previewTopic.textContent = topicInput.options[topicInput.selectedIndex].text;
                previewMessage.textContent = messageInput.value;

                // === TAMBAHKAN UPDATE PREVIEW BARU ===
                previewPhone.textContent = phoneInput.value;
                previewUnit.textContent = unitInput.value;
                // === END TAMBAHAN UPDATE PREVIEW ===

                formPreview.style.display = 'block';

                // Simulasi pengiriman (biarkan preview terlihat untuk demo)
                // setTimeout(() => { ... }, 500);

            } else {
                 generalError.textContent = 'Harap perbaiki error pada form sebelum mengirim.';
            }
        });
    }

    // --- Fitur 2: FAQ Accordion (Tidak Berubah) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            questionButton.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                if (!isActive) {
                    item.classList.add('active');
                } else {
                     item.classList.remove('active');
                }
            });
        });
    }


    // --- Fitur 3: Simulasi Lacak Tiket (Tidak Berubah) ---
    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) {
        const ticketNumberInput = document.getElementById('ticketNumber');
        const ticketStatusResult = document.getElementById('ticketStatusResult');
        const trackedTicketNumber = document.getElementById('trackedTicketNumber');
        const statusMessage = document.getElementById('statusMessage');
        const trackError = document.getElementById('trackError');

        trackBtn.addEventListener('click', () => {
            const ticketNumber = ticketNumberInput.value.trim();
            trackError.textContent = '';
            ticketStatusResult.style.display = 'none';

            if (ticketNumber === '') {
                trackError.textContent = 'Silakan masukkan nomor tiket.';
                return;
            }

            const possibleStatuses = [
                "Tiket sedang dalam antrian.",
                "Sedang ditinjau oleh tim dukungan.",
                "Menunggu tanggapan dari Anda.",
                "Sedang dikerjakan oleh teknisi.",
                "Masalah telah diselesaikan.",
                "Tiket ditutup.",
                "Nomor tiket tidak valid atau tidak ditemukan."
            ];
            const randomIndex = Math.floor(Math.random() * possibleStatuses.length);
            const randomStatus = possibleStatuses[randomIndex];

            trackedTicketNumber.textContent = `(${ticketNumber})`;
            statusMessage.textContent = randomStatus;
            ticketStatusResult.style.display = 'block';
        });
    }

});