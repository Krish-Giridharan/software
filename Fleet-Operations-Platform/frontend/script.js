const api = (path, opts={}) => fetch(`http://localhost:5000${path}`, opts).then(r=>r.json());

async function refresh() {
  const vehicles = await api('/api/vehicles');
  const tbody = document.querySelector('#vehiclesTable tbody');
  tbody.innerHTML='';
  vehicles.forEach(v=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${v.vehicle_id}</td><td>${v.vehicle_number}</td><td>${v.vehicle_type||''}</td><td>${v.mileage||0}</td><td>${v.next_service_date||''}</td>`;
    tbody.appendChild(tr);
  });
  const dash = await api('/api/dashboard');
  document.getElementById('total').textContent = dash.totalVehicles;
  document.getElementById('maintenance').textContent = dash.maintenanceRequired;
}

document.getElementById('vehicleForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  if (data.mileage) data.mileage = parseInt(data.mileage,10);
  await fetch('http://localhost:5000/api/vehicles',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  form.reset();
  refresh();
});

refresh();
