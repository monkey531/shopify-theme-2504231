// Management Interface JavaScript
class ManagementInterface {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.management-nav__link').forEach(link => {
      link.addEventListener('click', this.handleNavigation.bind(this));
    });

    // Forms
    document.querySelectorAll('.management-form').forEach(form => {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    });

    // Tables
    document.querySelectorAll('.management-table').forEach(table => {
      this.initializeTableSorting(table);
    });
  }

  handleNavigation(event) {
    event.preventDefault();
    const target = event.currentTarget;
    document.querySelectorAll('.management-nav__link').forEach(link => {
      link.classList.remove('management-nav__link--active');
    });
    target.classList.add('management-nav__link--active');
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Add loading state
    form.classList.add('is-loading');
    
    // Simulate form submission
    setTimeout(() => {
      form.classList.remove('is-loading');
      this.showAlert('success', 'Changes saved successfully');
    }, 1000);
  }

  initializeTableSorting(table) {
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const column = header.cellIndex;
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const direction = header.dataset.direction === 'asc' ? -1 : 1;
        
        rows.sort((a, b) => {
          const aValue = a.cells[column].textContent;
          const bValue = b.cells[column].textContent;
          return direction * aValue.localeCompare(bValue);
        });
        
        const tbody = table.querySelector('tbody');
        rows.forEach(row => tbody.appendChild(row));
        
        header.dataset.direction = direction === 1 ? 'asc' : 'desc';
      });
    });
  }

  showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `management-alert management-alert--${type}`;
    alert.textContent = message;
    
    document.querySelector('.content-for-layout').prepend(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ManagementInterface();
}); 