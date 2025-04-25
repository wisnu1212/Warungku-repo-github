// Daftar produk untuk halaman utama
const produkList = [
  { id: 1, nama: 'Seblak', harga: 15000, image: 'images/seblak.jpg' },
  { id: 2, nama: 'Sossis', harga: 20000, image: 'images/sossis.jpg' },
  { id: 3, nama: 'Basreng', harga: 5000, image: 'images/basreng.jpg' },
  { id: 4, nama: 'Mie Goreng', harga: 25000, image: 'images/mie goreng.jpg' }];

// Menampilkan produk di halaman utama
function tampilkanProduk() {
  const produkContainer = document.getElementById('produk-container');
  produkList.forEach(produk => {
    const produkElement = document.createElement('div');
    produkElement.classList.add('produk');
    produkElement.setAttribute('data-nama', produk.nama);
    produkElement.setAttribute('data-harga', produk.harga);

    produkElement.innerHTML = `
      <img src="${produk.image}" alt="${produk.nama}" width="150">
      <h3>${produk.nama}</h3>
      <p>Rp ${produk.harga}</p>
      <button onclick="tambahKeKeranjang(${produk.id})">Tambah ke Keranjang</button>
    `;

    produkContainer.appendChild(produkElement);
  });
}

// Keranjang belanja
let keranjang = [];

// Menambah produk ke keranjang
function tambahKeKeranjang(idProduk) {
  const produk = produkList.find(p => p.id === idProduk);
  keranjang.push(produk);
  updateKeranjang();
}

// Mengupdate tampilan keranjang
function updateKeranjang() {
  const daftarKeranjang = document.getElementById('daftar-keranjang');
  const totalHarga = document.getElementById('total-harga');

  daftarKeranjang.innerHTML = '';
  let total = 0;
  keranjang.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} - Rp ${item.harga}`;
    daftarKeranjang.appendChild(li);
    total += item.harga;
  });

  totalHarga.textContent = `Rp ${total}`;
}

// Pencarian produk
function cariProduk() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const produkList = document.querySelectorAll('.produk');

  produkList.forEach((produk) => {
    const nama = produk.getAttribute('data-nama').toLowerCase();
    if (nama.includes(input)) {
      produk.style.display = 'block';
    } else {
      produk.style.display = 'none';
    }
  });
}

// Formulir checkout
document.getElementById('checkout-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const telepon = document.getElementById('telepon').value;

  if (nama && alamat && telepon) {
    alert(`Pesanan Anda telah diterima. Nama: ${nama}, Alamat: ${alamat}, Telepon: ${telepon}`);
    keranjang = []; // Reset keranjang setelah checkout
    updateKeranjang();
    document.getElementById('form-checkout').style.display = 'none';
  } else {
    alert('Semua kolom harus diisi!');
  }
});

// Menampilkan produk saat halaman dimuat
window.onload = tampilkanProduk;