import axios from 'axios';

axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';

// ------------------ filters-API---------------------------

export async function fetchCategories() {
  const response = await axios.get('/categories');
  return response.data;
}

// ----------------------- Card-API---------------------------

export async function fetchFurniture(category = '', page = 1) {
  const params = { page, limit: 8 };
  if (category) params.category = category;
  const response = await axios.get('/furnitures', { params });
  return response.data;
}

// -------------modal IPA------------------
// export async function fetchFurnitureById(id) {
//   const response = await axios.get(`/furnitures/${id}`);
//   return response.data;
// }

export async function openProductModal(id) {
  try {
    const response = await fetch(
      `https://furniture-store-v2.b.goit.study/api/furnitures/${id}`
    );
    const data = await response.json();

    console.log('DATA:', data);

    renderModal(data);
    openModal();
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
