// ฟังก์ชันสำหรับส่งข้อมูลแบบ AJAX
function saveFormData(formId, targetUrl) {
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // เบรกไม่ให้หน้าเว็บรีเฟรช

        // ดึงข้อมูลทั้งหมดจากฟอร์มอัตโนมัติ
        const formData = new FormData(form);

        // ยิง Fetch API ไปที่ไฟล์ PHP
        fetch(targetUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // แปลงผลลัพธ์ที่ PHP ส่งกลับมาเป็น JSON
        .then(data => {
            if (data.status === 'success') {
                alert('บันทึกข้อมูลสำเร็จ!');
                // คุณสามารถสั่งให้โหลดตารางใหม่ หรือปิด Modal ตรงนี้ได้
                location.reload(); 
            } else {
                alert('เกิดข้อผิดพลาด: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        });
    });
}

// วิธีเรียกใช้งาน: saveFormData('myFormId', 'process.php');