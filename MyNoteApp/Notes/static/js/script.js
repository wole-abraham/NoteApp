document.addEventListener('DOMContentLoaded', ()=>{
  const tabs = document.querySelectorAll('.tab');
  const cards = Array.from(document.querySelectorAll('.card'));
  const searchInput = document.querySelector('#searchInput');
  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('backdrop');

  // Helper to apply both tab filter and search
  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilters(){
    const term = searchTerm.trim().toLowerCase();
    cards.forEach(c=>{
      const matchesCategory = activeFilter === 'all' || c.dataset.category === activeFilter;
      const text = (c.querySelector('.card-title')?.textContent + ' ' + (c.querySelector('.card-body')?.textContent || '')).toLowerCase();
      const matchesSearch = term === '' || text.indexOf(term) !== -1;
      c.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      activeFilter = t.dataset.filter;
      applyFilters();
    });
  });

  // Debounced search
  let debounce;
  if(searchInput){
    searchInput.addEventListener('input',(e)=>{
      clearTimeout(debounce);
      debounce = setTimeout(()=>{
        searchTerm = e.target.value;
        applyFilters();
      },180);
    });
  }

  // Staggered reveal animation
  cards.forEach((c, i)=>{
    setTimeout(()=> c.classList.add('show'), 60 * i);
  });

  // Mobile sidebar toggle
  function openSidebar(){
    if(!sidebar) return;
    sidebar.classList.add('open');
    if(backdrop) backdrop.classList.add('show');
    document.body.classList.add('sidebar-open');
  }
  function closeSidebar(){
    if(!sidebar) return;
    sidebar.classList.remove('open');
    if(backdrop) backdrop.classList.remove('show');
    document.body.classList.remove('sidebar-open');
  }
  if(mobileToggle){
    mobileToggle.addEventListener('click', ()=>{
      if(sidebar.classList.contains('open')) closeSidebar(); else openSidebar();
    });
  }
  if(backdrop){
    backdrop.addEventListener('click', closeSidebar);
  }

  // Close sidebar when a navigation item is clicked (mobile)
  document.querySelectorAll('.nav-item').forEach(n=> n.addEventListener('click', ()=>{
    if(window.innerWidth <= 900) closeSidebar();
  }));

  // on resize remove open state when switching to desktop
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 900) closeSidebar();
  });
  
  // Initialize modal and open it when the Add (+) button is clicked.
  // NOTE: The Save button is intentionally a no-op (type="button").
  const addBtn = document.querySelector('.btn.add');
  const noteModalEl = document.getElementById('noteModal');
  if(addBtn && noteModalEl && typeof bootstrap !== 'undefined'){
    const noteModal = new bootstrap.Modal(noteModalEl);
    addBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      noteModal.show();
    });
  }
  // on resize remove open state when switching to desktop
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 900) closeSidebar();
  });
});

