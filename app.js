/* =============================================
   LINEAGE — Family Tree Builder — app.js
   ============================================= */

// ======================== TRANSLATIONS ========================
const TRANSLATIONS = {
    en: {
        newTree: 'New Tree', addPerson: 'Add Person', share: 'Share',
        yourTrees: 'Your Family Trees',
        dashSub: 'Select a tree to continue, or create a new one.',
        open: 'Open', delete: 'Delete',
        noTrees: 'No trees yet. Create your first one!',
        member: 'member', members: 'members', connection: 'connection', connections: 'connections',
        createNewTree: 'Create New Tree',
        createNewTreeSub: 'Give your family tree a name to get started.',
        treeNamePlaceholder: 'e.g. The Johnson Family',
        cancel: 'Cancel', create: 'Create',
        addFamilyMember: 'Add Family Member', editFamilyMember: 'Edit Family Member',
        fullName: 'Full Name', fullNamePlaceholder: 'e.g. John Smith',
        dateOfBirth: 'Date of Birth', dobPlaceholder: 'e.g. 12 Mar 1955',
        dateOfDeath: 'Date of Death', dodOptional: '(optional)',
        dodPlaceholder: 'Leave blank if alive',
        cardColor: 'Card Color', addToTree: 'Add to Tree', saveChanges: 'Save Changes',
        enterName: 'Please enter a name.', enterTreeName: 'Please enter a tree name.',
        shareCopied: 'Share link copied to clipboard!',
        importFailed: 'Failed to import shared tree.',
        deleteConfirm: (name) => `Delete "${name}"? This cannot be undone.`,
        imported: (name) => `Imported "${name}"!`,
        langToggle: 'العربية',
        now: 'now',
        shareOptionsTitle: 'Share Link', shareOptionsSub: 'Choose how people can interact with this shared tree.',
        shareEditable: 'Editable', shareEditableSub: 'Anyone with the link can edit the imported tree in their dashboard.',
        shareViewOnly: 'View-Only', shareViewOnlySub: 'People can only pan and zoom. They cannot add people, move nodes, or edit details.',
        copyLink: 'Copy Link'
    },
    ar: {
        newTree: 'شجرة جديدة', addPerson: 'إضافة شخص', share: 'مشاركة',
        yourTrees: 'أشجار عائلتك',
        dashSub: 'اختر شجرة للمتابعة، أو أنشئ شجرة جديدة.',
        open: 'فتح', delete: 'حذف',
        noTrees: 'لا توجد أشجار بعد. أنشئ أولى شجرة!',
        member: 'عضو', members: 'أعضاء', connection: 'اتصال', connections: 'اتصالات',
        createNewTree: 'إنشاء شجرة جديدة',
        createNewTreeSub: 'أعطِ شجرة عائلتك اسماً للبدء.',
        treeNamePlaceholder: 'مثال: عائلة الجونسون',
        cancel: 'إلغاء', create: 'إنشاء',
        addFamilyMember: 'إضافة فرد من العائلة', editFamilyMember: 'تعديل بيانات الفرد',
        fullName: 'الاسم الكامل', fullNamePlaceholder: 'مثال: محمد علي',
        dateOfBirth: 'تاريخ الميلاد', dobPlaceholder: 'مثال: 12 مارس 1955',
        dateOfDeath: 'تاريخ الوفاة', dodOptional: '(اختياري)',
        dodPlaceholder: 'اتركه فارغاً إذا كان حياً',
        cardColor: 'لون البطاقة', addToTree: 'إضافة للشجرة', saveChanges: 'حفظ التغييرات',
        enterName: 'يرجى إدخال اسم.', enterTreeName: 'يرجى إدخال اسم الشجرة.',
        shareCopied: 'تم نسخ رابط المشاركة!',
        importFailed: 'فشل استيراد الشجرة المشتركة.',
        deleteConfirm: (name) => `هل تريد حذف "${name}"؟ لا يمكن التراجع عن هذا!`,
        imported: (name) => `تم استيراد "${name}"!`,
        langToggle: 'English',
        now: 'الآن',
        shareOptionsTitle: 'مشاركة الرابط', shareOptionsSub: 'اختر كيف يمكن للأشخاص التفاعل مع هذه الشجرة.',
        shareEditable: 'قابل للتعديل', shareEditableSub: 'يمكن لأي شخص لديه الرابط استيراد وتعديل الشجرة.',
        shareViewOnly: 'للعرض فقط', shareViewOnlySub: 'يمكن للأشخاص فقط التحريك والتكبير. لا يمكنهم تعديل أي تفاصيل.',
        copyLink: 'نسخ الرابط'
    }
};

let currentLang = localStorage.getItem('lineage_lang') || 'en';

function t(key, ...args) {
    const val = TRANSLATIONS[currentLang][key];
    return typeof val === 'function' ? val(...args) : (val || TRANSLATIONS.en[key] || key);
}

function applyLang() {
    const isAr = currentLang === 'ar';
    const html = document.documentElement;
    html.lang = currentLang;
    html.dir = isAr ? 'rtl' : 'ltr';

    // Switch font
    document.body.style.fontFamily = isAr ? "'Cairo', sans-serif" : "'Outfit', sans-serif";

    // Flip back-button chevron in RTL
    const backSvg = document.querySelector('#btn-back svg polyline');
    if (backSvg) backSvg.setAttribute('points', isAr ? '9 18 15 12 9 6' : '15 18 9 12 15 6');

    // Update all data-i18n text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    // Update all data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // Update language toggle buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.textContent = t('langToggle');
    });

    // Persist
    localStorage.setItem('lineage_lang', currentLang);
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLang();
}

// ======================== CONSTANTS ========================
const GRADIENTS = [
    { id: 'violet', css: 'linear-gradient(135deg,#6c63ff,#a78bfa)' },
    { id: 'rose', css: 'linear-gradient(135deg,#f43f5e,#fb923c)' },
    { id: 'sky', css: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' },
    { id: 'emerald', css: 'linear-gradient(135deg,#10b981,#34d399)' },
    { id: 'amber', css: 'linear-gradient(135deg,#f59e0b,#fcd34d)' },
    { id: 'pink', css: 'linear-gradient(135deg,#ec4899,#f9a8d4)' },
    { id: 'slate', css: 'linear-gradient(135deg,#475569,#94a3b8)' },
    { id: 'indigo', css: 'linear-gradient(135deg,#4338ca,#818cf8)' },
    { id: 'teal', css: 'linear-gradient(135deg,#0d9488,#5eead4)' },
    { id: 'crimson', css: 'linear-gradient(135deg,#dc2626,#f87171)' },
];

const SNAP_H = 46;
const SNAP_V = 40;
const SNAP_THRESHOLD = 25;
const ANCHOR_EXIT = 21;
const STORAGE_KEY = 'lineage_trees';
const CURRENT_KEY = 'lineage_current';

// ======================== STATE ========================
let trees = {};          // { id: { name, nodes, lines, pan, zoom } }
let currentTreeId = null;

let pan = { x: 0, y: 0 };
let zoom = 0.5;

let nodes = {};  // { id: { id,name,dob,dod,x,y,w,h,gradient } }
let lines = {};  // { id: { id,fromNode,fromAnchor,toNode,toAnchor } }

// Interaction state
let isPanning = false;
let panStart = { x: 0, y: 0 };
let dragNode = null;
let dragOffset = { x: 0, y: 0 };
let resizingNode = null;
let resizeStart = {};
let drawingLine = null; // { fromNode, fromAnchor, startX, startY }
let selectedNodeId = null;
let selectedColor = GRADIENTS[0].id;

let activePointers = new Map();
let initialPinchDist = 0;
let initialPinchZoom = 1;
let initialPinchPan = { x: 0, y: 0 };
let initialPinchCenter = { x: 0, y: 0 };

// ======================== UTILITIES ========================
function uid() { return Math.random().toString(36).slice(2, 10); }

function showToast(msg, dur = 2200) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.add('hidden'), dur);
}

function saveAll() {
    trees[currentTreeId] = {
        ...trees[currentTreeId],
        nodes: JSON.parse(JSON.stringify(nodes)),
        lines: JSON.parse(JSON.stringify(lines)),
        pan: { ...pan }, zoom
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
}

function loadAll() {
    try { trees = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (_) { trees = {}; }
}

function gradient(id) {
    return (GRADIENTS.find(g => g.id === id) || GRADIENTS[0]).css;
}

// ======================== MODAL HELPERS ========================
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// ======================== DASHBOARD ========================
function renderDashboard() {
    const grid = document.getElementById('tree-grid');
    const empty = document.getElementById('dash-empty');
    grid.innerHTML = '';
    const keys = Object.keys(trees);
    if (keys.length === 0) { empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');

    keys.sort((a, b) => (trees[b].ts || 0) - (trees[a].ts || 0)).forEach(id => {
        const tr = trees[id];
        const card = document.createElement('div');
        card.className = 'tree-card';
        const nodeCount = Object.keys(tr.nodes || {}).length;
        const lineCount = Object.keys(tr.lines || {}).length;
        const memberStr = nodeCount === 1 ? `1 ${t('member')}` : `${nodeCount} ${t('members')}`;
        const connStr = lineCount === 1 ? `1 ${t('connection')}` : `${lineCount} ${t('connections')}`;
        card.innerHTML = `
      <div class="tree-card-icon">🌳</div>
      <div class="tree-card-name">${esc(tr.name)}</div>
      <div class="tree-card-meta">${memberStr}  •  ${connStr}</div>
      <div class="tree-card-actions">
        <button class="btn-primary small open-btn">${t('open')}</button>
        <button class="btn-danger del-btn">${t('delete')}</button>
      </div>`;
        card.querySelector('.open-btn').addEventListener('click', e => { e.stopPropagation(); openTree(id); });
        card.querySelector('.del-btn').addEventListener('click', e => { e.stopPropagation(); deleteTree(id); });
        grid.appendChild(card);
    });
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function deleteTree(id) {
    if (!confirm(t('deleteConfirm', trees[id]?.name))) return;
    delete trees[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
    renderDashboard();
}

function openTree(id) {
    currentTreeId = id;
    const tData = trees[id];
    nodes = JSON.parse(JSON.stringify(tData.nodes || {}));
    lines = JSON.parse(JSON.stringify(tData.lines || {}));
    document.getElementById('canvas-view').classList.toggle('readonly-mode', !!tData.readonly);
    switchView('canvas-view');
    renderCanvas();

    if (tData.pan && tData.zoom) {
        pan = { ...tData.pan };
        zoom = tData.zoom;
    } else {
        autoCenterTree();
    }

    applyTransform();
}

function autoCenterTree() {
    const ns = Object.values(nodes);
    const wrapper = document.getElementById('canvas-wrapper');
    if (!wrapper) return;

    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    if (ns.length === 0) {
        pan = { x: w / 2, y: h / 2 };
        zoom = 0.5;
        return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    ns.forEach(n => {
        minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + n.w); maxY = Math.max(maxY, n.y + n.h);
    });

    const treeW = maxX - minX;
    const treeH = maxY - minY;

    // Use default zoom 0.5 or fit if tree is very large
    zoom = 0.5;
    const padding = 40;
    if (treeW * zoom > w - padding || treeH * zoom > h - padding) {
        zoom = Math.min((w - padding) / treeW, (h - padding) / treeH, 0.5);
    }

    pan.x = (w / 2) - (minX + treeW / 2) * zoom;
    pan.y = (h / 2) - (minY + treeH / 2) * zoom;
}

function switchView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ======================== CANVAS RENDER ========================
const canvasInner = () => document.getElementById('canvas-inner');
const connSvg = () => document.getElementById('connections-svg');

function renderCanvas() {
    canvasInner().innerHTML = '';
    connSvg().innerHTML = `<defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <circle cx="4" cy="4" r="2.5" fill="#6c63ff"/>
    </marker>
  </defs>
  <path id="draft-line" d="" />`;

    Object.values(nodes).forEach(n => createNodeEl(n));
    Object.values(lines).forEach(l => renderLine(l));
}

function applyTransform() {
    const inner = canvasInner();
    const svg = connSvg();
    inner.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${zoom})`;
    svg.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${zoom})`;
    document.getElementById('zoom-label').textContent = Math.round(zoom * 100) + '%';
}

// ======================== NODE CREATION ========================
function addNode(data) {
    const id = uid();
    // default placement in visible center
    const wrapper = document.getElementById('canvas-wrapper');
    const cx = (wrapper.clientWidth / 2 - pan.x) / zoom;
    const cy = (wrapper.clientHeight / 2 - pan.y) / zoom;
    const n = {
        id, name: data.name,
        dob: data.dob || '', dod: data.dod || '',
        x: cx - 90, y: cy - 60,
        w: 180, h: 120,
        gradient: data.gradient || GRADIENTS[0].id
    };
    nodes[id] = n;
    createNodeEl(n);
    saveAll();
}

function createNodeEl(n) {
    const el = document.createElement('div');
    el.className = 'person-node';
    el.id = 'node-' + n.id;
    el.style.cssText = `left:${n.x}px;top:${n.y}px;width:${n.w}px;height:${n.h}px;`;

    const dobStr = n.dob || '?';
    const dodStr = n.dod ? n.dod : t('now');
    const dateStr = `${dobStr} – ${dodStr}`;

    el.innerHTML = `
    <div class="node-body" style="background:${gradient(n.gradient)}">
      <div class="node-name">${esc(n.name)}</div>
      <div class="node-dates">${esc(dateStr)}</div>
    </div>
    <div class="resize-handle" data-node="${n.id}">
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M14 14 H8 V14 H14 Z M14 8 H12 V14 H14 Z" fill="rgba(255,255,255,.7)"/><path d="M13 1 L1 13" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/></svg>
    </div>
    <div class="node-menu">
      <button class="node-menu-btn edit-btn" data-node="${n.id}" title="Edit">✎</button>
      <button class="node-menu-btn del-btn"  data-node="${n.id}" title="Delete">✕</button>
    </div>
    <div class="anchor top"    data-node="${n.id}" data-side="top"></div>
    <div class="anchor bottom" data-node="${n.id}" data-side="bottom"></div>
    <div class="anchor left"   data-node="${n.id}" data-side="left"></div>
    <div class="anchor right"  data-node="${n.id}" data-side="right"></div>`;

    canvasInner().appendChild(el);
    attachNodeEvents(el, n.id);
}

function updateNodeEl(n) {
    const el = document.getElementById('node-' + n.id);
    if (!el) return;
    el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
    el.style.width = n.w + 'px'; el.style.height = n.h + 'px';
    const body = el.querySelector('.node-body');
    body.style.background = gradient(n.gradient);
    const dodStr = n.dod ? n.dod : t('now');
    el.querySelector('.node-name').textContent = n.name;
    el.querySelector('.node-dates').textContent = `${n.dob || '?'} – ${dodStr}`;
    refreshLines(n.id);
}

function deleteNode(id) {
    const el = document.getElementById('node-' + id);
    if (el) el.remove();
    delete nodes[id];
    // remove connected lines
    Object.keys(lines).filter(lid => lines[lid].fromNode === id || lines[lid].toNode === id)
        .forEach(lid => { deleteLine(lid, false); });
    renderAllLines();
    saveAll();
}

// ======================== NODE EVENTS ========================
function attachNodeEvents(el, id) {
    // Select on click
    el.addEventListener('pointerdown', e => {
        if (e.target.classList.contains('anchor') ||
            e.target.classList.contains('resize-handle') ||
            e.target.closest('.node-menu') ||
            e.target.closest('.resize-handle')) return;
        e.stopPropagation();
        el.setPointerCapture(e.pointerId);
        selectNode(id);
        startDragNode(e, id);
    });

    // Resize handle
    el.querySelector('.resize-handle').addEventListener('pointerdown', e => {
        e.stopPropagation(); e.preventDefault();
        const n = nodes[id];
        resizingNode = id;
        resizeStart = { x: e.clientX, y: e.clientY, w: n.w, h: n.h };
        e.target.setPointerCapture(e.pointerId);
    });

    // Edit button
    el.querySelector('.edit-btn').addEventListener('click', e => {
        e.stopPropagation();
        openEditModal(id);
    });

    // Delete button
    el.querySelector('.del-btn').addEventListener('click', e => {
        e.stopPropagation();
        deleteNode(id);
        selectedNodeId = null;
    });

    // Anchors
    el.querySelectorAll('.anchor').forEach(a => {
        a.addEventListener('pointerdown', e => {
            e.stopPropagation(); e.preventDefault();
            const side = a.dataset.side;
            const pos = anchorCenter(id, side);
            drawingLine = { fromNode: id, fromAnchor: side, startX: pos.x, startY: pos.y };
            a.setPointerCapture(e.pointerId);
        });
    });
}

function selectNode(id) {
    if (selectedNodeId && selectedNodeId !== id) {
        const prev = document.getElementById('node-' + selectedNodeId);
        if (prev) prev.classList.remove('selected');
    }
    selectedNodeId = id;
    document.getElementById('node-' + id).classList.add('selected');
}

function deselectAll() {
    if (selectedNodeId) {
        const el = document.getElementById('node-' + selectedNodeId);
        if (el) el.classList.remove('selected');
        selectedNodeId = null;
    }
}

// ======================== DRAG NODE ========================
function startDragNode(e, id) {
    const n = nodes[id];
    dragNode = id;
    dragOffset = {
        x: e.clientX / zoom - n.x,
        y: e.clientY / zoom - n.y
    };
}

function onMouseMoveNode(e) {
    if (!dragNode) return;
    const n = nodes[dragNode];
    let nx = e.clientX / zoom - dragOffset.x;
    let ny = e.clientY / zoom - dragOffset.y;

    // Snap check
    let snappedH = false, snappedV = false;
    Object.values(nodes).forEach(other => {
        if (other.id === dragNode) return;
        // Horizontal alignment (snap Y so top edges or center align)
        if (!snappedH && Math.abs(ny - other.y) < SNAP_THRESHOLD) { ny = other.y; snappedH = true; }
        if (!snappedH && Math.abs((ny + n.h / 2) - (other.y + other.h / 2)) < SNAP_THRESHOLD) { ny = other.y + other.h / 2 - n.h / 2; snappedH = true; }
        // Vertical alignment (snap X)
        if (!snappedV && Math.abs(nx - other.x) < SNAP_THRESHOLD) { nx = other.x; snappedV = true; }
        if (!snappedV && Math.abs((nx + n.w / 2) - (other.x + other.w / 2)) < SNAP_THRESHOLD) { nx = other.x + other.w / 2 - n.w / 2; snappedV = true; }
        // Gap snap: place SNAP_H right of or SNAP_H left of other
        if (!snappedV && Math.abs(nx - (other.x + other.w + SNAP_H)) < SNAP_THRESHOLD) { nx = other.x + other.w + SNAP_H; snappedV = true; }
        if (!snappedV && Math.abs((nx + n.w + SNAP_H) - other.x) < SNAP_THRESHOLD) { nx = other.x - n.w - SNAP_H; snappedV = true; }
        // Gap snap vertical
        if (!snappedH && Math.abs(ny - (other.y + other.h + SNAP_V)) < SNAP_THRESHOLD) { ny = other.y + other.h + SNAP_V; snappedH = true; }
        if (!snappedH && Math.abs((ny + n.h + SNAP_V) - other.y) < SNAP_THRESHOLD) { ny = other.y - n.h - SNAP_V; snappedH = true; }
    });

    n.x = nx; n.y = ny;
    const el = document.getElementById('node-' + dragNode);
    if (el) { el.style.left = nx + 'px'; el.style.top = ny + 'px'; }
    refreshLines(dragNode);
}

// ======================== RESIZE ========================
function onMouseMoveResize(e) {
    if (!resizingNode) return;
    const n = nodes[resizingNode];
    const dx = (e.clientX - resizeStart.x) / zoom;
    const dy = (e.clientY - resizeStart.y) / zoom;
    n.w = Math.max(140, resizeStart.w + dx);
    n.h = Math.max(100, resizeStart.h + dy);
    const el = document.getElementById('node-' + resizingNode);
    if (el) { el.style.width = n.w + 'px'; el.style.height = n.h + 'px'; }
    refreshLines(resizingNode);
}

// ======================== ANCHOR POSITIONS ========================
function anchorCenter(nodeId, side) {
    const n = nodes[nodeId];
    if (!n) return { x: 0, y: 0 };
    switch (side) {
        case 'top': return { x: n.x + n.w / 2, y: n.y };
        case 'bottom': return { x: n.x + n.w / 2, y: n.y + n.h };
        case 'left': return { x: n.x, y: n.y + n.h / 2 };
        case 'right': return { x: n.x + n.w, y: n.y + n.h / 2 };
    }
    return { x: 0, y: 0 };
}

// ======================== ORTHOGONAL PATH ========================
function orthogonalPath(x1, y1, side1, x2, y2, side2) {
    const EXIT = ANCHOR_EXIT;
    // Exit straight from source
    let mx1 = x1, my1 = y1;
    switch (side1) {
        case 'top': my1 -= EXIT; break;
        case 'bottom': my1 += EXIT; break;
        case 'left': mx1 -= EXIT; break;
        case 'right': mx1 += EXIT; break;
    }
    // Exit straight into target (approach)
    let mx2 = x2, my2 = y2;
    switch (side2) {
        case 'top': my2 -= EXIT; break;
        case 'bottom': my2 += EXIT; break;
        case 'left': mx2 -= EXIT; break;
        case 'right': mx2 += EXIT; break;
    }
    // Single corner connecting the two exits — prefer axis of source
    let cx, cy;
    if (side1 === 'top' || side1 === 'bottom') {
        cx = mx1; cy = my2;
    } else {
        cx = mx2; cy = my1;
    }
    return `M${x1},${y1} L${mx1},${my1} L${cx},${cy} L${mx2},${my2} L${x2},${y2}`;
}

// ======================== RENDER LINE ========================
function renderLine(l) {
    const svg = connSvg();
    let path = svg.querySelector(`[data-line="${l.id}"]`);
    if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('data-line', l.id);
        path.classList.add('conn-line');
        path.addEventListener('dblclick', () => { deleteLine(l.id); });
        path.addEventListener('click', (e) => { e.stopPropagation(); });
        svg.appendChild(path);
    }
    const p1 = anchorCenter(l.fromNode, l.fromAnchor);
    const p2 = anchorCenter(l.toNode, l.toAnchor);
    path.setAttribute('d', orthogonalPath(p1.x, p1.y, l.fromAnchor, p2.x, p2.y, l.toAnchor));
}

function renderAllLines() {
    connSvg().querySelectorAll('[data-line]').forEach(p => p.remove());
    Object.values(lines).forEach(l => renderLine(l));
}

function refreshLines(nodeId) {
    Object.values(lines).filter(l => l.fromNode === nodeId || l.toNode === nodeId)
        .forEach(l => renderLine(l));
}

function deleteLine(id, redraw = true) {
    const svg = connSvg();
    const el = svg.querySelector(`[data-line="${id}"]`);
    if (el) el.remove();
    delete lines[id];
    if (redraw) saveAll();
}

// ======================== DRAW LINE (DRAG FROM ANCHOR) ========================
function updateDraftLine(mx, my) {
    if (!drawingLine) return;
    // Convert mouse pos (screen) to canvas space
    const wrapper = document.getElementById('canvas-wrapper');
    const rect = wrapper.getBoundingClientRect();
    const cx = (mx - rect.left - pan.x) / zoom;
    const cy = (my - rect.top - pan.y) / zoom;

    const draft = document.getElementById('draft-line');
    const sx = drawingLine.startX, sy = drawingLine.startY;
    const side = drawingLine.fromAnchor;
    let ex = sx, ey = sy;
    switch (side) {
        case 'top': ey -= ANCHOR_EXIT; break;
        case 'bottom': ey += ANCHOR_EXIT; break;
        case 'left': ex -= ANCHOR_EXIT; break;
        case 'right': ex += ANCHOR_EXIT; break;
    }
    draft.setAttribute('d', `M${sx},${sy} L${ex},${ey} L${cx},${cy}`);
}

function finishDrawLine(mx, my) {
    if (!drawingLine) return;
    const wrapper = document.getElementById('canvas-wrapper');
    const rect = wrapper.getBoundingClientRect();
    const cx = (mx - rect.left - pan.x) / zoom;
    const cy = (my - rect.top - pan.y) / zoom;

    // Find target anchor
    let hit = null;
    document.querySelectorAll('.anchor').forEach(a => {
        const nid = a.dataset.node;
        const side = a.dataset.side;
        if (nid === drawingLine.fromNode) return;
        const pos = anchorCenter(nid, side);
        // Hit radius in canvas coords
        if (Math.hypot(cx - pos.x, cy - pos.y) < 20) {
            hit = { node: nid, side };
        }
    });

    if (hit) {
        const lid = uid();
        lines[lid] = { id: lid, fromNode: drawingLine.fromNode, fromAnchor: drawingLine.fromAnchor, toNode: hit.node, toAnchor: hit.side };
        renderLine(lines[lid]);
        saveAll();
    }
    document.getElementById('draft-line').setAttribute('d', '');
    drawingLine = null;
}

// ======================== PAN & ZOOM ========================
function setupCanvasInteraction() {
    const wrapper = document.getElementById('canvas-wrapper');

    wrapper.addEventListener('pointerdown', e => {
        if (e.target === wrapper || e.target === canvasInner() || e.target === connSvg()) {
            deselectAll();
            activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

            if (activePointers.size === 1) {
                isPanning = true;
                panStart = { x: e.clientX - pan.x, y: e.clientY - pan.y };
                wrapper.style.cursor = 'grabbing';
                wrapper.setPointerCapture(e.pointerId);
            } else if (activePointers.size === 2) {
                isPanning = false; // Disable single pan
                const pts = Array.from(activePointers.values());
                initialPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
                initialPinchZoom = zoom;
                initialPinchPan = { ...pan };
                const rect = wrapper.getBoundingClientRect();
                initialPinchCenter = {
                    x: (pts[0].x + pts[1].x) / 2 - rect.left,
                    y: (pts[0].y + pts[1].y) / 2 - rect.top
                };
            }
            e.preventDefault();
        }
    });

    wrapper.addEventListener('wheel', e => {
        e.preventDefault();
        const rect = wrapper.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const factor = e.deltaY < 0 ? 1.1 : 0.91;
        const newZoom = Math.min(4, Math.max(0.15, zoom * factor));
        pan.x = mx - (mx - pan.x) * (newZoom / zoom);
        pan.y = my - (my - pan.y) * (newZoom / zoom);
        zoom = newZoom;
        applyTransform();
        saveAll();
    }, { passive: false });

    document.getElementById('btn-zoom-in').addEventListener('click', () => {
        zoom = Math.min(4, zoom * 1.15); applyTransform(); saveAll();
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
        zoom = Math.max(0.15, zoom / 1.15); applyTransform(); saveAll();
    });
    document.getElementById('btn-center-view').addEventListener('click', () => {
        autoCenterTree(); applyTransform(); saveAll();
    });
}

// ======================== GLOBAL POINTER ========================
document.addEventListener('pointermove', e => {
    if (activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (activePointers.size === 2 && initialPinchDist > 0) {
        const pts = Array.from(activePointers.values());
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
        const currentCenter = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };

        const wrapper = document.getElementById('canvas-wrapper');
        const rect = wrapper.getBoundingClientRect();
        const cx = currentCenter.x - rect.left;
        const cy = currentCenter.y - rect.top;

        const factor = dist / initialPinchDist;
        const newZoom = Math.min(4, Math.max(0.15, initialPinchZoom * factor));

        const centerDx = cx - initialPinchCenter.x;
        const centerDy = cy - initialPinchCenter.y;

        pan.x = initialPinchPan.x + centerDx - (initialPinchCenter.x - initialPinchPan.x) * (newZoom / initialPinchZoom - 1);
        pan.y = initialPinchPan.y + centerDy - (initialPinchCenter.y - initialPinchPan.y) * (newZoom / initialPinchZoom - 1);

        zoom = newZoom;
        applyTransform();
        return;
    }

    if (isPanning && activePointers.size <= 1) {
        pan.x = e.clientX - panStart.x;
        pan.y = e.clientY - panStart.y;
        applyTransform();
    }
    if (dragNode) { onMouseMoveNode(e); }
    if (resizingNode) { onMouseMoveResize(e); }
    if (drawingLine) { updateDraftLine(e.clientX, e.clientY); }
});

document.addEventListener('pointerup', e => {
    if (activePointers.has(e.pointerId)) {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2) {
            initialPinchDist = 0;
            saveAll();
        }
        if (activePointers.size === 1) {
            const remainingId = Array.from(activePointers.keys())[0];
            const pt = activePointers.get(remainingId);
            isPanning = true;
            panStart = { x: pt.x - pan.x, y: pt.y - pan.y };
        } else if (activePointers.size === 0) {
            const wrapper = document.getElementById('canvas-wrapper');
            if (wrapper) wrapper.style.cursor = 'default';
            isPanning = false;
        }
    } else if (isPanning) {
        const wrapper = document.getElementById('canvas-wrapper');
        if (wrapper) wrapper.style.cursor = 'default';
        isPanning = false;
        saveAll();
    }

    if (dragNode) { nodes[dragNode]; saveAll(); dragNode = null; }
    if (resizingNode) { saveAll(); resizingNode = null; }
    if (drawingLine) { finishDrawLine(e.clientX, e.clientY); }
});

document.addEventListener('pointercancel', e => {
    if (activePointers.has(e.pointerId)) {
        activePointers.delete(e.pointerId);
        initialPinchDist = 0;
        if (activePointers.size === 0) isPanning = false;
    }
});

// ======================== EDIT PERSON MODAL ========================
let editingNodeId = null;

function openEditModal(id) {
    editingNodeId = id;
    const n = nodes[id];
    document.getElementById('input-person-name').value = n.name;
    document.getElementById('input-person-dob').value = n.dob;
    document.getElementById('input-person-dod').value = n.dod;
    selectedColor = n.gradient;
    buildSwatches();

    document.getElementById('person-modal-title').textContent = t('editFamilyMember');
    document.getElementById('person-modal-title').dataset.i18n = 'editFamilyMember';
    const addBtn = document.getElementById('btn-person-add');
    addBtn.textContent = t('saveChanges');
    addBtn.dataset.i18n = 'saveChanges';

    openModal('modal-add-person');
}

function buildSwatches() {
    const container = document.getElementById('color-swatches');
    container.innerHTML = '';
    GRADIENTS.forEach(g => {
        const s = document.createElement('div');
        s.className = 'swatch' + (g.id === selectedColor ? ' active' : '');
        s.style.background = g.css;
        s.title = g.id;
        s.addEventListener('click', () => {
            container.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
            selectedColor = g.id;
        });
        container.appendChild(s);
    });
}

// ======================== ADD/EDIT PERSON SUBMIT ========================
document.getElementById('btn-person-add').addEventListener('click', () => {
    const name = document.getElementById('input-person-name').value.trim();
    if (!name) { showToast(t('enterName')); return; }
    const dob = document.getElementById('input-person-dob').value.trim();
    const dod = document.getElementById('input-person-dod').value.trim();

    if (editingNodeId) {
        const n = nodes[editingNodeId];
        n.name = name; n.dob = dob; n.dod = dod; n.gradient = selectedColor;
        updateNodeEl(n); saveAll();
        editingNodeId = null;
    } else {
        addNode({ name, dob, dod, gradient: selectedColor });
    }
    closeModal('modal-add-person');
    document.getElementById('btn-person-add').dataset.i18n = 'addToTree';
    document.getElementById('btn-person-add').textContent = t('addToTree');
    document.getElementById('input-person-name').value = '';
    document.getElementById('input-person-dob').value = '';
    document.getElementById('input-person-dod').value = '';
});

document.getElementById('btn-person-cancel').addEventListener('click', () => {
    editingNodeId = null;
    closeModal('modal-add-person');
    document.getElementById('btn-person-add').dataset.i18n = 'addToTree';
    document.getElementById('btn-person-add').textContent = t('addToTree');
});

// ======================== SHARE LINK ========================
document.getElementById('btn-share').addEventListener('click', () => {
    openModal('modal-share');
});

document.getElementById('btn-share-cancel').addEventListener('click', () => {
    closeModal('modal-share');
});

document.getElementById('btn-share-copy').addEventListener('click', () => {
    saveAll();
    const isReadonly = document.querySelector('input[name="share-type"]:checked').value === 'viewonly';

    // Create export payload
    const payload = JSON.stringify({
        name: trees[currentTreeId].name,
        nodes, lines, pan, zoom,
        readonly: isReadonly
    });

    const b64 = btoa(unescape(encodeURIComponent(payload)));
    const url = location.href.split('#')[0] + '#share=' + b64;
    navigator.clipboard.writeText(url).then(() => showToast(t('shareCopied')))
        .catch(() => prompt('Copy this link:', url));

    closeModal('modal-share');
});


// ======================== SHARE IMPORT ON LOAD ========================
function checkShareImport() {
    const hash = location.hash;
    if (!hash.startsWith('#share=')) return;
    try {
        const b64 = hash.slice(7);
        const json = decodeURIComponent(escape(atob(b64)));
        const data = JSON.parse(json);
        const id = uid();
        trees[id] = {
            id, name: data.name + ' (imported)', ts: Date.now(),
            nodes: data.nodes || {}, lines: data.lines || {},
            readonly: data.readonly === true
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
        history.replaceState(null, '', location.pathname);
        showToast(t('imported', data.name));
        renderDashboard();
        openTree(id);
    } catch (e) {
        showToast(t('importFailed'));
    }
}

// ======================== LANGUAGE TOGGLE ========================
document.getElementById('btn-lang-dash').addEventListener('click', toggleLang);
document.getElementById('btn-lang-canvas').addEventListener('click', toggleLang);

// ======================== DASHBOARD BUTTONS ========================
document.getElementById('btn-new-tree').addEventListener('click', () => {
    document.getElementById('input-tree-name').value = '';
    openModal('modal-new-tree');
    setTimeout(() => document.getElementById('input-tree-name').focus(), 50);
});

document.getElementById('btn-modal-cancel').addEventListener('click', () => closeModal('modal-new-tree'));
document.getElementById('btn-modal-create').addEventListener('click', createNewTree);
document.getElementById('input-tree-name').addEventListener('keydown', e => { if (e.key === 'Enter') createNewTree(); });

function createNewTree() {
    const name = document.getElementById('input-tree-name').value.trim();
    if (!name) { showToast(t('enterTreeName')); return; }
    const id = uid();
    trees[id] = { id, name, ts: Date.now(), nodes: {}, lines: {} };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
    closeModal('modal-new-tree');
    renderDashboard();
    openTree(id);
}

// Canvas header buttons
document.getElementById('btn-back').addEventListener('click', () => {
    saveAll();
    nodes = {}; lines = {}; currentTreeId = null;
    switchView('dashboard');
    renderDashboard();
});

document.getElementById('btn-add-person').addEventListener('click', () => {
    editingNodeId = null;
    selectedColor = GRADIENTS[0].id;
    buildSwatches();
    document.getElementById('input-person-name').value = '';
    document.getElementById('input-person-dob').value = '';
    document.getElementById('input-person-dod').value = '';
    const addBtn = document.getElementById('btn-person-add');
    addBtn.dataset.i18n = 'addToTree';
    addBtn.textContent = t('addToTree');
    document.getElementById('person-modal-title').dataset.i18n = 'addFamilyMember';
    document.getElementById('person-modal-title').textContent = t('addFamilyMember');
    openModal('modal-add-person');
    setTimeout(() => document.getElementById('input-person-name').focus(), 50);
});

// ======================== KEYBOARD SHORTCUTS ========================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal('modal-new-tree'); closeModal('modal-add-person');
        deselectAll();
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId && document.activeElement.tagName !== 'INPUT') {
        deleteNode(selectedNodeId); selectedNodeId = null;
    }
});

// ======================== CLICK OUTSIDE DESELECTS ========================
document.getElementById('canvas-wrapper').addEventListener('click', e => {
    if (e.target === document.getElementById('canvas-wrapper') || e.target === connSvg()) {
        deselectAll();
    }
});

// ======================== INIT ========================
loadAll();
applyLang();       // apply saved language on startup
renderDashboard();
setupCanvasInteraction();
checkShareImport();

// Resume last open tree if any
const lastId = localStorage.getItem(CURRENT_KEY);
if (lastId && trees[lastId]) { openTree(lastId); }
