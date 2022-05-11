/*
Ứng dụng gồm 3 chức năng chính:
*Nhập và lấy thông tin, điểm số của học sinh.
*Tính điểm trung bình cộng của học sinh với các môn.
*Xác định học sinh giỏi.
* Chỉnh sửa thông tin.
*Xóa thông tin.
*/

/**
 *Nhập và lấy thông tin, điểm số của học sinh.
 */
// Khởi tạo biến với giá trị là mảng trống chứa danh sách học sinh
let studentList = [];

function getInfo() {
  //Sử dụng DOM để lấy giá trị từ input nhập vào
  let name = document.getElementById("name").value;
  let maths = document.getElementById("maths").value;
  let physics = document.getElementById("physics").value;
  let chemistry = document.getElementById("chemistry").value;

  /**Sử dụng điều kiện else if:
   * Kiểm tra input không bị bỏ trống.
   * Kiểm tra input nhập đúng hệ số điểm từ 0 đến 10.
   */
  if (name == "" || maths == "" || physics == "" || chemistry == "") {
    alert("Vui lòng điền đầy đủ thông tin.");
  } else if (
    maths > 10 ||
    maths < 0 ||
    physics > 10 ||
    physics < 0 ||
    chemistry > 10 ||
    chemistry < 0
  ) {
    alert("Vui lòng nhập điểm từ 0 đến 10.");
  } else {
    // tạo object testScore để lưu thông tin, điểm số học sinh
    var testScore = {
      name: name,
      maths: maths,
      physics: physics,
      chemistry: chemistry,
    };

    // sử dụng phương thức push() đẩy object vào mảng danh sách học sinh
    studentList.push(testScore);
    // console.log(studentList)

    // xóa dữ liệu input cũ sau khi nhập thông tin
    clear();

    //gọi hàm studentInfo() để hiện thông tin sinh viên
    studentInfo();
  }
}

function studentInfo() {
  //tạo biến table để lấy thông tin từ bảng
  var table = document.getElementById("myTable");

  //sử dụng vòng lặp kết hợp với deleteRow để xóa thông tin học sih bị trùng lặp
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  //sử dụng vòng lặp chức năng thêm dòng thông tin học sinh trong table
  for (let i = 0; i < studentList.length; i++) {
    //tạo biến lấy ra thông tin từng học sinh từ mảng
    var student = studentList[i];

    //tạo dòng mới tại vị trí cuối cùng
    var row = table.insertRow();

    //tạo ô mới trong dòng tương ứng
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    // thêm nội dung trong ô ở dòng tương ứng
    cell1.innerHTML = i + 1;
    cell2.innerHTML = student.name;
    cell3.innerHTML = student.maths;
    cell4.innerHTML = student.physics;
    cell5.innerHTML = student.chemistry;
    cell6.innerHTML = "?";
    cell7.innerHTML =
      "<a href='#' onclick='onEdit(this)'>Sửa</a> / <a href='#' onclick='onDelete(this)'>Xóa</a>";
  }
}

function clear() {
  // xóa dữ liệu input cũ sau khi nhập thông tin
  document.getElementById("name").value = "";
  document.getElementById("maths").value = "";
  document.getElementById("physics").value = "";
  document.getElementById("chemistry").value = "";
}

// hàm tính điểm trung bình
function average() {
  //tạo biến lấy giá trị trong table
  var table = document.getElementById("myTable");
  console.log(table);

  // dùng vòng lặp để tính điểm trung bình từng học sinh
  for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].cells[5].innerText = (
      (parseFloat(table.rows[i].cells[2].innerText) +
        parseFloat(table.rows[i].cells[3].innerText) +
        parseFloat(table.rows[i].cells[4].innerText)) /
      3
    ).toFixed(1);
  }
}

// xác định học sinh giỏi
function checkRank() {
  var table = document.getElementById("myTable");

  //sử dụng for và điều kiện if để kiểm tra học sinh giỏi
  // nếu điểm trung bình >= 8.0 thì học sinh giỏi và đổi màu nền thành màu đỏ
  for (var i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[5].innerText >= 8.0) {
      var row = table.rows.item(i);
      row.style.backgroundColor = "red";
    }
  }
}

let selectedIndex;
//Chỉnh sửa , update thông tin của học sinh
function onEdit(element) {
  // console.log(element);
  let row = element.parentElement.parentElement;
  let name = row.cells[1].innerText;
  let maths = row.cells[2].innerText;
  let physics = row.cells[3].innerText;
  let chemistry = row.cells[4].innerText;

  document.getElementById("name").value = name;
  document.getElementById("maths").value = maths;
  document.getElementById("physics").value = physics;
  document.getElementById("chemistry").value = chemistry;

  selectedIndex = parseInt(row.cells[0].innerText) - 1;

  document.getElementById("update").style.display = "block";
  document.getElementById("input").style.display = "none";
}

function updateInfo() {
  //gán lại giá trị đã cập nhật

  let name = (studentList[selectedIndex].name =
    document.getElementById("name").value);
  let maths = (studentList[selectedIndex].maths =
    document.getElementById("maths").value);
  let physics = (studentList[selectedIndex].physics =
    document.getElementById("physics").value);
  let chemistry = (studentList[selectedIndex].chemistry =
    document.getElementById("chemistry").value);

  // sử dụng điều kiện để kiểm tra thông tin bỏ trống và nhập đúng gía trị điểm từ 0 đến 10

  if (name == "" || maths == "" || physics == "" || chemistry == "") {
    alert("Vui lòng điền đầy đủ thông tin.");
  } else if (
    maths > 10 ||
    maths < 0 ||
    physics > 10 ||
    physics < 0 ||
    chemistry > 10 ||
    chemistry < 0
  ) {
    alert("Vui lòng nhập điểm từ 0 đến 10.");
  } else {
    //gọi hàm để render thông tin về phía client
    studentInfo();

    // xóa dữ liệu form đã nhập
    clear();

    // hiện và ẩn nút update và input
    document.getElementById("update").style.display = "none";
    document.getElementById("input").style.display = "block";
  }
}

//hàm xóa thông tin từng học sinh
function onDelete(element) {
  //lấy phần tử dòng và gán vào biến row
  let row = element.parentElement.parentElement;

  //xác định vị trí dòng
  selectedIndex = parseInt(row.cells[0].innerText) - 1;

  //dùng if và confirm method để xác nhận hành động muốn xóa
  if (confirm("Bạn có muốn xóa dữ liệu này không?")) {
    studentList.splice(selectedIndex, 1);

    studentInfo();
  }
}
