// E'lon joylash
document.getElementById('post-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const weight = document.getElementById('weight').value;
  
    // Firebase-ga e'lon qo'shish
    database.ref('ads').push({ title, description, location, weight })
      .then(() => {
        alert('E\'lon muvaffaqiyatli joylandi!');
        window.location.href = 'listings.html';
      })
      .catch(() => alert('Xatolik yuz berdi!'));
  });
  
  // E'lonlarni ko'rsatish
  database.ref('ads').on('value', (snapshot) => {
    const ads = snapshot.val();
    const listingGrid = document.getElementById('listing-grid');
    if (listingGrid) {
      listingGrid.innerHTML = '';
      Object.values(ads || {}).forEach(ad => {
        const adCard = `
          <div class="listing-card">
            <h3>${ad.title}</h3>
            <p>${ad.description}</p>
            <p>Manzil: ${ad.location}</p>
            <p>Og'irlik: ${ad.weight} tonna</p>
          </div>
        `;
        listingGrid.innerHTML += adCard;
      });
    }
  });