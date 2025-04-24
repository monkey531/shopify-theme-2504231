class ProductPage {
  constructor() {
    this.container = document.querySelector('.product-page');
    if (!this.container) return;

    this.mainImage = this.container.querySelector('#ProductMainImage');
    this.thumbnails = this.container.querySelectorAll('.product-gallery__thumbnail');
    
    this.initThumbnails();
    this.initVariants();
  }

  initThumbnails() {
    this.thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        // Update active state
        this.thumbnails.forEach(t => t.classList.remove('is-active'));
        thumbnail.classList.add('is-active');

        // Update main image
        const imageUrl = thumbnail.dataset.imageUrl;
        this.mainImage.src = imageUrl;
      });
    });
  }

  initVariants() {
    const variantSelects = this.container.querySelectorAll('.product-form__select');
    if (!variantSelects.length) return;

    variantSelects.forEach(select => {
      select.addEventListener('change', () => {
        this.updateVariantUrl();
      });
    });
  }

  updateVariantUrl() {
    const selects = this.container.querySelectorAll('.product-form__select');
    const values = Array.from(selects).map(select => select.value);
    
    // Get current URL and params
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    
    // Update variant param
    params.set('variant', values.join(','));
    url.search = params.toString();
    
    // Update URL without reloading
    window.history.replaceState({}, '', url.toString());
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new ProductPage();
}); 