import { useEffect, useRef, useState } from 'react';
import { creatorApi } from '../../api/appApi';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconPlus({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconEye({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconDots({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function IconGrip({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" opacity="0.35">
      <circle cx="5" cy="3" r="1.2" /><circle cx="11" cy="3" r="1.2" />
      <circle cx="5" cy="8" r="1.2" /><circle cx="11" cy="8" r="1.2" />
      <circle cx="5" cy="13" r="1.2" /><circle cx="11" cy="13" r="1.2" />
    </svg>
  );
}

function IconEdit({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

function IconArrowUp({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function IconArrowDown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconExternalLink({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconCopy({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function IconLink({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconCheck({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevronDown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Theme Definitions ────────────────────────────────────────────────────────

const THEMES = [
  {
    id: 'aurora', name: 'Aurora', mood: 'Warm & creator-forward',
    swatch: 'linear-gradient(135deg,#ff6b57,#ffb347)',
    bg: '#fff6f3', surface: '#ffffff', accent: '#ff6b57', accentText: '#fff',
    text: '#1a1210', textSoft: '#9c7770', border: 'rgba(255,107,87,0.18)',
    headerGrad: 'linear-gradient(160deg,#fff6f3 0%,#ffe4de 100%)'
  },
  {
    id: 'canvas', name: 'Canvas', mood: 'Clean editorial',
    swatch: 'linear-gradient(135deg,#1f7aff,#38bdf8)',
    bg: '#f8faff', surface: '#ffffff', accent: '#1f7aff', accentText: '#fff',
    text: '#0f1929', textSoft: '#5a6a82', border: 'rgba(31,122,255,0.14)',
    headerGrad: 'linear-gradient(160deg,#f0f5ff 0%,#ddeaff 100%)'
  },
  {
    id: 'muse', name: 'Muse', mood: 'Soft & creative',
    swatch: 'linear-gradient(135deg,#0ea67f,#22d3a8)',
    bg: '#f4faf7', surface: '#ffffff', accent: '#0ea67f', accentText: '#fff',
    text: '#0c1f18', textSoft: '#4a7060', border: 'rgba(14,166,127,0.14)',
    headerGrad: 'linear-gradient(160deg,#f0faf6 0%,#d5f0e6 100%)'
  },
  {
    id: 'midnight', name: 'Midnight', mood: 'Dark & bold',
    swatch: 'linear-gradient(135deg,#7c6ef5,#a78bfa)',
    bg: '#111318', surface: '#1e2028', accent: '#7c6ef5', accentText: '#fff',
    text: '#f0f0f5', textSoft: '#9090aa', border: 'rgba(124,110,245,0.22)',
    headerGrad: 'linear-gradient(160deg,#1c1f30 0%,#111318 100%)'
  },
  {
    id: 'minimal', name: 'Minimal', mood: 'Pure & focused',
    swatch: 'linear-gradient(135deg,#222,#555)',
    bg: '#ffffff', surface: '#f5f5f5', accent: '#111111', accentText: '#ffffff',
    text: '#111111', textSoft: '#888888', border: '#e5e5e5',
    headerGrad: '#f8f8f8'
  }
];

const BLOCK_CATALOG = [
  { type: 'profile', label: 'Profile Header', desc: 'Avatar, name & bio', icon: 'profile', defaultContent: { name: '', bio: '', avatar: '' } },
  { type: 'links', label: 'Links', desc: 'Custom link buttons', icon: 'links', defaultContent: { items: [{ id: '1', title: 'My Website', url: 'https://' }] } },
  { type: 'social-links', label: 'Social Links', desc: 'Instagram, YouTube & more', icon: 'social', defaultContent: { items: [{ id: '1', platform: 'instagram', url: '' }] } },
  { type: 'featured-products', label: 'Products', desc: 'Showcase your products', icon: 'products', defaultContent: { count: 4 } },
  { type: 'affiliate-links', label: 'Affiliate Links', desc: 'Curated recommendations', icon: 'affiliate', defaultContent: { count: 3 } },
  { type: 'email-capture', label: 'Email Form', desc: 'Grow your email list', icon: 'email', defaultContent: { title: 'Join my newsletter', description: '', buttonLabel: 'Subscribe', placeholder: 'your@email.com' } },
  { type: 'banner', label: 'Banner', desc: 'Announcement or CTA', icon: 'banner', defaultContent: { message: 'Check out my latest drop!', link: '' } }
];

const BLOCK_ICONS = {
  profile: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  links: <IconLink size={16} />,
  social: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  products: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
  affiliate: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6" /><path d="M23 11h-6" /></svg>,
  email: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  banner: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
};

const ICON_COLORS = {
  profile: '#f59e0b',
  links: '#10b981',
  social: '#e11d48',
  products: '#a855f7',
  affiliate: '#6366f1',
  email: '#f97316',
  banner: '#06b6d4',
};

const SOCIAL_PLATFORMS = [
  { id: 'instagram', label: 'Instagram', emoji: '📸' },
  { id: 'youtube', label: 'YouTube', emoji: '▶️' },
  { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { id: 'twitter', label: 'Twitter / X', emoji: '𝕏' },
  { id: 'linkedin', label: 'LinkedIn', emoji: '💼' },
  { id: 'facebook', label: 'Facebook', emoji: '🌀' },
  { id: 'spotify', label: 'Spotify', emoji: '🎧' },
  { id: 'website', label: 'Website', emoji: '🌐' }
];

const catalogByType = Object.fromEntries(BLOCK_CATALOG.map(b => [b.type, b]));
const themeById = Object.fromEntries(THEMES.map(t => [t.id, t]));

// ─── Block Icon Component ────────────────────────────────────────────────────

function BlockIcon({ iconKey }) {
  return (
    <div className="pb_block-icon" style={{ background: `${ICON_COLORS[iconKey] || '#888'}18`, color: ICON_COLORS[iconKey] || '#888' }}>
      {BLOCK_ICONS[iconKey] || <IconLink size={16} />}
    </div>
  );
}

// ─── Theme Picker Phone Mock ───────────────────────────────────────────────────

function ThemePhoneMock({ theme: t }) {
  const links = ['My latest course', 'Watch on YouTube', 'Get the template'];
  return (
    <div className="pb_picker__phone-mock">
      <div className="pb_picker__screen" style={{ background: t.bg }}>
        <div className="pb_picker__hero" style={{ background: t.headerGrad }}>
          <div className="pb_picker__avatar" style={{ background: t.accent }}>
            {t.name[0]}
          </div>
          <div className="pb_picker__uname" style={{ color: t.text }}>{t.name} Creator</div>
          <div className="pb_picker__bio" style={{ color: t.textSoft }}>
            Creator · Educator · Coach
          </div>
        </div>
        <div className="pb_picker__links">
          {links.map((label, i) => (
            <div
              key={i}
              className="pb_picker__link-pill"
              style={{
                background: i === 0 ? t.accent : t.surface,
                color: i === 0 ? t.accentText : t.text,
                border: i !== 0 ? `1px solid ${t.border}` : 'none'
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Phone Block Previews ─────────────────────────────────────────────────────

function BlockPreview({ block, theme: t }) {
  if (!block.isVisible) return null;

  switch (block.type) {
    case 'profile': {
      const { name, bio, avatar } = block.content || {};
      const initial = (name || 'Y').trim()[0].toUpperCase();
      return (
        <div className="pb_pv-profile" style={{ background: t.headerGrad }}>
          {avatar ? (
            <img src={avatar} alt={name} className="pb_pv-avatar" />
          ) : (
            <div className="pb_pv-avatar" style={{ background: t.accent }}>{initial}</div>
          )}
          <div style={{ fontWeight: 800, fontSize: 13, color: t.text, marginBottom: 4 }}>
            {name || 'Your Name'}
          </div>
          <div style={{ fontSize: 11, color: t.textSoft, lineHeight: 1.45, padding: '0 8px' }}>
            {bio || 'Your bio goes here. Tell people what you do!'}
          </div>
        </div>
      );
    }

    case 'links': {
      const items = block.content?.items || [];
      return (
        <div className="pb_pv-links">
          {(items.length ? items : [{ id: '0', title: 'My Website' }]).slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="pb_pv-link"
              style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }}
            >
              {item.title || 'Link'}
            </div>
          ))}
        </div>
      );
    }

    case 'social-links': {
      const items = block.content?.items || [];
      return (
        <div className="pb_pv-socials">
          {(items.length ? items : [{ platform: 'instagram' }, { platform: 'youtube' }]).slice(0, 6).map((item, i) => {
            const p = SOCIAL_PLATFORMS.find(p => p.id === item.platform);
            return (
              <div key={i} className="pb_pv-social-icon" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
                {p?.emoji || '🔗'}
              </div>
            );
          })}
        </div>
      );
    }

    case 'email-capture': {
      const { title, buttonLabel } = block.content || {};
      return (
        <div className="pb_pv-email" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.text, marginBottom: 7 }}>
            {title || 'Join my newsletter'}
          </div>
          <div style={{ height: 22, borderRadius: 6, background: t.bg, border: `1px solid ${t.border}`, marginBottom: 6 }} />
          <div style={{ height: 24, borderRadius: 7, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.accentText }}>{buttonLabel || 'Subscribe'}</span>
          </div>
        </div>
      );
    }

    case 'banner': {
      const { message } = block.content || {};
      return (
        <div className="pb_pv-banner" style={{ background: t.accent, color: t.accentText }}>
          {message || 'Check out my latest!'}
        </div>
      );
    }

    case 'featured-products':
      return (
        <div className="pb_pv-products">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="pb_pv-product-card" style={{ background: t.surface, border: `1px solid ${t.border}` }}>
              <div style={{ height: 38, borderRadius: 6, background: t.bg, marginBottom: 6 }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: t.text }}>Product {i}</div>
              <div style={{ fontSize: 9, color: t.accent, fontWeight: 800, marginTop: 2 }}>$29</div>
            </div>
          ))}
        </div>
      );

    case 'affiliate-links':
      return (
        <div className="pb_pv-links">
          {['My Desk Setup', 'Camera Gear', 'Fave Tools'].map((label, i) => (
            <div key={i} className="pb_pv-link" style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.text }}>
              {label}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

function PhonePreview({ blocks, themeId }) {
  const theme = themeById[themeId] || THEMES[0];
  const visible = blocks.filter(b => b.isVisible);

  return (
    <div className="pb_phone">
      <div className="pb_phone__screen" style={{ background: theme.bg }}>
        {visible.length ? (
          visible.map(block => (
            <BlockPreview key={block._id} block={block} theme={theme} />
          ))
        ) : (
          <div className="pb_pv-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: 8 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span>Add blocks to<br />preview your page</span>
          </div>
        )}
      </div>
    </div>
  );
}

const DEFAULT_PAGE_NAME = 'My Page';

function createPageId() {
  return `page-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function slugifyPageName(value) {
  const slug = (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  return slug || 'my-page';
}

function createDefaultProfileBlock(content = {}) {
  return {
    _id: `profile-${Date.now()}`,
    type: 'profile',
    title: catalogByType.profile.label,
    content: { ...catalogByType.profile.defaultContent, ...content },
    settings: {},
    isVisible: true
  };
}

function normalizeBlocks(rawBlocks = [], creatorProfile) {
  const mappedBlocks = rawBlocks.map((block, index) => ({
    _id: block._id || `local-${index}-${Date.now()}`,
    type: block.type,
    title: block.title || catalogByType[block.type]?.label || block.type,
    content: cloneValue(block.content || {}),
    settings: cloneValue(block.settings || {}),
    isVisible: block.isVisible !== false
  }));

  if (mappedBlocks.some(block => block.type === 'profile')) {
    return mappedBlocks;
  }

  return [
    createDefaultProfileBlock({
      name: creatorProfile?.displayName || '',
      bio: creatorProfile?.bio || '',
      avatar: creatorProfile?.avatar || ''
    }),
    ...mappedBlocks
  ];
}

function createPageRecord({ id, name, theme, meta, blocks, creatorProfile }) {
  const pageName = (name || meta?.title || DEFAULT_PAGE_NAME).trim() || DEFAULT_PAGE_NAME;

  return {
    id: id || createPageId(),
    name: pageName,
    theme: theme || 'aurora',
    meta: {
      slug: meta?.slug || slugifyPageName(pageName),
      title: meta?.title || pageName,
      metaTitle: meta?.metaTitle || '',
      metaDescription: meta?.metaDescription || ''
    },
    blocks: normalizeBlocks(blocks || [], creatorProfile)
  };
}

function buildBuilderPages(landingPage, creatorProfile) {
  if (Array.isArray(landingPage?.pages) && landingPage.pages.length) {
    return landingPage.pages.map((page, index) =>
      createPageRecord({
        id: page.id || `page-${index + 1}`,
        name: page.name,
        theme: page.theme,
        meta: page.meta,
        blocks: page.blocks,
        creatorProfile
      })
    );
  }

  return [
    createPageRecord({
      id: landingPage?.selectedPageId,
      name: landingPage?.title || creatorProfile?.displayName || DEFAULT_PAGE_NAME,
      theme: landingPage?.themePreset || 'aurora',
      meta: {
        slug: landingPage?.slug,
        title: landingPage?.title || creatorProfile?.displayName || DEFAULT_PAGE_NAME,
        metaTitle: landingPage?.metaTitle,
        metaDescription: landingPage?.metaDescription
      },
      blocks: landingPage?.blocks || [],
      creatorProfile
    })
  ];
}

// ─── Block Edit Form ──────────────────────────────────────────────────────────

function BlockEditForm({ block, onChange }) {
  const c = block.content || {};
  const set = (key, val) => onChange({ ...c, [key]: val });

  switch (block.type) {
    case 'profile':
      return (
        <div className="pb_edit-section">
          <div className="pb_field">
            <label>Avatar URL</label>
            <input
              value={c.avatar || ''}
              onChange={e => set('avatar', e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
            <span className="pb_field__hint">Paste a direct image URL</span>
          </div>
          <div className="pb_field">
            <label>Display Name</label>
            <input value={c.name || ''} onChange={e => set('name', e.target.value)} placeholder="Your name" />
          </div>
          <div className="pb_field">
            <label>Bio</label>
            <textarea
              rows={3}
              value={c.bio || ''}
              onChange={e => set('bio', e.target.value)}
              placeholder="Tell people what you do"
            />
          </div>
        </div>
      );

    case 'links': {
      const items = c.items || [];
      const add = () => set('items', [...items, { id: Date.now().toString(), title: '', url: 'https://' }]);
      const remove = id => set('items', items.filter(it => it.id !== id));
      const update = (id, key, val) => set('items', items.map(it => it.id === id ? { ...it, [key]: val } : it));
      return (
        <div className="pb_edit-section">
          {items.map(item => (
            <div key={item.id} className="pb_link-row">
              <input
                placeholder="Label"
                value={item.title || ''}
                onChange={e => update(item.id, 'title', e.target.value)}
              />
              <input
                placeholder="https://"
                value={item.url || ''}
                onChange={e => update(item.id, 'url', e.target.value)}
              />
              <button className="pb_remove-btn" onClick={() => remove(item.id)}>
                <IconTrash size={13} />
              </button>
            </div>
          ))}
          <button className="pb_add-row-btn" type="button" onClick={add}>
            <IconPlus size={13} /> Add link
          </button>
        </div>
      );
    }

    case 'social-links': {
      const items = c.items || [];
      const add = () => set('items', [...items, { id: Date.now().toString(), platform: 'instagram', url: '' }]);
      const remove = id => set('items', items.filter(it => it.id !== id));
      const update = (id, key, val) => set('items', items.map(it => it.id === id ? { ...it, [key]: val } : it));
      return (
        <div className="pb_edit-section">
          {items.map(item => (
            <div key={item.id} className="pb_link-row">
              <select
                value={item.platform || 'instagram'}
                onChange={e => update(item.id, 'platform', e.target.value)}
              >
                {SOCIAL_PLATFORMS.map(p => (
                  <option key={p.id} value={p.id}>{p.emoji} {p.label}</option>
                ))}
              </select>
              <input
                placeholder="Profile URL"
                value={item.url || ''}
                onChange={e => update(item.id, 'url', e.target.value)}
              />
              <button className="pb_remove-btn" onClick={() => remove(item.id)}>
                <IconTrash size={13} />
              </button>
            </div>
          ))}
          <button className="pb_add-row-btn" type="button" onClick={add}>
            <IconPlus size={13} /> Add platform
          </button>
        </div>
      );
    }

    case 'email-capture':
      return (
        <div className="pb_edit-section">
          <div className="pb_field">
            <label>Headline</label>
            <input value={c.title || ''} onChange={e => set('title', e.target.value)} />
          </div>
          <div className="pb_field">
            <label>Description</label>
            <textarea rows={2} value={c.description || ''} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="pb_field">
            <label>Button text</label>
            <input value={c.buttonLabel || 'Subscribe'} onChange={e => set('buttonLabel', e.target.value)} />
          </div>
          <div className="pb_field">
            <label>Placeholder</label>
            <input value={c.placeholder || 'your@email.com'} onChange={e => set('placeholder', e.target.value)} />
          </div>
        </div>
      );

    case 'banner':
      return (
        <div className="pb_edit-section">
          <div className="pb_field">
            <label>Message</label>
            <input value={c.message || ''} onChange={e => set('message', e.target.value)} />
          </div>
          <div className="pb_field">
            <label>Link (optional)</label>
            <input value={c.link || ''} onChange={e => set('link', e.target.value)} placeholder="https://" />
          </div>
        </div>
      );

    case 'featured-products':
    case 'affiliate-links':
      return (
        <div className="pb_info-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            {block.type === 'featured-products'
              ? 'Products are pulled from your Products page. Manage them from the sidebar.'
              : 'Affiliate links are pulled from your Affiliate Links page. Manage them from the sidebar.'}
          </span>
        </div>
      );

    default:
      return null;
  }
}

// ─── Add Block Modal ──────────────────────────────────────────────────────────

function AddBlockModal({ onAdd, onClose, existingTypes }) {
  return (
    <div className="pb_backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pb_modal">
        <div className="pb_modal__header">
          <h3>Add a block</h3>
          <button onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="pb_modal__body">
          <div className="pb_catalog">
            {BLOCK_CATALOG.filter(item => item.type !== 'profile').map(item => {
              const alreadyHas = item.type === 'profile' && existingTypes.includes('profile');
              return (
                <button
                  key={item.type}
                  className={`pb_catalog-item${alreadyHas ? ' pb_catalog-item--disabled' : ''}`}
                  disabled={alreadyHas}
                  onClick={() => !alreadyHas && onAdd(item)}
                >
                  <BlockIcon iconKey={item.icon} />
                  <div className="pb_catalog-item__text">
                    <span className="pb_catalog-item__label">
                      {item.label}
                      {alreadyHas && <span className="pb_catalog-item__badge">Added</span>}
                    </span>
                    <span className="pb_catalog-item__desc">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Block Modal ─────────────────────────────────────────────────────────

function EditBlockModal({ block, onSave, onClose }) {
  const [content, setContent] = useState(block.content || {});
  const [title, setTitle] = useState(block.title || '');

  const cat = catalogByType[block.type] || {};

  return (
    <div className="pb_backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pb_modal">
        <div className="pb_modal__header">
          <h3>Edit {cat.label || block.type}</h3>
          <button onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="pb_modal__body">
          <div className="pb_field" style={{ marginBottom: 16 }}>
            <label>Block title (internal label)</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder={cat.label} />
          </div>
          <BlockEditForm
            block={{ ...block, content }}
            onChange={setContent}
          />
        </div>
        <div className="pb_modal__footer">
          <button className="pb_modal-btn pb_modal-btn--ghost" onClick={onClose}>Cancel</button>
          <button
            className="pb_modal-btn pb_modal-btn--primary"
            onClick={() => { onSave({ content, title }); onClose(); }}
          >
            Apply changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Theme Picker ─────────────────────────────────────────────────────────────

function ThemePicker({ onSelect }) {
  const [selected, setSelected] = useState(THEMES[0].id);
  const trackRef = useRef(null);

  return (
    <div className="pb_picker">
      <div className="pb_picker__heading">
        <h2>Pick your look</h2>
        <p>Choose a theme to start. You can always change it later.</p>
      </div>

      <div className="pb_picker__track" ref={trackRef}>
        {THEMES.map(theme => (
          <div
            key={theme.id}
            className={`pb_picker__card ${selected === theme.id ? 'pb_picker__card--active' : ''}`}
            onClick={() => setSelected(theme.id)}
          >
            <ThemePhoneMock theme={theme} />
            <div className="pb_picker__card-name">{theme.name}</div>
          </div>
        ))}
      </div>

      <div className="pb_picker__action">
        <button className="pb_picker__cta" onClick={() => onSelect(selected)}>
          Use this design
        </button>
        <button className="pb_picker__skip" onClick={() => onSelect('aurora')}>
          Skip for now
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingBuilderPage() {
  const { landingPage, creatorProfile, refresh } = useAppData();
  const { toast } = useToast();

  const [pages, setPages] = useState([]);
  const [activePageId, setActivePageId] = useState(null);
  const [activeTab, setActiveTab] = useState('blocks');
  const [showPicker, setShowPicker] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [renamingPageId, setRenamingPageId] = useState(null);
  const [pageNameDraft, setPageNameDraft] = useState('');
  const [mainPageId, setMainPageId] = useState(null);

  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openMenu) return;
    const handleClick = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openMenu]);

  // Seed local state from loaded landing page
  useEffect(() => {
    if (!landingPage) return;
    const nextPages = buildBuilderPages(landingPage, creatorProfile);
    const savedMainPageId = nextPages.find(page => page.id === landingPage.selectedPageId)?.id || nextPages[0]?.id || null;

    setPages(nextPages);
    setActivePageId(savedMainPageId);
    setMainPageId(savedMainPageId);
    setRenamingPageId(null);
    setPageNameDraft('');
    setDirty(false);
    setShowPicker(!(landingPage.blocks || []).length && !landingPage.themePreset);
  }, [landingPage]);

  // Prefill profile block name from creatorProfile if empty
  useEffect(() => {
    if (!creatorProfile) return;
    setPages(prev => prev.map(page => ({
      ...page,
      blocks: page.blocks.map(block => {
        if (block.type !== 'profile') return block;
        return {
          ...block,
          content: {
            name: block.content?.name || creatorProfile.displayName || '',
            bio: block.content?.bio || creatorProfile.bio || '',
            avatar: block.content?.avatar || creatorProfile.avatar || ''
          }
        };
      })
    })));
  }, [creatorProfile]);

  const markDirty = () => setDirty(true);
  const activePage = pages.find(page => page.id === activePageId) || pages[0] || null;
  const blocks = activePage?.blocks || [];
  const theme = activePage?.theme || 'aurora';
  const meta = activePage?.meta || { slug: '', title: '', metaTitle: '', metaDescription: '' };
  const activePageName = activePage?.name || DEFAULT_PAGE_NAME;
  const creatorPublicSlug = creatorProfile?.slug || 'your-username';

  const updateActivePage = updater => {
    if (!activePageId) return;
    setPages(prev => prev.map(page => (page.id === activePageId ? updater(page) : page)));
  };

  const handleSelectPage = pageId => {
    setActivePageId(pageId);
    setOpenMenu(null);
    setEditingBlock(null);
  };

  const handleAddPage = () => {
    const nextPage = createPageRecord({
      name: `Page ${pages.length + 1}`,
      theme: activePage?.theme || 'aurora',
      creatorProfile
    });

    setPages(prev => [...prev, nextPage]);
    setActivePageId(nextPage.id);
    setMainPageId(prev => prev || nextPage.id);
    setOpenMenu(null);
    setEditingBlock(null);
    setRenamingPageId(nextPage.id);
    setPageNameDraft(nextPage.name);
    markDirty();
  };

  const handleStartPageRename = page => {
    setRenamingPageId(page.id);
    setPageNameDraft(page.name);
  };

  const handleCommitPageRename = pageId => {
    const nextName = pageNameDraft.trim() || DEFAULT_PAGE_NAME;

    setPages(prev =>
      prev.map(page => {
        if (page.id !== pageId) return page;
        const currentSlug = page.meta?.slug || '';
        const shouldSyncSlug = !currentSlug || currentSlug === slugifyPageName(page.name);

        return {
          ...page,
          name: nextName,
          meta: {
            ...page.meta,
            title: nextName,
            slug: shouldSyncSlug ? slugifyPageName(nextName) : currentSlug
          }
        };
      })
    );

    setRenamingPageId(null);
    setPageNameDraft('');
    markDirty();
  };

  // ── Block operations ────────────────────────────────────────────────────────

  const addBlock = cat => {
    if (cat.type === 'profile') return;
    const newBlock = {
      _id: `local-${Date.now()}`,
      type: cat.type,
      title: cat.label,
      content: cloneValue(cat.defaultContent),
      settings: {},
      isVisible: true
    };
    updateActivePage(page => ({
      ...page,
      blocks: [...page.blocks, newBlock]
    }));
    setAddOpen(false);
    markDirty();
  };

  const deleteBlock = id => {
    updateActivePage(page => ({
      ...page,
      blocks: page.blocks.filter(block => !(block._id === id && block.type !== 'profile'))
    }));
    setOpenMenu(null);
    markDirty();
  };

  const toggleVisible = id => {
    updateActivePage(page => ({
      ...page,
      blocks: page.blocks.map(block => (block._id === id ? { ...block, isVisible: !block.isVisible } : block))
    }));
    markDirty();
  };

  const moveBlock = (id, dir) => {
    updateActivePage(page => {
      const idx = page.blocks.findIndex(block => block._id === id);
      if (idx < 0) return page;
      if (page.blocks[idx].type === 'profile') return page;
      const next = [...page.blocks];
      const target = dir === 'up' ? idx - 1 : idx + 1;
      if (target < 0 || target >= next.length) return page;
      if (next[target]?.type === 'profile') return page;
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...page, blocks: next };
    });
    setOpenMenu(null);
    markDirty();
  };

  const saveBlockEdit = (id, updates) => {
    updateActivePage(page => ({
      ...page,
      blocks: page.blocks.map(block => (block._id === id ? { ...block, ...updates } : block))
    }));
    markDirty();
  };

  // ── Theme picker finish ─────────────────────────────────────────────────────

  const handlePickTheme = themeId => {
    updateActivePage(page => ({ ...page, theme: themeId }));
    setShowPicker(false);
    setDirty(true);
  };

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (saving || !activePage) return;
    setSaving(true);
    try {
      const normalizedPages = pages.map(page => ({
        ...page,
        meta: {
          slug: page.meta?.slug || slugifyPageName(page.name),
          title: page.meta?.title || page.name,
          metaTitle: page.meta?.metaTitle || '',
          metaDescription: page.meta?.metaDescription || ''
        }
      }));
      const currentPage = normalizedPages.find(page => page.id === activePage.id) || normalizedPages[0];
      const profileBlock = currentPage.blocks.find(block => block.type === 'profile');
      const derivedTitle = currentPage.name || profileBlock?.content?.name || DEFAULT_PAGE_NAME;

      setPages(normalizedPages);

      await creatorApi.saveLandingPage({
        title: derivedTitle,
        slug: creatorPublicSlug,
        metaTitle: currentPage.meta.metaTitle || derivedTitle,
        metaDescription: currentPage.meta.metaDescription,
        themePreset: currentPage.theme,
        isPublished: true,
        blocks: currentPage.blocks.map((block, index) => ({
          type: block.type,
          title: block.title,
          content: block.content,
          settings: block.settings,
          isVisible: block.isVisible,
          order: index
        })),
        pages: normalizedPages.map(page => ({
          id: page.id,
          name: page.name,
          theme: page.theme,
          meta: page.meta,
          blocks: page.blocks.map((block, index) => ({
            type: block.type,
            title: block.title,
            content: block.content,
            settings: block.settings,
            isVisible: block.isVisible,
            order: index
          }))
        })),
        selectedPageId: mainPageId || currentPage.id
      });

      if (profileBlock?.content) {
        const { name, bio, avatar } = profileBlock.content;
        await creatorApi.updateProfile({
          displayName: name || undefined,
          bio: bio || undefined,
          avatar: avatar || undefined
        }).catch(() => { });
      }

      await refresh();
      setDirty(false);
      toast('Page saved!', 'success');
    } catch {
      toast('Could not save. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Share (copy public URL) ─────────────────────────────────────────────────

  const publicUrl = `${window.location.origin}/${creatorPublicSlug}`;
  const visibleBlocks = blocks.filter(block => block.isVisible).length;
  const hiddenBlocks = blocks.length - visibleBlocks;

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(publicUrl);
    toast('Link copied!', 'success');
  };

  const handleOpenPreview = () => {
    window.open(publicUrl, '_blank', 'noopener,noreferrer');
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  const existingTypes = blocks.map(b => b.type);

  if (showPicker) return <ThemePicker onSelect={handlePickTheme} />;

  return (
    <>
      <div className="pb_builder">
        {/* ── Top bar ──────────────────────────────────────────── */}
        <div className="pb_workspace">
          {/* ── Left Panel ──────────────────────────────────────── */}
          <div className="pb_left">
            <div className="pb_left__hero">
              <h2 className="pb_left__title">{activePageName}</h2>
            </div>
            <div className="pb_tabs">
              {[
                { id: 'blocks', label: 'Home' },
                { id: 'theme', label: 'Theme' },
                { id: 'settings', label: 'Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? 'pb_tab--active' : ''}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pb_tab-content">

              {/* BLOCKS TAB */}
              {activeTab === 'blocks' && (
                <>
                  <div className="pb_section-head">
                    <div>
                      <h3>Arrange your sections</h3>
                    </div>
                    <button className="pb_add-btn" onClick={() => setAddOpen(true)}>
                      <IconPlus size={15} />
                      Add block
                    </button>
                  </div>
                  <div className="pb_page-panel">
                    <div className="pb_page-panel__head">
                      <span className="pb_page-panel__label">Pages</span>
                      <button className="pb_page-panel__add" type="button" onClick={handleAddPage}>
                        <IconPlus size={14} />
                        + Page
                      </button>
                    </div>
                    <div className="pb_page-main-field">
                      <label htmlFor="pb-main-page">Main portfolio page</label>
                      <div className="pb_page-main-field__control">
                        <select
                          id="pb-main-page"
                          value={mainPageId || ''}
                          onChange={event => {
                            setMainPageId(event.target.value);
                            markDirty();
                          }}
                        >
                          {pages.map(page => (
                            <option key={page.id} value={page.id}>
                              {page.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="pb_page-panel__list">
                      {pages.map(page => {
                        const isActivePage = page.id === activePageId;
                        const isRenaming = page.id === renamingPageId;
                        const isMainPage = page.id === mainPageId;
                        const liveSections = (page.blocks || []).filter(block => block.isVisible !== false).length;

                        return (
                          <div key={page.id} className={`pb_page-chip${isActivePage ? ' pb_page-chip--active' : ''}`}>
                            <button
                              className="pb_page-chip__main"
                              type="button"
                              aria-pressed={isActivePage}
                              onClick={() => handleSelectPage(page.id)}
                            >
                              {isRenaming ? (
                                <input
                                  className="pb_page-chip__input"
                                  value={pageNameDraft}
                                  autoFocus
                                  onChange={event => setPageNameDraft(event.target.value)}
                                  onClick={event => event.stopPropagation()}
                                  onBlur={() => handleCommitPageRename(page.id)}
                                  onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                      event.preventDefault();
                                      handleCommitPageRename(page.id);
                                    }

                                    if (event.key === 'Escape') {
                                      setRenamingPageId(null);
                                      setPageNameDraft('');
                                    }
                                  }}
                                />
                              ) : (
                                <>
                                  <div className="pb_page-chip__title-row">
                                    <strong>{page.name}</strong>
                                    {isMainPage ? <span className="pb_page-chip__badge">Main</span> : null}
                                  </div>
                                  <span>{liveSections} live sections</span>
                                </>
                              )}
                            </button>
                            <button
                              className="pb_page-chip__edit"
                              type="button"
                              aria-label={`Rename ${page.name}`}
                              onClick={event => {
                                event.stopPropagation();
                                handleStartPageRename(page);
                              }}
                            >
                              <IconEdit size={13} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pb_block-list">
                    {blocks.length === 0 && (
                      <div className="pb_empty-blocks">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <p>No blocks yet</p>
                        <span>Click "Add block" to start building your page</span>
                      </div>
                    )}
                    {blocks.map((block, idx) => {
                      const cat = catalogByType[block.type] || {};
                      const isPinnedProfile = block.type === 'profile';
                      const sublabel = block.type === 'links'
                        ? `${(block.content?.items || []).length} links`
                        : block.type === 'social-links'
                          ? `${(block.content?.items || []).length} platforms`
                          : cat.desc || '';
                      return (
                        <div
                          key={block._id}
                          className={`pb_block-item${!block.isVisible ? ' pb_block-item--hidden' : ''}`}
                          role="button"
                          tabIndex={0}
                          onClick={() => setEditingBlock(block)}
                          onKeyDown={event => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setEditingBlock(block);
                            }
                          }}
                        >

                          <div className="pb_block-item__body">
                            <div className="pb_block-item__top">
                              <div className="pb_block-item__title-row">
                                <BlockIcon iconKey={cat.icon} />
                                <div className="pb_block-item__info">
                                  <strong>{block.title || cat.label || block.type}</strong>
                                  {sublabel && <span>{sublabel}</span>}
                                </div>
                              </div>
                              <span className={`pb_block-visibility${block.isVisible ? ' pb_block-visibility--live' : ''}`}>
                                {block.isVisible ? 'Live' : 'Hidden'}
                              </span>
                            </div>
                            <div className="pb_block-item__meta">
                              <div className="pb_block-item__grip">
                                <IconGrip />
                                <span>{isPinnedProfile ? 'Pinned header' : `Section ${idx + 1}`}</span>
                              </div>
                              <div className="pb_block-item__actions">
                                <button
                                  className="pb_secondary-btn"
                                  type="button"
                                  onClick={event => {
                                    event.stopPropagation();
                                    setEditingBlock(block);
                                  }}
                                >
                                  Edit
                                </button>
                                {!isPinnedProfile ? (
                                  <div className="pb_block-item__menu-wrap" ref={openMenu === block._id ? menuRef : null}>
                                    <button
                                      className="pb_icon-btn"
                                      type="button"
                                      onClick={event => {
                                        event.stopPropagation();
                                        setOpenMenu(openMenu === block._id ? null : block._id);
                                      }}
                                      aria-label="More options"
                                    >
                                      <IconDots />
                                    </button>
                                    {openMenu === block._id && (
                                      <div className="pb_dropdown" onClick={event => event.stopPropagation()}>
                                        <button onClick={() => { setEditingBlock(block); setOpenMenu(null); }}>
                                          <IconEdit /> Edit
                                        </button>
                                        <button
                                          disabled={idx === 0}
                                          onClick={() => moveBlock(block._id, 'up')}
                                        >
                                          <IconArrowUp /> Move up
                                        </button>
                                        <button
                                          disabled={idx === blocks.length - 1}
                                          onClick={() => moveBlock(block._id, 'down')}
                                        >
                                          <IconArrowDown /> Move down
                                        </button>
                                        <div className="pb_dropdown__divider" />
                                        <button
                                          className="pb_dropdown__danger"
                                          onClick={() => deleteBlock(block._id)}
                                        >
                                          <IconTrash /> Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                                <button
                                  className="pb_icon-btn"
                                  type="button"
                                  onClick={event => {
                                    event.stopPropagation();
                                    toggleVisible(block._id);
                                  }}
                                  aria-label={block.isVisible ? 'Hide block' : 'Show block'}
                                >
                                  {block.isVisible ? <IconEye /> : <IconEyeOff />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {hiddenBlocks > 0 ? (
                    <div className="pb_inline-note">
                      {hiddenBlocks} hidden {hiddenBlocks === 1 ? 'block is' : 'blocks are'} still in your page flow and can be restored anytime.
                    </div>
                  ) : null}
                </>
              )}

              {/* THEME TAB */}
              {activeTab === 'theme' && (
                <div className="pb_theme-list">
                  <div className="pb_section-head pb_section-head--stacked">
                    <div>
                      <span className="pb_section-head__eyebrow">Visual system</span>
                      <h3>Choose the look and feel</h3>
                      <p>Your theme controls the overall mood, colors, and contrast of the page.</p>
                    </div>
                  </div>
                  {THEMES.map(t => (
                    <div
                      key={t.id}
                      className={`pb_theme-item ${theme === t.id ? 'pb_theme-item--active' : ''}`}
                      onClick={() => {
                        updateActivePage(page => ({ ...page, theme: t.id }));
                        markDirty();
                      }}
                    >
                      <div
                        className="pb_theme-item__swatch"
                        style={{ background: t.swatch }}
                      />
                      <div className="pb_theme-item__info">
                        <strong>{t.name}</strong>
                        <span>{t.mood}</span>
                      </div>
                      {theme === t.id && (
                        <span className="pb_theme-item__check">
                          <IconCheck size={14} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="pb_settings">
                  <div className="pb_section-head pb_section-head--stacked">
                    <div>
                      <span className="pb_section-head__eyebrow">Publishing</span>
                      <h3>Review page settings</h3>
                      <p>Set your public URL and the metadata used in search and sharing.</p>
                    </div>
                  </div>
                  <div className="pb_settings__url-card">
                    <span className="pb_settings__url-label">Public URL</span>
                    <strong>{publicUrl}</strong>
                    <button className="pb_secondary-btn" type="button" onClick={handleCopyUrl}>
                      <IconCopy size={13} />
                      Copy
                    </button>
                  </div>
                  <div className="pb_field">
                    <label>Creator username URL</label>
                    <input
                      value={publicUrl}
                      readOnly
                    />
                    <span className="pb_field__hint">
                      Visitors land on your portfolio here. The main page above is what opens first.
                    </span>
                  </div>
                  <div className="pb_field">
                    <label>SEO title</label>
                    <input
                      value={meta.metaTitle}
                      onChange={event => {
                        updateActivePage(page => ({
                          ...page,
                          meta: { ...page.meta, metaTitle: event.target.value }
                        }));
                        markDirty();
                      }}
                      placeholder="Page title for search engines"
                    />
                  </div>
                  <div className="pb_field">
                    <label>SEO description</label>
                    <textarea
                      rows={3}
                      value={meta.metaDescription}
                      onChange={event => {
                        updateActivePage(page => ({
                          ...page,
                          meta: { ...page.meta, metaDescription: event.target.value }
                        }));
                        markDirty();
                      }}
                      placeholder="Short description for search & social sharing"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── Right Panel — Preview ────────────────────────── */}
          <div className="pb_right">
            <div className="pb_preview-shell">
              <div className="pb_preview-toolbar">
                <span className={`pb_status-chip${dirty ? ' pb_status-chip--dirty' : ''}${saving ? ' pb_status-chip--saving' : ''}`}>
                  {saving ? 'Saving changes' : dirty ? 'Draft changes' : 'All changes saved'}
                </span>
                <button
                  className="pb_topbar__btn pb_topbar__btn--ghost"
                  onClick={handleOpenPreview}
                >
                  <IconExternalLink size={14} />
                  Preview
                </button>
                <button
                  className={`pb_topbar__btn pb_topbar__btn--save${dirty ? ' pb_topbar__btn--dirty' : ''}`}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>

              <div className="pb_domain">
                <span className="pb_domain__label">Selected domain</span>
                <div className="pb_domain__controls">
                  <div className="pb_domain__selector">
                    <IconLink size={14} />
                    <span className="pb_domain__url">
                      {publicUrl}
                    </span>
                    <IconChevronDown size={14} />
                  </div>
                  <div className="pb_domain__actions">
                    <button className="pb_domain__icon-btn" type="button" onClick={handleCopyUrl} title="Copy link">
                      <IconCopy size={14} />
                    </button>
                    <button
                      className="pb_domain__icon-btn"
                      type="button"
                      onClick={handleOpenPreview}
                      title="Open page"
                    >
                      <IconExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <button className="pb_domain__share" type="button" onClick={handleCopyUrl}>
                  Share
                </button>
              </div>

              <div className="pb_preview-layout">
                <div className="pb_phone-stage">
                  <div className="pb_phone-stage__glow" />
                  <div className="pb_phone-wrap">
                    <PhonePreview blocks={blocks} themeId={theme} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {addOpen && (
        <AddBlockModal
          onAdd={addBlock}
          onClose={() => setAddOpen(false)}
          existingTypes={existingTypes}
        />
      )}
      {editingBlock && (
        <EditBlockModal
          block={editingBlock}
          onSave={updates => saveBlockEdit(editingBlock._id, updates)}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </>
  );
}
