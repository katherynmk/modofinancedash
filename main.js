// ─── MODO8 INVOICE TRACKER — main.js ───

// ─── DATA ────────────────────────────────────────────────────────────────────
// net: days after invoice date payment is expected (0, 15, 30, 45, 60, or any integer)
// status: 'paid' | 'pending' | 'upcoming' | 'overdue' | 'not-invoiced'
// projected: true = estimated invoice not yet sent

const PROJECTS = [
    {
      id: 'actus',
      name: 'ACTUS',
      status: 'in-production',
      contract:  253208.38,
      shipDate: '2026-07-01',
      customer: 'ACTUS',
      invoices: [
        { stage: 'Downpayment (40%)', amount: 92052.58, date: '2025-04-28', net: 0,  status: 'paid',    notes: '' },
        { stage: 'Engineering (30%)', amount: 69039.44, date: '2025-09-01', net: 15, status: 'paid',    notes: '' },
        { stage: 'FAT (20%)',         amount: 46026.29, date: '2026-04-07', net: 15, status: 'paid',    notes: '' },
        { stage: 'Change Order',      amount: 23076.92, date: '2026-05-12', net: 15, status: 'paid',    notes: '' },
        { stage: 'SAT (10%)',         amount: 23013.15, date: '2026-07-06', net: 30, status: 'pending',    notes: ''  },
      ]
    },
    {
      id: 'ocado',
      name: 'OCADO',
      status: 'in-production',
      contract: 560517.34,
      shipDate: '2026-07-01',
      customer: 'OCADO',
      invoices: [
        { stage: 'Base — PO (30%)',              amount: 109293.07, date: '2026-05-01', net: 0,  status: 'paid', notes: 'Base contract' },
        { stage: 'Base — Engineering (30%)',     amount: 109293.07, date: '2026-06-01', net: 30, status: 'paid', notes: 'Base contract' },
        { stage: 'Base — Initial Shipment (30%)',amount: 109293.07, date: '2026-07-06', net: 30, status: 'pending', notes: 'Base contract' },
        { stage: 'Base — System Arrival (10%)', amount:  36431.03, date: '2026-07-07', net: 30, status: 'upcoming', notes: 'Base contract' },
        { stage: 'Install — Pre-Ship (40%)',     amount:  35400.07, date: '2026-06-15', net: 0,  status: 'paid', notes: '2 weeks prior to shipment' },
        { stage: 'Install — Labor Release (35%)',amount:  30975.06, date: '2026-06-15', net: 0,  status: 'paid', notes: 'Install' },
        { stage: 'Install — Complete (25%)',     amount:  22125.05, date: '2026-07-08', net: 30, status: 'upcoming', notes: 'Install' },
        { stage: 'Change Order — Down (50%)',    amount:  53853.46, date: '2026-05-01', net: 0,  status: 'paid', notes: 'Change order' },
        { stage: 'Change Order — Final (50%)',   amount:  53853.46, date: '2026-07-06', net: 30, status: 'pending', notes: 'Change order' },
      ]
    },
      {
        id: 'malin',
        name: 'MALIN',
        status: 'in-production',
        contract: 278500,
        shipDate: '2026-06-22',
        customer: 'ADI',
        invoices: [
          { stage: 'Downpayment (40%)', amount: 111400, date: '2026-05-12', net: 0,  status: 'paid', notes: '', projected: true },
          { stage: 'Engineering (30%)', amount: 83550, date: '2026-06-14', net: 30, status: 'pending', notes: '', projected: true },
          { stage: 'Initital Ship (20%)', amount: 55700, date: '2026-06-24', net: 30, status: 'pending', notes: '', projected: true },
          { stage: 'Final / Ship (10%)', amount: 27850, date: '2026-06-26', net: 30, status: 'not-invoiced', notes: '', projected: true },
        ]
      },
      {
        id: 'equipment-depot',
        name: 'EQUIPMENT DEPOT',
        status: 'engineering',
        contract: 48655,
        shipDate: '2026-07-02',
        customer: 'Equipment Depot',
        invoices: [
          { stage: 'Downpayment (40%)', amount: 19462.00, date: '2026-05-27', net: 0, status: 'paid', notes: 'Received — PO SA1500191986LR', projected: false },
          { stage: 'Engineering Complete (30%)', amount: 14596.50, date: '2026-06-18', net: 30, status: 'paid', notes: 'Invoiced — PO SA1500191986LR', projected: false },
          { stage: 'Initial Shipment (20%)', amount: 9731.00, date: '2026-07-06', net: 30, status: 'pending', notes: 'Due upon initial shipment — PO SA1500191986LR', projected: true },
          { stage: 'Final Shipment (10%)', amount: 4865.50, date: '2026-08-01', net: 30, status: 'upcoming', notes: 'Due upon completion of shipment — PO SA1500191986LR', projected: true },
        ]
      },
      {
        id: 'frontier-dental',
        name: 'FRONTIER DENTAL',
        status: 'engineering',
        contract: 350000,
        shipDate: '2026-07-21',
        customer: 'Kuecker Pulse Integration',
        invoices: [
          { stage: 'PO Placement (30%)', amount: 105000.00, date: '2026-04-24', net: 10, status: 'paid', notes: 'Received 4/24 — PO-0068608', projected: false },
          { stage: 'Start of Manufacturing (20%)', amount: 70000.00, date: '2026-06-02', net: 30, status: 'paid', notes: 'Due at start of manufacturing — PO-0068608', projected: true },
          { stage: 'Manufacturing Complete (20%)', amount: 70000.00, date: '2026-06-30', net: 30, status: 'upcoming', notes: 'Due upon manufacturing complete — PO-0068608', projected: true },
          { stage: 'Start of Shipping (15%)', amount: 52500.00, date: '2026-07-21', net: 30, status: 'upcoming', notes: 'Due at start of shipping — PO-0068608', projected: true },
          { stage: 'Delivery Onsite Complete (15%)', amount: 52500.00, date: '2026-07-23', net: 30, status: 'upcoming', notes: 'Due upon delivery onsite complete — PO-0068608', projected: true },
        ]
      },
      {
        id: 'conveyor-on-casters',
        name: 'CONVEYOR ON CASTERS',
        status: 'engineering',
        contract: 4938,
        shipDate: '2026-08-03',
        customer: 'Formic',
        invoices: [
          { stage: 'Paid in Full', amount: 4938.00, date: '2026-05-11', net: 0, status: 'paid', notes: 'Paid in full upfront — PO 101087', projected: false },
          { stage: 'Freight', amount: 0, date: '2026-08-03', net: 30, status: 'upcoming', notes: 'Freight to be invoiced upon shipment', projected: true },
        ]
      },
      {
        id: 'pitney-bos',
        name: 'PITNEY BOS',
        status: 'purchasing',
        contract: 226822.25,
        shipDate: '2026-07-27',
        customer: 'Pitney Bowes',
        invoices: [
          { stage: 'Downpayment (40%)', amount: 90728.90, date: '2026-06-17', net: 0, status: 'paid', notes: 'Received — MODO826048', projected: false },
          { stage: 'Engineering Complete (30%)', amount: 68046.68, date: '2026-06-19', net: 30, status: 'pending', notes: 'Due upon completion of engineering — MODO826048', projected: true },
          { stage: 'Initial Shipment (30%)', amount: 68046.67, date: '2026-07-27', net: 30, status: 'upcoming', notes: 'Due upon initial shipment — MODO826048', projected: true },
        ]
      },
      {
        id: 'loloi',
        name: 'LOLOI RUGS',
        status: 'pulling',
        contract: 187126,
        shipDate: '2026-07-27',
        customer: 'Loloi Rugs',
        invoices: [
          { stage: 'Downpayment (50%)', amount: 93563.00, date: '2026-06-17', net: 0, status: 'paid', notes: 'Due with PO', projected: true },
          { stage: 'Final Shipment (50%)', amount: 93563.00, date: '2026-07-27', net: 15, status: 'upcoming', notes: 'Due upon final shipment', projected: true },
        ]
      },
      {
        id: 'new-horizons',
        name: 'NEW HORIZONS',
        status: 'pre-procurement',
        contract: 202665,
        shipDate: '2026-07-31',
        customer: 'New Horizons',
        invoices: [
          { stage: 'Order (30%)', amount: 60799.50, date: '2026-06-17', net: 0, status: 'paid', notes: 'Received — 30% at time of order', projected: false },
          { stage: 'Design Acceptance (30%)', amount: 60799.50, date: '2026-06-01', net: 30, status: 'paid', notes: 'Due upon design acceptance', projected: true },
          { stage: 'Shipment / FAT (30%)', amount: 60799.50, date: '2026-07-31', net: 0, status: 'upcoming', notes: 'Due upon shipment after successful Factory Acceptance Test — PO 101076 Rev V-0', projected: true },
          { stage: 'Delivery & Acceptance (10%)', amount: 20266.50, date: '2026-08-30', net: 30, status: 'upcoming', notes: 'Due Net 30 after delivery, acceptance, and receipt of all deliverables', projected: true },
        ]
      },
      {
        id: 'spartan-nash',
        name: 'SPARTAN NASH',
        status: 'engineering',
        contract: 98637,
        shipDate: '2026-08-07',
        customer: 'SpartanNash',
        invoices: [
          { stage: 'Downpayment (50%)', amount: 49318.50, date: '2026-06-17', net: 0, status: 'paid', notes: 'Due with PO', projected: true },
          { stage: 'Engineering Complete (30%)', amount: 29591.10, date: '2026-06-24', net: 15, status: 'pending', notes: 'did 40% 39k because first invoice was only 40%', projected: true },
          { stage: 'Shipment (20%)', amount: 19727.40, date: '2026-08-07', net: 30, status: 'upcoming', notes: 'Due upon completion of shipment', projected: true },
        ]
      },
      {
            id: 'r2',
            name: 'R2',
            status: 'engineering',
            contract: 96082,
            shipDate: '2026-08-17',
            customer: 'R2',
            invoices: [
              { stage: 'Downpayment (50%)', amount: 38655.00, date: '2026-06-17', net: 0, status: 'paid', notes: 'Due with PO — MODO826014-R2', projected: true },
              { stage: 'Ship Notification (30%)', amount: 23193.00, date: '2026-08-17', net: 30, status: 'upcoming', notes: 'Due upon ship notification', projected: true },
              { stage: 'Delivery Confirmation (20%)', amount: 15462.00, date: '2026-09-17', net: 30, status: 'upcoming', notes: 'Due upon delivery confirmation', projected: true },
                { stage: 'Change Order (100%)', amount: 18772.00, date: '2026-06-24', net: 30, status: 'paid', notes: 'NET 0 Change Order', projected: true },
            ]
          },
      {
        id: 'amazon-canada',
        name: 'AMAZON CANADA',
        status: 'engineering',
        contract: 177856,
        shipDate: '2026-08-28',
        customer: 'Amazon',
        invoices: [
          { stage: 'Downpayment (40%)', amount: 71142.40, date: '2026-05-01', net: 0, status: 'paid', notes: 'Received', projected: false },
          { stage: 'Engineering Complete (20%)', amount: 53356.80, date: '2026-06-26', net: 30, status: 'paid', notes: 'Due upon completion of engineering at MODO 8', projected: true },
          { stage: 'Under Invoiced Above' (10%)', amount: 17785.60, date: '2026-07-10', net: 30, status: 'upcoming', notes: 'Due upon completion of engineering at MODO 8', projected: true },
          { stage: 'Initial Shipment (30%)', amount: 53356.80, date: '2026-08-28', net: 30, status: 'upcoming', notes: 'Due upon completion of initial shipment', projected: true },
        ]
      },
      {
        id: 'forsyth',
        name: 'FORSYTH',
        status: 'no-downpayment',
        contract: 41140,
        shipDate: '2026-08-10',
        customer: 'CRG',
        invoices: [
          { stage: 'Downpayment (50%)', amount: 20570.00, date: '2026-06-15', net: 0, status: 'pending', notes: 'Due with PO', projected: true },
          { stage: 'Shipment (50%)', amount: 20570.00, date: '2026-08-10', net: 15, status: 'upcoming', notes: 'Due upon shipment', projected: true },
        ]
      },
    {
  id: 'numina-boxout-jax',
  name: 'NUMINA BOXOUT JAX',
  status: 'engineering',
  contract: 278522.00,
  shipDate: '2026-09-14',
  customer: 'Numina Group',
  invoices: [
    { stage: 'Down Payment (20%)',        amount: 55704.40, date: '2026-06-25', net: 0,  status: 'pending', notes: 'Due upon receipt of PO' },
    { stage: 'First Payment (30%)',       amount: 83556.60, date: '2026-06-25', net: 30, status: 'upcoming', notes: 'Upon receipt of first payment' },
    { stage: 'Initial Shipment (30%)',    amount: 83556.60, date: '2026-09-14', net: 30, status: 'upcoming', notes: 'Upon initial shipment' },
    { stage: 'System Arrival (20%)',      amount: 55704.40, date: '2026-10-14', net: 30, status: 'upcoming', notes: 'Upon system arrival at job site' },
  ]
},
    {
  id: 'numina-boxout-ftw',
  name: 'NUMINA BOXOUT FTW',
  status: 'engineering',
  contract: 294504.00,
  shipDate: '2026-09-14',
  customer: 'Numina Group',
  invoices: [
    { stage: 'Down Payment (20%)',     amount: 58900.80,  date: '2026-06-25', net: 0,  status: 'pending',      notes: 'Due upon receipt of PO' },
    { stage: 'First Payment (30%)',    amount: 88351.20,  date: '2026-06-25', net: 30, status: 'upcoming',     notes: 'Upon receipt of first payment' },
    { stage: 'Initial Shipment (30%)', amount: 88351.20,  date: '2026-09-14', net: 30, status: 'upcoming',     notes: 'Upon initial shipment' },
    { stage: 'System Arrival (20%)',   amount: 58900.80,  date: '2026-10-14', net: 30, status: 'upcoming',     notes: 'Upon system arrival at job site' },
  ]
},
    ];
    
    // ─── HELPERS ─────────────────────────────────────────────────────────────────
    const fmt    = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0 });
    const fmtK   = (n) => n >= 1000 ? '$' + (n / 1000).toFixed(0) + 'k' : '$' + n;
    const parseDate = (s) => new Date(s + 'T00:00:00');
    
    // Return the payment-due date for an invoice (invoice date + net days)
    function paymentDate(inv) {
      const d = parseDate(inv.date);
      d.setDate(d.getDate() + (inv.net || 0));
      return d;
    }
    
    // Format a payment date for display
    function fmtDate(d) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    // Net terms label
    function netLabel(n) {
      return n === 0 ? 'Net 0' : `Net ${n}`;
    }
    
    function statusClass(s) {
      const map = {
        'no-downpayment':  's-no-downpayment',
        'pre-procurement': 's-pre-procurement',
        'engineering':     's-engineering',
        'production':      's-production',
        'done':            's-done',
        'purchasing':      's-purchasing',
        'pulling':         's-pulling',
        'in-production':   's-in-production',
      };
      return map[s] || 's-done';
    }
    
    function statusLabel(s) {
      const map = {
        'no-downpayment':  'No Downpmt',
        'pre-procurement': 'Pre-Proc',
        'engineering':     'Engineering',
        'production':      'Production',
        'done':            'Done',
        'purchasing':      'Purchasing',
        'pulling':         'Pulling',
        'in-production':   'In Production',
      };
      return map[s] || s;
    }
    
    function invoicedToDate(project) {
      return project.invoices
        .filter(i => i.status === 'paid')
        .reduce((s, i) => s + i.amount, 0);
    }
    
    function nextInvoice(project) {
      return project.invoices.find(
        i => i.status === 'upcoming' || i.status === 'pending' || i.status === 'overdue'
      ) || null;
    }
    
    function invStatusBadge(status) {
      const map = {
        paid:          '<span class="inv-status-paid">Paid</span>',
        pending:       '<span class="inv-status-pending">Pending</span>',
        upcoming:      '<span class="inv-status-upcoming">Upcoming</span>',
        overdue:       '<span class="inv-status-overdue">Overdue</span>',
        'not-invoiced':'<span class="inv-status-not-invoiced">Not Invoiced</span>',
      };
      return map[status] || '';
    }
    
    // ─── NET TERMS SELECTOR HTML ─────────────────────────────────────────────────
    // Rendered inline inside the expanded invoice table for each row
    function netSelect(invIdx, projectId, currentNet) {
      const presets = [0, 15, 30, 45, 60];
      const isCustom = !presets.includes(currentNet);
      return `
        <div class="net-wrap">
          <select class="net-select" onchange="handleNetChange('${projectId}',${invIdx},this)">
            ${presets.map(v =>
              `<option value="${v}" ${currentNet === v && !isCustom ? 'selected' : ''}>${netLabel(v)}</option>`
            ).join('')}
            <option value="custom" ${isCustom ? 'selected' : ''}>Custom…</option>
          </select>
          ${isCustom
            ? `<input class="net-custom-input" type="number" min="0" max="365" value="${currentNet}"
                 onchange="handleNetCustom('${projectId}',${invIdx},this)" />`
            : ''}
        </div>
      `;
    }
    
    function handleNetChange(projectId, invIdx, select) {
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) return;
      if (select.value === 'custom') {
        // Show a custom input next to the select
        const wrap = select.closest('.net-wrap');
        if (!wrap.querySelector('.net-custom-input')) {
          const input = document.createElement('input');
          input.className = 'net-custom-input';
          input.type = 'number';
          input.min = 0;
          input.max = 365;
          input.value = project.invoices[invIdx].net;
          input.onchange = () => handleNetCustom(projectId, invIdx, input);
          wrap.appendChild(input);
        }
      } else {
        project.invoices[invIdx].net = parseInt(select.value, 10);
        // Remove any custom input
        const wrap = select.closest('.net-wrap');
        const ci = wrap.querySelector('.net-custom-input');
        if (ci) ci.remove();
        // Refresh payment-due column for this row
        refreshPaymentDueCell(projectId, invIdx);
        if (document.getElementById('page-projections').classList.contains('active')) {
          renderProjectionsPage();
        }
      }
    }
    
    function handleNetCustom(projectId, invIdx, input) {
      const val = Math.max(0, parseInt(input.value, 10) || 0);
      input.value = val;
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) return;
      project.invoices[invIdx].net = val;
      refreshPaymentDueCell(projectId, invIdx);
      if (document.getElementById('page-projections').classList.contains('active')) {
        renderProjectionsPage();
      }
    }
    
    function handleStatusChange(projectId, invIdx, select) {
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) return;
      project.invoices[invIdx].status = select.value;
      // Re-render the whole invoice page so totals, progress bar, and next-invoice callout update
      renderInvoicePage();
      // Re-open the row that was expanded
      const row = document.getElementById('row-' + projectId);
      if (row) row.classList.add('open');
      // Refresh projections if visible
      if (document.getElementById('page-projections').classList.contains('active')) {
        renderProjectionsPage();
      }
    }
    
    function refreshPaymentDueCell(projectId, invIdx) {
      const cell = document.getElementById(`pdue-${projectId}-${invIdx}`);
      if (!cell) return;
      const project = PROJECTS.find(p => p.id === projectId);
      const inv = project.invoices[invIdx];
      const pd = paymentDate(inv);
      cell.innerHTML = inv.net === 0
        ? '<span style="color:var(--text-muted);font-size:11px">Same as invoice</span>'
        : `<span style="color:var(--accent)">${fmtDate(pd)}</span>`;
    }
    
    // ─── INVOICE PAGE ─────────────────────────────────────────────────────────────
    let activeFilter = 'all';
    
    function renderInvoicePage() {
      const grid = document.getElementById('projects-grid');
      const filtered =
        activeFilter === 'all'     ? PROJECTS :
        activeFilter === 'overdue' ? PROJECTS.filter(p => p.invoices.some(i => i.status === 'overdue')) :
        activeFilter === 'pending' ? PROJECTS.filter(p => p.invoices.some(i => i.status === 'pending')) :
        activeFilter === 'done'    ? PROJECTS.filter(p => p.status === 'done') :
        PROJECTS.filter(p => p.status !== 'done');
    
      const totalContract  = filtered.reduce((s, p) => s + p.contract, 0);
      const totalInvoiced  = filtered.reduce((s, p) => s + invoicedToDate(p), 0);
      const outstanding    = filtered.reduce((s, p) => {
        const ni = nextInvoice(p);
        return s + (ni && (ni.status === 'pending' || ni.status === 'overdue') ? ni.amount : 0);
      }, 0);
    
      document.getElementById('inv-stat-contract').textContent    = fmt(totalContract);
      document.getElementById('inv-stat-invoiced').textContent    = fmt(totalInvoiced);
      document.getElementById('inv-stat-outstanding').textContent = fmt(outstanding);
    
      grid.innerHTML = filtered.map(p => {
        const paid = invoicedToDate(p);
        const pct  = p.contract > 0 ? Math.round((paid / p.contract) * 100) : 0;
        const ni   = nextInvoice(p);
    
        let nextHtml = '<span class="next-invoice-none">—</span>';
        if (ni) {
          const pd = paymentDate(ni);
          nextHtml = `
            <div class="next-invoice-amt">${fmt(ni.amount)}</div>
            <div class="next-invoice-date">${ni.stage.split(' ')[0]} &middot; due ${fmtDate(pd)}</div>
            <div class="next-invoice-terms">${netLabel(ni.net ?? 0)}</div>
          `;
        }
    
        const invoiceRows = p.invoices.map((inv, idx) => {
          const pd        = paymentDate(inv);
          const isUpcoming = inv.status === 'upcoming';
          const pdDisplay  = inv.net === 0
            ? '<span style="color:var(--text-muted);font-size:11px">Same as invoice</span>'
            : `<span style="color:var(--accent)">${fmtDate(pd)}</span>`;
    
          return `
            <tr class="${isUpcoming ? 'upcoming' : ''}">
              <td class="inv-stage">${inv.stage}</td>
              <td class="inv-amount">${fmt(inv.amount)}</td>
              <td>${fmtDate(parseDate(inv.date))}</td>
              <td>${netSelect(idx, p.id, inv.net ?? 0)}</td>
              <td id="pdue-${p.id}-${idx}">${pdDisplay}</td>
              <td>
                <select class="inv-status-select" onchange="handleStatusChange('${p.id}',${idx},this)">
                  <option value="paid"          ${inv.status === 'paid'           ? 'selected' : ''}>Paid</option>
                  <option value="pending"       ${inv.status === 'pending'        ? 'selected' : ''}>Pending</option>
                  <option value="upcoming"      ${inv.status === 'upcoming'       ? 'selected' : ''}>Upcoming</option>
                  <option value="overdue"       ${inv.status === 'overdue'        ? 'selected' : ''}>Overdue</option>
                  <option value="not-invoiced"  ${inv.status === 'not-invoiced'   ? 'selected' : ''}>Not Invoiced</option>
                </select>
              </td>
              <td class="inv-notes">${inv.notes || '—'}</td>
            </tr>
          `;
        }).join('');
    
        return `
          <div class="project-row" id="row-${p.id}">
            <div class="project-header" onclick="toggleRow('${p.id}')">
              <div>
                <div class="project-name">${p.name}</div>
                <div style="color:var(--text-muted);font-size:10px;font-family:var(--mono);margin-top:2px">${p.customer}</div>
              </div>
              <span class="status-pill ${statusClass(p.status)}">${statusLabel(p.status)}</span>
              <div class="contract-val">${fmt(p.contract)}</div>
              <div class="invoice-progress">
                <div class="progress-bar-wrap">
                  <div class="progress-bar-fill" style="width:${pct}%"></div>
                </div>
                <div class="progress-label">${pct}% invoiced</div>
              </div>
              <div>
                <div class="invoiced-total">${fmt(paid)}</div>
                <div class="invoiced-pct">of ${fmt(p.contract)}</div>
              </div>
              <div class="next-invoice-col">${nextHtml}</div>
              <div class="expand-icon">&#9660;</div>
            </div>
            <div class="project-detail">
              <table class="invoice-table">
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Amount</th>
                    <th>Invoice Date</th>
                    <th>Net Terms</th>
                    <th>Payment Due</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>${invoiceRows}</tbody>
              </table>
            </div>
          </div>
        `;
      }).join('');
    }
    
    function toggleRow(id) {
      document.getElementById('row-' + id).classList.toggle('open');
    }
    
    function setFilter(f, btn) {
      activeFilter = f;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderInvoicePage();
    }
    
    // ─── PROJECTIONS PAGE — keyed on PAYMENT date, not invoice date ───────────────
    function buildMonthlyData() {
      const map = {}; // key: 'YYYY-MM' based on payment due date
    
      PROJECTS.forEach(project => {
        project.invoices.forEach(inv => {
          const pd  = paymentDate(inv);
          const key = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, '0')}`;
          if (!map[key]) map[key] = { actual: 0, projected: 0, chips: [] };
    
          const label = `${project.name} ${inv.stage.split(' ')[0]}`;
          const netTag = inv.net > 0 ? ` (${netLabel(inv.net)})` : '';
    
          if (inv.status === 'paid') {
            map[key].actual += inv.amount;
            map[key].chips.push({ label: label + netTag, projected: false });
          } else if (inv.status === 'pending' || inv.status === 'overdue') {
            map[key].projected += inv.amount;
            map[key].chips.push({ label: label + netTag, projected: false, pending: true });
          } else if (inv.status === 'not-invoiced') {
            // excluded from cash flow — work was done but invoice not yet sent
          } else {
            map[key].projected += inv.amount;
            map[key].chips.push({ label: label + netTag, projected: true });
          }
        });
      });
    
      // May 2026 – Dec 2027
      const months = [];
      let cur = new Date(2026, 4, 1);
      const end = new Date(2028, 0, 1);
      while (cur < end) {
        const key   = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`;
        const label = cur.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        months.push({
          key,
          label,
          date:      new Date(cur),
          actual:    map[key]?.actual    || 0,
          projected: map[key]?.projected || 0,
          chips:     map[key]?.chips     || [],
        });
        cur.setMonth(cur.getMonth() + 1);
      }
      return months;
    }
    
    function renderProjectionsPage() {
      const months   = buildMonthlyData();
      const today    = new Date();
      const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
      // ── BAR CHART ──
      const W = 900, H = 260, PAD = { top: 24, right: 20, bottom: 36, left: 70 };
      const chartW = W - PAD.left - PAD.right;
      const chartH = H - PAD.top  - PAD.bottom;
      const barW   = chartW / months.length;
      const maxVal = Math.max(...months.map(m => m.actual + m.projected), 1);
      const scale  = (v) => (v / maxVal) * chartH;
    
      const step = maxVal <= 100000 ? 25000 : maxVal <= 300000 ? 50000 : 100000;
      const gridLines = [];
      for (let v = step; v <= maxVal * 1.1; v += step) gridLines.push(v);
    
      const todayX = months.findIndex(m => m.key === todayKey);
    
      let bars = '';
      months.forEach((m, i) => {
        const x  = PAD.left + i * barW;
        const bw = barW * 0.65;
        const bx = x + (barW - bw) / 2;
    
        if (m.actual > 0) {
          const bh = scale(m.actual);
          const by = PAD.top + chartH - bh;
          bars += `<rect class="bar-actual" x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2"/>`;
          if (bh > 18) bars += `<text class="value-label" x="${(bx + bw/2).toFixed(1)}" y="${(by + 11).toFixed(1)}" text-anchor="middle" font-size="9">${fmtK(m.actual)}</text>`;
        }
        if (m.projected > 0) {
          const baseY = PAD.top + chartH - scale(m.actual);
          const bh    = scale(m.projected);
          const by    = baseY - bh;
          bars += `<rect class="bar-projected" x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2"/>`;
          if (bh > 16 && m.actual === 0) bars += `<text class="value-label" x="${(bx + bw/2).toFixed(1)}" y="${(by + 11).toFixed(1)}" text-anchor="middle" font-size="9" opacity=".45">${fmtK(m.projected)}</text>`;
        }
    
        bars += `<text class="axis-label" x="${(bx + bw/2).toFixed(1)}" y="${(PAD.top + chartH + 16).toFixed(1)}" text-anchor="middle">${m.label}</text>`;
      });
    
      let gridSvg = '';
      gridLines.forEach(v => {
        const y = PAD.top + chartH - scale(v);
        gridSvg += `<line class="grid-line" x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${(PAD.left + chartW).toFixed(1)}" y2="${y.toFixed(1)}"/>`;
        gridSvg += `<text class="axis-label" x="${PAD.left - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end">${fmtK(v)}</text>`;
      });
    
      let todayLineSvg = '';
      if (todayX >= 0) {
        const tx = PAD.left + todayX * barW + barW / 2;
        todayLineSvg = `<line class="today-line" x1="${tx.toFixed(1)}" y1="${PAD.top}" x2="${tx.toFixed(1)}" y2="${(PAD.top + chartH).toFixed(1)}"/>`;
        todayLineSvg += `<text class="axis-label" x="${tx.toFixed(1)}" y="${PAD.top - 6}" text-anchor="middle" fill="var(--accent)" font-size="9" font-weight="600">TODAY</text>`;
      }
    
      const axisSvg = `
        <line class="axis-line" x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top + chartH}"/>
        <line class="axis-line" x1="${PAD.left}" y1="${PAD.top + chartH}" x2="${PAD.left + chartW}" y2="${PAD.top + chartH}"/>
      `;
    
      document.getElementById('proj-chart').innerHTML = `
        <svg class="chart-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
          ${gridSvg}${axisSvg}${todayLineSvg}${bars}
        </svg>
      `;
    
      // ── MONTHLY TABLE ──
      const tableBody     = document.getElementById('proj-table-body');
      const visibleMonths = months.filter(m => m.actual > 0 || m.projected > 0);
    
      tableBody.innerHTML = visibleMonths.map(m => {
        const isCurrent = m.key === todayKey;
        const isFuture  = m.date > today;
        const total     = m.actual + m.projected;
        const chips     = m.chips.map(c =>
          `<span class="inv-chip ${c.projected ? 'projected' : ''}">${c.label}</span>`
        ).join('');
        const totalClass = isFuture ? 'month-total-future' : 'month-total';
    
        return `
          <tr class="${isCurrent ? 'is-current' : ''} ${isFuture ? 'is-future' : ''}">
            <td><div class="month-name">${m.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div></td>
            <td><div class="invoice-chips">${chips || '<span class="inv-chip" style="opacity:.3">—</span>'}</div></td>
            <td style="text-align:right">
              ${m.actual    > 0 ? `<div style="font-family:var(--mono);font-size:11px;color:var(--text-muted)">${fmt(m.actual)} confirmed</div>`  : ''}
              ${m.projected > 0 ? `<div style="font-family:var(--mono);font-size:11px;color:var(--text-dim)">${fmt(m.projected)} projected</div>` : ''}
            </td>
            <td class="${totalClass}">${fmt(total)}</td>
          </tr>
        `;
      }).join('');
    
      // ── HEADER STATS ──
      const totalConfirmed = months.reduce((s, m) => s + m.actual,    0);
      const totalProjected = months.reduce((s, m) => s + m.projected, 0);
      document.getElementById('proj-stat-confirmed').textContent = fmt(totalConfirmed);
      document.getElementById('proj-stat-projected').textContent = fmt(totalProjected);
      document.getElementById('proj-stat-total').textContent     = fmt(totalConfirmed + totalProjected);
    }
    
    // ─── NAV / PAGE ROUTING ───────────────────────────────────────────────────────
    function showPage(name) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.getElementById('page-' + name).classList.add('active');
      document.getElementById('nav-' + name).classList.add('active');
      if (name === 'projections') renderProjectionsPage();
    }
    
    // ─── INIT ─────────────────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
      renderInvoicePage();
      showPage('invoices');
      document.getElementById('updated-date').textContent =
        new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    });
