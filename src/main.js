import { createIcons, ArrowUpRight, ArrowDown, Menu, X, Layers2, Building2, MapPin, ContactRound, LayoutDashboard, UsersRound, ChevronsUpDown, CarFront, Handshake, ChartNoAxesCombined, Settings2, ChevronRight, GitBranch, Check, SlidersHorizontal, ScanEye, ShieldCheck, Globe, Info, Plus, Search, Bell } from 'lucide';

const icons = { ArrowUpRight, ArrowDown, Menu, X, Layers2, Building2, MapPin, ContactRound, LayoutDashboard, UsersRound, ChevronsUpDown, CarFront, Handshake, ChartNoAxesCombined, Settings2, ChevronRight, GitBranch, Check, SlidersHorizontal, ScanEye, ShieldCheck, Globe, Info, Plus, Search, Bell };
const renderIcons = () => createIcons({ icons });
export const integrations = [
  { id: 'diskdrive', name: 'DiskDrive', src: '/integrations/diskdrive.webp', description: 'Vehicle data, right where your dealership needs it.', color: '#e794ca' },
  { id: 'meta', name: 'Meta', src: '/integrations/meta.svg', description: 'A closer connection between your marketing and your leads.', color: '#1688f8' },
  { id: 'whatsapp', name: 'WhatsApp', src: '/integrations/whatsapp.svg', description: 'Keep the conversation moving, from first hello to handover.', color: '#25d366' },
  { id: 'gmail', name: 'Gmail', src: '/integrations/gmail.svg', description: 'Bring dealership email into the flow of your day.', color: '#ea4335' },
  { id: 'outlook', name: 'Outlook', src: '/integrations/outlook.svg', description: 'Your familiar inbox. Part of a more connected workspace.', color: '#249ee8' },
  { id: 'excel', name: 'Excel', src: '/integrations/excel.svg', description: 'Make your dealership data easier to put to work.', color: '#21a366' },
  { id: 'claude', name: 'Claude', src: '/integrations/claude.svg', description: 'Thoughtful AI assistance for the work behind the scenes.', color: '#d97757' },
  { id: 'openai', name: 'OpenAI', src: '/integrations/openai.svg', description: 'More possibilities for intelligent dealership workflows.', color: '#e7e7ea' },
];

let keyboardController;
const tabContainer = document.querySelector('.integration-tabs');
tabContainer.innerHTML = integrations.map((item, i) => `<button class="integration-tab" role="tab" id="integration-tab-${item.id}" data-integration="${item.id}" aria-controls="integration-detail" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--node-color:${item.color}"><img src="${item.src}" width="28" height="28" alt=""/><span>${item.name}</span></button>`).join('');

function selectIntegration(index, pulse = true) {
  const item = integrations[index];
  tabContainer.querySelectorAll('[role="tab"]').forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(index === i));
    tab.tabIndex = index === i ? 0 : -1;
  });
  document.querySelectorAll('.integration-lines line').forEach((line, i) => line.classList.toggle('active', index === i));
  document.querySelector('#integration-detail').setAttribute('aria-labelledby', `integration-tab-${item.id}`);
  document.querySelector('.integration-name').textContent = item.name;
  document.querySelector('.integration-description').textContent = item.description;
  if (pulse) keyboardController?.press(index);
}
tabContainer.querySelectorAll('[role="tab"]').forEach((tab, index) => tab.addEventListener('click', () => selectIntegration(index)));

function setupTabKeys(container, callback) {
  container.addEventListener('keydown', (event) => {
    const tabs = [...container.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    let index;
    if (event.key === 'ArrowRight') index = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') index = (current - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = tabs.length - 1;
    if (index === undefined) return;
    event.preventDefault(); tabs[index].focus(); callback(index);
  });
}
setupTabKeys(tabContainer, selectIntegration);
selectIntegration(0, false);

const productData = {
  leads: {
    title: 'Every enquiry. A clear next step.',
    description: 'Bring buyers and sellers into a single Lead Centre. Assign a person, shape your own pipeline and keep every conversation moving.',
    breadcrumb: 'Lead Centre',
    html: `<div class="mock-page-heading"><div><h3>Lead Centre</h3><p>Good conversations become great opportunities.</p></div><span class="mock-primary"><i data-lucide="plus"></i>New lead</span></div><div class="mock-lanes"><span class="active">Buying a car <b>18</b></span><span>Selling a car <b>6</b></span></div><div class="mock-stage-tabs"><span>All leads · 24</span><span>New · 8</span><span>In progress · 12</span><span>Won · 4</span></div><table class="mock-table"><caption class="sr-only">Illustrative Lead Centre with fictional customers</caption><thead><tr><th>Customer</th><th>Vehicle interest</th><th>Progress</th><th>Assigned to</th><th>Source</th></tr></thead><tbody><tr><td><div class="person-cell"><span class="person-initials">TN</span><div><strong>Thabo Nkosi</strong><small>Added today</small></div></div></td><td>Volkswagen Golf GTI<small>2023 · Petrol · Automatic</small></td><td><span class="mock-tag amber">In progress</span></td><td>James D.</td><td>WhatsApp</td></tr><tr><td><div class="person-cell"><span class="person-initials peach">SM</span><div><strong>Sarah Miller</strong><small>Added today</small></div></div></td><td>Toyota Fortuner<small>2022 · Diesel · Automatic</small></td><td><span class="mock-tag neutral">New enquiry</span></td><td>Michelle K.</td><td>Website</td></tr><tr><td><div class="person-cell"><span class="person-initials blue">JP</span><div><strong>James Petersen</strong><small>Added yesterday</small></div></div></td><td>BMW 320i<small>2023 · Petrol · Automatic</small></td><td><span class="mock-tag green">Deal won</span></td><td>James D.</td><td>Walk-in</td></tr><tr><td><div class="person-cell"><span class="person-initials green">LN</span><div><strong>Lerato Ndlovu</strong><small>Added yesterday</small></div></div></td><td>Suzuki Jimny<small>2024 · Petrol · Manual</small></td><td><span class="mock-tag amber">In progress</span></td><td>Michelle K.</td><td>Referral</td></tr></tbody></table><div class="mock-table-note"><span>Showing 4 of 24 leads</span><span>Sample data</span></div>`,
  },
  dashboard: {
    title: 'Start the day with the full picture.',
    description: 'A daily command centre for owners. See where leads need attention, understand your pipeline and keep an eye on payroll — across your branches.',
    breadcrumb: 'Command Centre',
    html: `<div class="mock-page-heading"><div><h3>Your day, at a glance.</h3><p>The important things, without the noise.</p></div><span class="mock-primary"><i data-lucide="building-2"></i>All branches</span></div><div class="mock-stats"><div class="mock-stat"><span>Open leads</span><strong>20</strong><small>Across your dealership</small></div><div class="mock-stat"><span>Needs attention</span><strong>3</strong><small>Ready for a follow-up</small></div><div class="mock-stat"><span>Payroll</span><strong>1</strong><small>Draft pay run</small></div></div><p class="mock-section-title">Where to focus next</p><table class="mock-table"><caption class="sr-only">Illustrative owner priorities</caption><thead><tr><th>Priority</th><th>Workspace</th><th>Status</th></tr></thead><tbody><tr><td><strong>Follow up on recent enquiries</strong><small>3 leads need your team’s attention</small></td><td>Lead Centre</td><td><span class="mock-tag red">Attention required</span></td></tr><tr><td><strong>Review your next pay run</strong><small>September monthly payroll</small></td><td>Payroll</td><td><span class="mock-tag amber">Draft</span></td></tr><tr><td><strong>Assign incoming opportunities</strong><small>2 leads without an owner</small></td><td>Lead Centre</td><td><span class="mock-tag neutral">Unassigned</span></td></tr></tbody></table><div class="mock-table-note"><span>A connected view of Lead Centre and payroll</span><span>Sample data</span></div>`,
  },
  team: {
    title: 'Good people. Better organised.',
    description: 'Keep your staff directory, roles and branch access in order. Prepare pay runs and printable payslips in an owner-only payroll workspace.',
    breadcrumb: 'People & payroll',
    html: `<div class="mock-page-heading"><div><h3>The people behind it all.</h3><p>Your team, roles and branches in one place.</p></div><span class="mock-primary"><i data-lucide="users-round"></i>Staff directory</span></div><div class="mock-stats"><div class="mock-stat"><span>Team members</span><strong>12</strong><small>Working together</small></div><div class="mock-stat"><span>Branches</span><strong>3</strong><small>One dealership group</small></div><div class="mock-stat"><span>Pay run</span><strong>Sep</strong><small>Draft · Owner access</small></div></div><table class="mock-table"><caption class="sr-only">Illustrative staff directory with fictional people</caption><thead><tr><th>Team member</th><th>Role</th><th>Branch</th></tr></thead><tbody><tr><td><div class="person-cell"><span class="person-initials">JD</span><div><strong>James Daniels</strong><small>Sales team</small></div></div></td><td>Salesperson</td><td><span class="mock-tag neutral">Cape Town</span></td></tr><tr><td><div class="person-cell"><span class="person-initials peach">MK</span><div><strong>Michelle Khan</strong><small>Management</small></div></div></td><td>Branch manager</td><td><span class="mock-tag neutral">Johannesburg</span></td></tr><tr><td><div class="person-cell"><span class="person-initials blue">SN</span><div><strong>Sipho Naidoo</strong><small>Management</small></div></div></td><td>Dealer principal</td><td><span class="mock-tag green">All branches</span></td></tr></tbody></table><div class="mock-table-note"><span>Access that reflects your organisation</span><span>Sample data</span></div>`,
  },
};
const productTabs = document.querySelector('.product-tabs');
function selectProduct(id) {
  const data = productData[id];
  const index = Object.keys(productData).indexOf(id);
  productTabs.querySelectorAll('[role="tab"]').forEach(tab => { const active = tab.dataset.product === id; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  document.querySelector('#product-panel').setAttribute('aria-labelledby', `product-tab-${id}`);
  document.querySelector('#product-content').innerHTML = data.html;
  document.querySelector('#mock-breadcrumb').textContent = data.breadcrumb;
  document.querySelector('#product-title').textContent = data.title;
  document.querySelector('#product-description').textContent = data.description;
  document.querySelector('.caption-index').textContent = `0${index + 1} / 03`;
  document.querySelectorAll('[data-side]').forEach(item => item.classList.toggle('current', item.dataset.side === id));
  renderIcons();
}
productTabs.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('click', () => selectProduct(tab.dataset.product)));
setupTabKeys(productTabs, index => selectProduct(Object.keys(productData)[index]));
selectProduct('leads');

const nav = document.querySelector('#main-nav');
const menu = document.querySelector('.menu-toggle');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!signupForm.reportValidity()) return;
  const status = document.querySelector('#form-status');
  status.hidden = false;
  status.textContent = 'You’re all set for the demo. Your form is valid, but nothing has been submitted or saved. We’ll connect early-access registration when Moto Desk is ready.';
  status.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  document.documentElement.classList.add('js-ready');
}

let paused = reducedMotion.matches;
reducedMotion.addEventListener('change', event => {
  paused = event.matches;
  keyboardController?.setPaused(paused);
});

function showKeyboardFallback(error) {
  console.warn('3D keyboard unavailable; integration buttons remain accessible.', error?.message || 'WebGL context lost');
  const fallback = document.querySelector('#keyboard-loading');
  document.querySelector('.keyboard-stage').classList.add('unavailable');
  fallback.classList.remove('loaded');
  fallback.classList.add('error');
  fallback.querySelector('span').textContent = 'One desk. Every connection. Explore the integrations below.';
}
document.querySelector('#keyboard').addEventListener('keyboard-unavailable', () => showKeyboardFallback());
import('./keyboard.js').then(async ({ createKeyboard }) => {
  keyboardController = await createKeyboard(document.querySelector('#keyboard'), integrations, index => selectIntegration(index, false), paused);
  document.querySelector('#keyboard-loading').classList.add('loaded');
}).catch(showKeyboardFallback);
renderIcons();
